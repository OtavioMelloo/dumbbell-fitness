"use client";

import React, { useState } from "react";
import ButtonLogin from "@/components/ButtonLogin";
import InputLogin from "@/components/InputLogin";
import { useRouter } from "next/navigation";
import { solicitarRedefinicaoSenha } from "@/services/api";
import Image from "next/image";

/**
 * Página de Esqueci a Senha
 *
 * Funcionalidades:
 * - Formulário para solicitar redefinição de senha
 * - Validação de email
 * - Envio de email de redefinição
 * - Navegação de volta para login
 * - Layout consistente com o resto da aplicação
 */
const EsqueciSenha = () => {
  // Estados para os campos do formulário
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Hook para navegação entre páginas
  const router = useRouter();

  /**
   * Função para solicitar redefinição de senha
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Validação básica do email
      if (!email || !email.includes("@")) {
        setError("Por favor, insira um email válido.");
        return;
      }

      // Chama a API para solicitar redefinição de senha
      await solicitarRedefinicaoSenha(email);

      setSuccess(
        "Email de redefinição enviado com sucesso! Verifique sua caixa de entrada."
      );

      // Limpa o campo de email
      setEmail("");
    } catch (err: unknown) {
      console.error("Erro ao solicitar redefinição:", err);

      // Tratamento de erros específicos
      if (err && typeof err === "object" && "response" in err) {
        const errorResponse = err as {
          response?: { status?: number; data?: any };
        };
        if (errorResponse.response?.status === 400) {
          setError("Email não encontrado ou inválido.");
        } else if (errorResponse.response?.status === 429) {
          setError(
            "Muitas tentativas. Aguarde alguns minutos antes de tentar novamente."
          );
        } else if (errorResponse.response?.status === 500) {
          setError("Erro interno do servidor. Tente novamente mais tarde.");
        } else {
          setError("Erro ao enviar email de redefinição. Tente novamente.");
        }
      } else {
        setError("Erro de conexão. Verifique se o servidor está rodando.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex">
      {/* Lado esquerdo - Imagem */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
        <div className="max-w-md">
          <Image
            src="/img/malhando.svg"
            alt="Pessoa malhando"
            width={500}
            height={500}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* Lado direito - Formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full items-center justify-center flex flex-col"
        >
          {/* Título da página */}
          <h1 className="h-[80px] text-white text-[61px] font-bebas">
            Esqueci a Senha
          </h1>

          {/* Descrição */}
          <p className="text-white text-center mb-8">
            Digite seu email e enviaremos um link para redefinir sua senha.
          </p>

          {/* Container dos campos de entrada */}
          <div className="my-8">
            {/* Campo de Email */}
            <InputLogin
              label="E-mail"
              placeholder="Coloque seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              type="email"
              id="email"
              disabled={isLoading}
            />
          </div>

          {/* Mensagem de sucesso */}
          {success && (
            <div className="text-green-400 text-sm bg-green-900/20 p-3 rounded-12 border border-green-400 mb-4">
              {success}
            </div>
          )}

          {/* Botão de enviar */}
          <ButtonLogin type="submit" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar Email"}
          </ButtonLogin>

          {/* Link para voltar ao login */}
          <div className="h-[20px] my-4">
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-white hover:text-primary-green transition-colors underline"
            >
              Voltar ao Login
            </button>
          </div>

          {/* Link para página de registro */}
          <div className="h-[20px] my-2">
            <h3 className="text-white">
              Não possui conta?{" "}
              <span
                className="underline text-primary-green italic cursor-pointer"
                onClick={() => router.push("/registro")}
              >
                Criar uma conta
              </span>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EsqueciSenha;
