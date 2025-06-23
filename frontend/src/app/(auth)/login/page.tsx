"use client";

import React, { useState } from "react";
import ButtonLogin from "@/components/ButtonLogin";
import InputLogin from "@/components/InputLogin";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

/**
 * Componente de Login
 *
 * Funcionalidades:
 * - Autenticação de usuários
 * - Validação de credenciais
 * - Armazenamento de token no localStorage
 * - Redirecionamento após login
 * - Links para redes sociais (Facebook/Google)
 * - Navegação para página de registro
 */
const Login = () => {
  // Estados para os campos do formulário
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  // Hook para navegação entre páginas
  const router = useRouter();

  /**
   * Função principal para autenticação do usuário
   * Envia credenciais para a API Django e armazena o token
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne recarregamento da página

    try {
      // Faz requisição POST para a API de autenticação
      const res = await axios.post("http://localhost:8000/api-token-auth/", {
        username: email, // Django espera 'username' mesmo sendo email
        password: senha,
      });

      // Extrai o token da resposta
      const { token } = res.data;

      // Armazena o token no localStorage para uso posterior
      localStorage.setItem("token", token);

      // Redireciona para a página de rotinas após login bem-sucedido
      router.push("/rotinas");

      console.log("Logado com sucesso!");
    } catch (err) {
      // Tratamento de erro de autenticação
      const error = err as AxiosError;
      console.error(error.response?.data);
      setError("Email ou senha inválidos");
    }
  };

  return (
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
        />

        {/* Campo de Senha */}
        <InputLogin
          label="Senha"
          placeholder="Coloque sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          error={error}
          type="password"
          id="senha"
        />
      </div>

      {/* Botão de login principal */}
      <ButtonLogin type="submit">Entrar</ButtonLogin>

      {/* Separador visual */}
      <div className="w-[250px] bg-gray2 h-[2px] my-4"></div>

      {/* Botões de login social */}
      <div className="flex flex-col gap-2 mt-2">
        <ButtonLogin variant="secondary">Entrar com o Facebook</ButtonLogin>
        <ButtonLogin variant="secondary">Entrar com o Google</ButtonLogin>
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
  );
};

export default Login;
