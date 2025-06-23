"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import {
  PlanoProps,
  fetchPlanosFromAPI,
  convertPlanosFromAPI,
} from "@/data/plano";
import { enviarDadosCartao } from "@/services/api";

/**
 * Opções de bandeiras de cartão disponíveis
 */
const BANDEIRAS_CARTAO = [
  { value: "mastercard", label: "Mastercard" },
  { value: "visa", label: "Visa" },
  { value: "elo", label: "Elo" },
];

/**
 * Página de Checkout
 *
 * Layout dividido em duas colunas:
 * - Esquerda: Formulário de pagamento com cartão
 * - Direita: Detalhes do plano selecionado com checklist
 *
 * Funcionalidades:
 * - Busca dados do plano da API baseado no ID da URL
 * - Formulário de pagamento completo com validação
 * - Exibição dos benefícios do plano selecionado
 * - Redirecionamento automático se não houver plano selecionado
 * - Campos: número, nome, validade (AAAA/MM), CVV, bandeira
 * - Envio dos dados do cartão para API via POST com autenticação
 */
const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Estados para dados do cartão
  const [numeroCartao, setNumeroCartao] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [bandeira, setBandeira] = useState("");

  // Estados para dados do plano
  const [planoSelecionado, setPlanoSelecionado] = useState<PlanoProps | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Efeito para buscar dados do plano selecionado
   */
  useEffect(() => {
    const fetchPlano = async () => {
      try {
        const planoId = searchParams.get("plano");

        if (!planoId) {
          // Se não há plano selecionado, redireciona para matrícula
          router.push("/matricula");
          return;
        }

        setIsLoading(true);
        setError(null);

        // Busca todos os planos da API
        const planosAPI = await fetchPlanosFromAPI();
        const planosConvertidos = convertPlanosFromAPI(planosAPI);

        // Encontra o plano pelo ID
        const plano = planosConvertidos.find((p) => p.id === parseInt(planoId));

        if (!plano) {
          setError("Plano não encontrado");
          return;
        }

        setPlanoSelecionado(plano);
        console.log("Plano selecionado:", plano);
      } catch (err) {
        console.error("Erro ao carregar plano:", err);
        setError("Erro ao carregar dados do plano");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlano();
  }, [searchParams, router]);

  /**
   * Função para formatar número do cartão
   */
  const formatarNumeroCartao = (value: string) => {
    const numeros = value.replace(/\D/g, "");
    return numeros.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  /**
   * Função para formatar data de validade (AAAA/MM)
   */
  const formatarValidade = (value: string) => {
    const numeros = value.replace(/\D/g, "");
    if (numeros.length <= 4) {
      return numeros;
    }
    return `${numeros.slice(0, 4)}/${numeros.slice(4, 6)}`;
  };

  /**
   * Função para processar o pagamento e enviar dados do cartão
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!planoSelecionado) {
      setError("Plano não selecionado");
      return;
    }

    // Validação básica dos campos
    if (!numeroCartao || !nomeCartao || !validade || !cvv || !bandeira) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Dados do cartão para enviar para a API
      const dadosCartao = {
        numero_cartao: numeroCartao.replace(/\s/g, ""), // Remove espaços
        nome_cartao: nomeCartao,
        data_validade: validade,
        cvv: cvv,
        bandeira: bandeira,
        plano_id: planoSelecionado.id,
        plano_nome: planoSelecionado.titulo,
        plano_preco: planoSelecionado.preco,
      };

      console.log("Enviando dados do cartão:", dadosCartao);

      // Usa a função do serviço de API que já inclui autenticação
      const response = await enviarDadosCartao(dadosCartao);

      console.log("Resposta da API:", response);

      // Sucesso - redireciona ou mostra mensagem
      alert("Pagamento processado com sucesso!");

      // Limpa o formulário
      setNumeroCartao("");
      setNomeCartao("");
      setValidade("");
      setCvv("");
      setBandeira("");

      // Redireciona para página de sucesso ou rotinas
      router.push("/rotinas");
    } catch (err: any) {
      console.error("Erro ao processar pagamento:", err);

      // Tratamento de erros específicos
      if (err.response?.status === 400) {
        setError("Dados do cartão inválidos. Verifique as informações.");
      } else if (err.response?.status === 401) {
        setError("Erro de autenticação. Faça login novamente.");
        // Redireciona para login se não estiver autenticado
        router.push("/login");
      } else if (err.response?.status === 500) {
        setError("Erro interno do servidor. Tente novamente.");
      } else if (!err.response) {
        setError("Erro de conexão. Verifique se o servidor está rodando.");
      } else {
        setError("Erro ao processar pagamento. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Renderiza loading enquanto busca dados
  if (isLoading) {
    return (
      <div className="bg-gray min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Carregando dados do plano...</div>
      </div>
    );
  }

  // Renderiza erro se houver problema
  if (error || !planoSelecionado) {
    return (
      <div className="bg-gray min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-xl mb-4">
            {error || "Plano não encontrado"}
          </div>
          <button
            onClick={() => router.push("/matricula")}
            className="text-primary-green underline"
          >
            Voltar para planos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray min-h-screen flex items-center justify-center p-4">
      <div className="w-[1250px] bg-gray1 rounded-24 p-8">
        <h1 className="text-white text-4xl font-bebas text-center mb-8">
          CHECKOUT
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coluna Esquerda - Formulário de Pagamento */}
          <div className="bg-black rounded-16 p-6">
            <h2 className="text-white text-2xl font-bebas mb-6">
              Dados do Cartão
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Número do Cartão */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Número do Cartão
                </label>
                <input
                  type="text"
                  value={numeroCartao}
                  onChange={(e) =>
                    setNumeroCartao(formatarNumeroCartao(e.target.value))
                  }
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  className="w-full px-3 py-2 border border-primary-green rounded-12 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Nome no Cartão */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Nome no Cartão
                </label>
                <input
                  type="text"
                  value={nomeCartao}
                  onChange={(e) => setNomeCartao(e.target.value.toUpperCase())}
                  placeholder="NOME COMO ESTÁ NO CARTÃO"
                  className="w-full px-3 py-2 border border-primary-green rounded-12 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Data de Validade (AAAA/MM) */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Data de Validade (AAAA/MM)
                </label>
                <input
                  type="text"
                  value={validade}
                  onChange={(e) =>
                    setValidade(formatarValidade(e.target.value))
                  }
                  placeholder="2025/12"
                  maxLength={7}
                  className="w-full px-3 py-2 border border-primary-green rounded-12 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* CVV */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) =>
                    setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                  placeholder="123"
                  maxLength={4}
                  className="w-full px-3 py-2 border border-primary-green rounded-12 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Bandeira do Cartão */}
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Bandeira do Cartão
                </label>
                <select
                  value={bandeira}
                  onChange={(e) => setBandeira(e.target.value)}
                  className="w-full px-3 py-2 border border-primary-green rounded-12 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-primary-green"
                  required
                  disabled={isSubmitting}
                >
                  <option value="" className="bg-black text-white">
                    Selecione a bandeira
                  </option>
                  {BANDEIRAS_CARTAO.map((bandeiraOption) => (
                    <option
                      key={bandeiraOption.value}
                      value={bandeiraOption.value}
                      className="bg-black text-white"
                    >
                      {bandeiraOption.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botão de Pagamento */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-bold py-3 px-4 rounded-12 transition-colors mt-6 ${
                  isSubmitting
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-primary-green text-black hover:bg-primary-light-green"
                }`}
              >
                {isSubmitting ? "PROCESSANDO..." : "FINALIZAR PAGAMENTO"}
              </button>
            </form>
          </div>

          {/* Coluna Direita - Detalhes do Plano */}
          <div className="bg-black rounded-16 p-6">
            <h2 className="text-white text-2xl font-bebas mb-6">
              Resumo do Plano
            </h2>

            {/* Informações do Plano */}
            <div className="mb-6">
              <h3 className="text-primary-green text-3xl font-bebas mb-2">
                {planoSelecionado.titulo}
              </h3>
              <p className="text-white text-4xl font-bebas">
                R$ {planoSelecionado.preco.toFixed(2)}
              </p>
            </div>

            {/* Lista de Benefícios */}
            <div className="space-y-3">
              <h4 className="text-white text-lg font-medium mb-4">
                Benefícios Inclusos:
              </h4>
              {planoSelecionado.beneficios.map((beneficio, index) => (
                <div key={index} className="flex items-center gap-3">
                  {/* Ícone de verificação */}
                  <Image
                    src="/img/icon/iconverificacao.svg"
                    alt="Verificado"
                    width={20}
                    height={20}
                    className="flex-shrink-0"
                  />
                  {/* Texto do benefício */}
                  <span className="text-white text-sm">{beneficio}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-gray-600 mt-6 pt-6">
              <div className="flex justify-between items-center">
                <span className="text-white text-lg font-medium">Total:</span>
                <span className="text-primary-green text-2xl font-bebas">
                  R$ {planoSelecionado.preco.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
