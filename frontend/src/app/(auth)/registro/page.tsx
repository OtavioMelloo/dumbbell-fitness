"use client";

import React, { useState } from "react";
import ButtonLogin from "@/components/ButtonLogin";
import InputLogin from "@/components/InputLogin";
import { useRouter } from "next/navigation";
import api from "@/services/api";

/**
 * Componente de Registro/Cadastro
 *
 * Funcionalidades:
 * - Cadastro em duas etapas (endereço + dados pessoais)
 * - Formatação automática de CPF e CEP
 * - Conversão de altura de cm para metros
 * - Validações de campos obrigatórios
 * - Integração com API Django
 * - Redirecionamento para matrícula após sucesso
 */
const Register = () => {
  // Estado para controlar as etapas do cadastro (1 = endereço, 2 = dados pessoais)
  const [step, setStep] = useState(1);

  // Estados para dados pessoais do usuário
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [sexo, setSexo] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados para dados do endereço
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  // Lista de estados brasileiros (UF + Nome)
  const estados = [
    ["AC", "Acre"],
    ["AL", "Alagoas"],
    ["AP", "Amapá"],
    ["AM", "Amazonas"],
    ["BA", "Bahia"],
    ["CE", "Ceará"],
    ["DF", "Distrito Federal"],
    ["ES", "Espírito Santo"],
    ["GO", "Goiás"],
    ["MA", "Maranhão"],
    ["MT", "Mato Grosso"],
    ["MS", "Mato Grosso do Sul"],
    ["MG", "Minas Gerais"],
    ["PA", "Pará"],
    ["PB", "Paraíba"],
    ["PR", "Paraná"],
    ["PE", "Pernambuco"],
    ["PI", "Piauí"],
    ["RJ", "Rio de Janeiro"],
    ["RN", "Rio Grande do Norte"],
    ["RS", "Rio Grande do Sul"],
    ["RO", "Rondônia"],
    ["RR", "Roraima"],
    ["SC", "Santa Catarina"],
    ["SP", "São Paulo"],
    ["SE", "Sergipe"],
    ["TO", "Tocantins"],
  ];

  // Hook para navegação entre páginas
  const router = useRouter();

  /**
   * Função para formatar CPF no padrão brasileiro
   * @param value - CPF sem formatação
   * @returns CPF formatado (999.999.999-99)
   */
  const formatarCPF = (value: string) => {
    // Remove tudo que não é número
    const cpfLimpo = value.replace(/\D/g, "");
    if (cpfLimpo.length <= 11) {
      // Aplica máscara: XXX.XXX.XXX-XX
      return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    // Limita a 11 dígitos e aplica máscara
    return cpfLimpo
      .substring(0, 11)
      .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  /**
   * Função para formatar CEP no padrão brasileiro
   * @param value - CEP sem formatação
   * @returns CEP formatado (00000-000)
   */
  const formatarCEP = (value: string) => {
    // Remove tudo que não é número
    const cepLimpo = value.replace(/\D/g, "");
    if (cepLimpo.length <= 8) {
      // Aplica máscara: XXXXX-XXX
      return cepLimpo.replace(/(\d{5})(\d{3})/, "$1-$2");
    }
    // Limita a 8 dígitos e aplica máscara
    return cepLimpo.substring(0, 8).replace(/(\d{5})(\d{3})/, "$1-$2");
  };

  /**
   * Função para converter altura de centímetros para metros
   * @param alturaCm - Altura em centímetros
   * @returns Altura em metros com 2 casas decimais
   */
  const converterAlturaParaMetros = (alturaCm: string) => {
    const alturaNum = parseFloat(alturaCm);
    if (!isNaN(alturaNum)) {
      return (alturaNum / 100).toFixed(2);
    }
    return "";
  };

  // Opções para o campo sexo
  const sexoChoices = [
    ["M", "Masculino"],
    ["F", "Feminino"],
    ["O", "Outro"],
  ];

  /**
   * Função principal para enviar dados do cadastro
   * Cria primeiro o endereço, depois o aluno
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne recarregamento da página

    // Validação de senhas
    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem");
      return;
    }

    // Validações básicas de campos obrigatórios
    if (
      !nome ||
      !cpf ||
      !sexo ||
      !dataNascimento ||
      !peso ||
      !altura ||
      !email ||
      !senha
    ) {
      setError("Todos os campos são obrigatórios");
      return;
    }

    // Validação de formato do CPF
    if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
      setError("CPF deve estar no formato 999.999.999-99");
      return;
    }

    // Validação de altura (deve ser um número válido)
    const alturaMetros = converterAlturaParaMetros(altura);
    if (!alturaMetros || parseFloat(alturaMetros) <= 0) {
      setError("Altura deve ser um valor válido em centímetros");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Log dos dados que serão enviados
      console.log("Enviando dados para API:", {
        nome,
        cpf,
        sexo,
        data_nascimento: dataNascimento,
        peso: parseFloat(peso),
        altura: parseFloat(alturaMetros),
        email,
        password: senha,
        endereco: {
          cep,
          rua,
          numero,
          complemento,
          bairro,
          cidade,
          estado,
        },
      });

      // ETAPA 1: Criar o endereço primeiro
      const enderecoRes = await api.post("/cadastros/endereco/", {
        cep,
        rua,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
      });

      console.log("Endereço criado:", enderecoRes.data);

      // ETAPA 2: Criar o aluno com o ID do endereço criado
      const alunoRes = await api.post("/cadastros/alunos/", {
        nome,
        cpf,
        sexo,
        data_nascimento: dataNascimento,
        endereco: enderecoRes.data.id, // ID do endereço criado
        peso: parseFloat(peso),
        altura: parseFloat(alturaMetros), // Altura em metros
        email,
        password: senha,
      });

      console.log("Usuário cadastrado com sucesso!", alunoRes.data);

      // Redireciona para página de matrícula após sucesso
      router.push("/matricula");
    } catch (err: unknown) {
      console.error("Erro na API:", err);

      // Tratamento de erros específicos
      if (err && typeof err === "object" && "response" in err) {
        const errorResponse = err as {
          response?: { status?: number; data?: any };
        };
        if (errorResponse.response?.status === 400) {
          const errorData = errorResponse.response.data;
          if (typeof errorData === "object") {
            // Se for um objeto de erros, extrai as mensagens
            const errorMessages = Object.values(errorData).flat();
            setError(`Erro: ${errorMessages.join(", ")}`);
          } else {
            // Se for uma string simples
            setError(`Erro: ${errorData}`);
          }
        } else if (errorResponse.response?.status === 404) {
          setError(
            "Endpoint não encontrado. Verifique se o servidor está configurado corretamente."
          );
        } else if (errorResponse.response?.status === 500) {
          setError("Erro interno do servidor. Tente novamente.");
        } else {
          setError("Erro ao cadastrar. Verifique os dados.");
        }
      } else {
        setError("Erro de conexão. Verifique se o servidor está rodando.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Função para avançar para a próxima etapa do cadastro
   * Valida os campos do endereço antes de avançar
   */
  const handleNextStep = () => {
    if (step === 1) {
      // Validar campos obrigatórios do endereço
      if (!cep || !rua || !numero || !bairro || !cidade || !estado) {
        setError("Preencha todos os campos obrigatórios do endereço");
        return;
      }
      setStep(2); // Avança para etapa 2 (dados pessoais)
      setError(""); // Limpa erros
    }
  };

  /**
   * Função para voltar para a etapa anterior
   */
  const handlePrevStep = () => {
    setStep(1); // Volta para etapa 1 (endereço)
    setError(""); // Limpa erros
  };

  // RENDERIZAÇÃO DA ETAPA 1: Formulário de Endereço
  if (step === 1) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNextStep();
        }}
        className="w-full h-full items-center justify-center flex flex-col"
      >
        <h1 className="h-[80px] text-white text-[61px] font-bebas">Endereço</h1>

        <div className="my-8">
          {/* Campo CEP com formatação automática */}
          <InputLogin
            label="CEP"
            placeholder="00000-000"
            value={cep}
            onChange={(e) => setCep(formatarCEP(e.target.value))}
            type="text"
            id="cep"
          />

          {/* Campo Rua */}
          <InputLogin
            label="Rua"
            placeholder="Nome da rua"
            value={rua}
            onChange={(e) => setRua(e.target.value)}
            type="text"
            id="rua"
          />

          {/* Campo Número */}
          <InputLogin
            label="Número"
            placeholder="123"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            type="text"
            id="numero"
          />

          {/* Campo Complemento (opcional) */}
          <InputLogin
            label="Complemento"
            placeholder="Apto 101"
            value={complemento}
            onChange={(e) => setComplemento(e.target.value)}
            type="text"
            id="complemento"
          />

          {/* Campo Bairro */}
          <InputLogin
            label="Bairro"
            placeholder="Nome do bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            type="text"
            id="bairro"
          />

          {/* Campo Cidade */}
          <InputLogin
            label="Cidade"
            placeholder="Nome da cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            type="text"
            id="cidade"
          />

          {/* Dropdown de Estados */}
          <div className="flex flex-col w-[380px]">
            <label className="mb-1 block text-sm font-medium text-white">
              Estado
            </label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="text-white px-2 py-2 rounded-12 border border-primary-green focus:outline-none focus:ring focus:ring-primary-green font-thin font-roboto bg-transparent"
            >
              <option value="" className="bg-gray-800 text-white">
                Selecione um estado
              </option>
              {estados.map((est, index) => (
                <option
                  key={index}
                  value={est[0]}
                  className="bg-gray-800 text-white"
                >
                  {est[1]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botão para avançar para próxima etapa */}
        <ButtonLogin type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processando..." : "Próximo"}
        </ButtonLogin>

        {/* Exibição de erros */}
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </form>
    );
  }

  // RENDERIZAÇÃO DA ETAPA 2: Formulário de Dados Pessoais
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full items-center justify-center flex flex-col"
    >
      <h1 className="h-[80px] text-white text-[61px] font-bebas">Cadastro</h1>

      <div className="my-8">
        {/* Campo Nome */}
        <InputLogin
          label="Nome"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          type="text"
          id="nome"
        />

        {/* Campo CPF com formatação automática */}
        <InputLogin
          label="CPF"
          placeholder="999.999.999-99"
          value={cpf}
          onChange={(e) => setCpf(formatarCPF(e.target.value))}
          type="text"
          id="cpf"
        />

        {/* Dropdown de Sexo */}
        <div className="flex flex-col w-[380px]">
          <label className="mb-1 block text-sm font-medium text-white">
            Sexo
          </label>
          <select
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            className="text-white px-2 py-2 rounded-12 border border-primary-green focus:outline-none focus:ring focus:ring-primary-green font-thin font-roboto bg-transparent"
          >
            <option value="" className="bg-gray-800 text-white">
              Selecione o sexo
            </option>
            {sexoChoices.map((choice, index) => (
              <option
                key={index}
                value={choice[0]}
                className="bg-gray-800 text-white"
              >
                {choice[1]}
              </option>
            ))}
          </select>
        </div>

        {/* Campo Data de Nascimento */}
        <InputLogin
          label="Data de nascimento"
          placeholder="dd/mm/aaaa"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          type="date"
          id="dataNascimento"
        />

        {/* Campo Peso */}
        <InputLogin
          label="Peso (kg)"
          placeholder="Ex: 70.5"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          type="number"
          id="peso"
        />

        {/* Campo Altura */}
        <InputLogin
          label="Altura (cm)"
          placeholder="Ex: 175"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          type="number"
          id="altura"
        />

        {/* Campo Email */}
        <InputLogin
          label="E-mail"
          placeholder="Coloque seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
        />

        {/* Campo Senha */}
        <InputLogin
          label="Senha"
          placeholder="Crie uma senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          type="password"
          id="senha"
        />

        {/* Campo Confirmar Senha */}
        <InputLogin
          label="Confirmar Senha"
          placeholder="Repita a senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          type="password"
          id="confirmarSenha"
        />
      </div>

      {/* Botões de navegação e cadastro */}
      <div className="flex flex-col gap-4">
        <ButtonLogin type="button" onClick={handlePrevStep}>
          Voltar
        </ButtonLogin>
        <ButtonLogin type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </ButtonLogin>
      </div>

      {/* Separador visual */}
      <div className="w-[250px] bg-gray2 h-[2px] my-4"></div>

      {/* Link para página de login */}
      <div className="h-[20px] my-2">
        <h3 className="text-white">
          Já tem conta?{" "}
          <span
            className="underline text-primary-green italic cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Fazer login
          </span>
        </h3>
      </div>

      {/* Exibição de erros */}
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </form>
  );
};

export default Register;
