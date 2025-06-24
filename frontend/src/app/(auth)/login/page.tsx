"use client";

import React, { useState, Suspense } from "react";
import ButtonLogin from "@/components/ButtonLogin";
import InputLogin from "@/components/InputLogin";
import { useRouter, useSearchParams } from "next/navigation";
import { loginUser } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

/**
 * Componente de Login
 *
 * Funcionalidades:
 * - Autenticação de usuários usando DRF Token
 * - Validação de credenciais
 * - Armazenamento de token e informações do usuário no localStorage
 * - Redirecionamento após login
 * - Links para redes sociais (Facebook/Google)
 * - Navegação para página de registro
 * - Layout com imagem no lado esquerdo
 * - Ícone para mostrar/ocultar senha
 */
const LoginContent = () => {
  // Estados para os campos do formulário
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Hook para navegação entre páginas
  const router = useRouter();
  const { refreshUser } = useAuth();
  const searchParams = useSearchParams();

  /**
   * Função principal para autenticação do usuário
   * Envia credenciais para a API Django DRF e armazena o token e dados do usuário
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne recarregamento da página
    setIsLoading(true);
    setError("");

    try {
      // Usa a função de login do serviço de API
      const { userInfo } = await loginUser({
        username: email, // Django espera 'username' mesmo sendo email
        password: senha,
      });

      console.log("Logado com sucesso!", { userInfo });

      // Força a atualização do contexto de autenticação
      await refreshUser();

      // Verifica se há uma URL de retorno
      const returnUrl = searchParams.get("returnUrl");

      // Redireciona para a URL de retorno ou para rotinas
      if (returnUrl) {
        router.push(decodeURIComponent(returnUrl));
      } else {
        // Redireciona para rotinas por padrão
        router.push("/appdumbbell/rotinas");
      }
    } catch (err: unknown) {
      // Tratamento de erro de autenticação
      console.error("Erro no login:", err);

      // Verifica se é um erro de rede ou de credenciais
      if (err && typeof err === "object" && "response" in err) {
        const errorResponse = err as { response?: { status?: number } };
        if (errorResponse.response?.status === 400) {
          setError("Email ou senha inválidos");
        } else if (errorResponse.response?.status === 401) {
          setError("Credenciais inválidas");
        } else {
          setError("Erro interno do servidor");
        }
      } else {
        setError("Erro de conexão. Verifique se o servidor está rodando.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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

      {/* Lado direito - Formulário de login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full items-center justify-center flex flex-col"
        >
          {/* Título da página */}
          <h1 className="h-[80px] text-white text-[61px] font-bebas">Login</h1>

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

            {/* Campo de Senha */}
            <InputLogin
              label="Senha"
              placeholder="Coloque sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              error={error}
              type={showPassword ? "text" : "password"}
              id="senha"
              disabled={isLoading}
              rightIcon={
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
            />
          </div>

          {/* Link Esqueci a Senha */}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={() => router.push("/esqueci-senha")}
              className="text-primary-green text-sm hover:text-primary-light-green transition-colors underline"
              disabled={isLoading}
            >
              Esqueci a senha
            </button>
          </div>

          {/* Botão de login principal */}
          <ButtonLogin type="submit" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </ButtonLogin>

          {/* Separador visual */}
          <div className="w-[250px] bg-gray2 h-[2px] my-4"></div>

          {/* Botões de login social */}
          <div className="flex flex-col gap-2 mt-2">
            <ButtonLogin
              variant="secondary"
              disabled={isLoading}
              onClick={() => router.push("/login/facebook")}
            >
              Entrar com o Facebook
            </ButtonLogin>
            <ButtonLogin
              variant="secondary"
              disabled={isLoading}
              onClick={() => router.push("/login/google")}
            >
              Entrar com o Google
            </ButtonLogin>
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

const Login = () => {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <LoginContent />
    </Suspense>
  );
};

export default Login;
