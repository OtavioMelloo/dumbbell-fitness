"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface MatriculaCheckProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * Componente para verificar se o usuário tem matrícula ativa
 * TEMPORÁRIO: Desabilitado para evitar loops de redirecionamento
 */
const MatriculaCheck: React.FC<MatriculaCheckProps> = ({ children }) => {
  const { user, isAuthenticated, hasMatricula, isLoading } = useAuth();
  const pathname = usePathname();

  console.log("🔍 MatriculaCheck - Estado atual:");
  console.log("  - Pathname:", pathname);
  console.log("  - isLoading:", isLoading);
  console.log("  - isAuthenticated:", isAuthenticated);
  console.log("  - user:", user);
  console.log("  - hasMatricula:", hasMatricula);

  // TEMPORÁRIO: Permite acesso a todas as páginas sem verificação
  // Se não está autenticado, não renderiza nada (será redirecionado pelo ProtectedRoute)
  if (!isAuthenticated) {
    return null;
  }

  // Permite acesso a todas as páginas autenticadas
  return <>{children}</>;
};

export default MatriculaCheck;
