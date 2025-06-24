"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  returnUrl?: string;
}

/**
 * Componente para proteger rotas que requerem autenticação
 * Versão ultra-simplificada para evitar loops de redirecionamento
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  returnUrl,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [redirectAttempted, setRedirectAttempted] = useState(false);

  useEffect(() => {
    console.log("🛡️ ProtectedRoute - Estado:", {
      isLoading,
      isAuthenticated,
      user,
      pathname,
      redirectAttempted,
    });

    // Só tenta redirecionar uma vez
    if (redirectAttempted) {
      return;
    }

    // Se não está carregando e não está autenticado
    if (!isLoading && !isAuthenticated) {
      console.log("🚫 Usuário não autenticado");
      setRedirectAttempted(true);

      // Aguarda um pouco antes de redirecionar
      setTimeout(() => {
        const loginUrl =
          returnUrl || `/login?returnUrl=${encodeURIComponent(pathname)}`;
        console.log("📍 Redirecionando para:", loginUrl);
        router.push(loginUrl);
      }, 100);
    }
  }, [
    isLoading,
    isAuthenticated,
    router,
    returnUrl,
    pathname,
    redirectAttempted,
  ]);

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray">
        <div className="text-white text-lg">Carregando...</div>
      </div>
    );
  }

  // Se não está autenticado, mostra mensagem de redirecionamento
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray">
        <div className="text-white text-lg">Redirecionando para login...</div>
      </div>
    );
  }

  // Se está autenticado, renderiza os children
  return <>{children}</>;
};

export default ProtectedRoute;
