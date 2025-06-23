"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Página de Login do Google
 *
 * Interface bonita e profissional para login social
 * Simula o processo de autenticação do Google
 */
const GoogleLoginPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Simula o processo de login do Google
   */
  const handleGoogleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simula delay de processamento
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Login Google simulado:", { email, password });

      // Simula sucesso
      setStep(3);

      // Redireciona após 2 segundos
      setTimeout(() => {
        router.push("/rotinas");
      }, 2000);
    } catch {
      setError("Erro ao fazer login com Google");
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
            Login com Google
          </h1>
          <p className="text-gray-300 text-sm">Entre com sua conta Google</p>
        </div>

        {/* Card principal */}
        <div className="bg-gray1 rounded-16 p-8 border border-gray-600">
          {step === 1 && (
            <div className="text-center">
              {/* Logo Google */}
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center">
                  <div className="text-2xl font-bold text-gray-800">G</div>
                </div>
              </div>

              <h2 className="text-white text-xl mb-4">Fazer login</h2>
              <p className="text-gray-300 text-sm mb-6">Use sua conta Google</p>

              {/* Campo de email */}
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email ou telefone"
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green"
                  disabled={isLoading}
                />
              </div>

              {/* Botões */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={handleBack}
                  className="text-primary-green hover:text-primary-light-green transition-colors"
                >
                  Criar conta
                </button>
                <button
                  onClick={() => setStep(2)}
                  disabled={!email || isLoading}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    !email || isLoading
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-primary-green text-black hover:bg-primary-light-green"
                  }`}
                >
                  Próximo
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              {/* Logo Google */}
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center">
                  <div className="text-2xl font-bold text-gray-800">G</div>
                </div>
              </div>

              <h2 className="text-white text-xl mb-4">Bem-vindo</h2>
              <p className="text-gray-300 text-sm mb-6">{email}</p>

              {/* Campo de senha */}
              <div className="mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green"
                  disabled={isLoading}
                />
              </div>

              {/* Botões */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="text-primary-green hover:text-primary-light-green transition-colors"
                >
                  Esqueceu a senha?
                </button>
                <button
                  onClick={handleGoogleLogin}
                  disabled={!password || isLoading}
                  className={`px-6 py-2 rounded-lg transition-colors ${
                    !password || isLoading
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-primary-green text-black hover:bg-primary-light-green"
                  }`}
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              {/* Logo Google */}
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center">
                  <div className="text-2xl font-bold text-gray-800">G</div>
                </div>
              </div>

              <h2 className="text-white text-xl mb-4">Login realizado!</h2>
              <p className="text-gray-300 text-sm mb-6">
                Redirecionando para o aplicativo...
              </p>

              {/* Loading spinner */}
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-green"></div>
              </div>
            </div>
          )}

          {/* Mensagem de erro */}
          {error && (
            <div className="mt-4 text-red-400 text-sm text-center">{error}</div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-xs">
            Esta é uma simulação. Em produção, seria integrado com a API do
            Google OAuth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginPage;
