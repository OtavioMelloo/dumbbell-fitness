"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Página de Login do Facebook
 *
 * Interface bonita e profissional para login social
 * Simula o processo de autenticação do Facebook
 */
const FacebookLoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Simula o processo de login do Facebook
   */
  const handleFacebookLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simula delay de processamento
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Login Facebook simulado:", { email, password });

      // Simula sucesso e redireciona
      setTimeout(() => {
        router.push("/rotinas");
      }, 1000);
    } catch {
      setError("Erro ao fazer login com Facebook");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Volta para página de login principal
   */
  const handleBack = () => {
    router.push("/login");
  };

  return (
    <div className="bg-gray min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={handleBack}
            className="text-white hover:text-primary-green transition-colors mb-4"
          >
            ← Voltar
          </button>
          <h1 className="text-white text-2xl font-bebas mb-2">
            Login com Facebook
          </h1>
          <p className="text-gray-300 text-sm">Entre com sua conta Facebook</p>
        </div>

        {/* Card principal */}
        <div className="bg-gray1 rounded-16 p-8 border border-gray-600">
          <div className="text-center">
            {/* Logo Facebook */}
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto bg-blue-600 rounded-full flex items-center justify-center">
                <div className="text-white text-2xl font-bold">f</div>
              </div>
            </div>

            <h2 className="text-white text-xl mb-4">Entrar no Facebook</h2>
            <p className="text-gray-300 text-sm mb-6">
              Para continuar no Dumbbell Fitness
            </p>

            <form onSubmit={handleFacebookLogin} className="space-y-4">
              {/* Campo de email */}
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email ou número de telefone"
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Campo de senha */}
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha"
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Botão de login */}
              <button
                type="submit"
                disabled={!email || !password || isLoading}
                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                  !email || !password || isLoading
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </button>
            </form>

            {/* Links auxiliares */}
            <div className="mt-6 space-y-3">
              <button
                onClick={handleBack}
                className="block w-full text-blue-400 hover:text-blue-300 transition-colors text-sm"
              >
                Esqueceu a senha?
              </button>

              <div className="border-t border-gray-600 pt-4">
                <button
                  onClick={handleBack}
                  className="block w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  Criar nova conta
                </button>
              </div>
            </div>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="mt-4 text-red-400 text-sm text-center">{error}</div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-xs">
            Esta é uma simulação. Em produção, seria integrado com a API do
            Facebook OAuth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FacebookLoginPage;
