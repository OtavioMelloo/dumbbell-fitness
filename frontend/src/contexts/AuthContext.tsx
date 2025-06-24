"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  UserInfo,
  isAuthenticated,
  getUserInfo,
  logoutUser,
  fetchCurrentUser,
  verificarMatriculaAtiva,
  limparUltimaRotinaFinalizada,
} from "@/services/api";

/**
 * Interface para o contexto de autenticação
 */
interface AuthContextType {
  user: UserInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasMatricula: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
  checkMatricula: () => Promise<void>;
}

/**
 * Contexto de autenticação
 * Fornece informações do usuário e estado de autenticação para toda a aplicação
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook personalizado para usar o contexto de autenticação
 * @returns Contexto de autenticação
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

/**
 * Props para o AuthProvider
 */
interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Provider do contexto de autenticação
 *
 * Funcionalidades:
 * - Gerencia estado de autenticação global
 * - Carrega informações do usuário automaticamente
 * - Fornece funções de logout e refresh
 * - Verifica autenticação na inicialização
 * - Verifica se o usuário tem matrícula ativa
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasMatricula, setHasMatricula] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  /**
   * Função para fazer logout
   * Remove dados de autenticação e atualiza o estado
   */
  const logout = () => {
    // Limpar última rotina finalizada do usuário atual
    if (user?.id) {
      limparUltimaRotinaFinalizada(user.id);
    }

    logoutUser();
    setUser(null);
    setHasMatricula(false);
    setIsAuth(false);
  };

  /**
   * Função para verificar matrícula do usuário
   */
  const checkMatricula = useCallback(async () => {
    if (user) {
      try {
        console.log("🔍 Verificando matrícula para usuário:", user.id);
        const temMatricula = await verificarMatriculaAtiva();
        console.log("✅ Resultado da verificação de matrícula:", temMatricula);
        setHasMatricula(temMatricula);
      } catch (error) {
        console.error("❌ Erro ao verificar matrícula:", error);
        setHasMatricula(false);
      }
    } else {
      console.log("⚠️ Usuário não disponível para verificar matrícula");
      setHasMatricula(false);
    }
  }, [user]);

  /**
   * Função para atualizar informações do usuário
   * Busca dados atualizados da API
   */
  const refreshUser = async () => {
    try {
      if (isAuthenticated()) {
        const userInfo = await fetchCurrentUser();
        setUser(userInfo);
        setIsAuth(true);

        // Verifica matrícula após atualizar usuário
        await checkMatricula();
      } else {
        setUser(null);
        setHasMatricula(false);
        setIsAuth(false);
      }
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
      // Não faz logout automático, apenas mantém o estado atual
      // Se o token ainda existe, mantém a autenticação
      if (isAuthenticated()) {
        console.log("Token ainda existe, mantendo autenticação");
        const cachedUser = getUserInfo();
        if (cachedUser) {
          setUser(cachedUser);
          setIsAuth(true);
        }
      } else {
        console.log("Token não existe, limpando autenticação");
        setUser(null);
        setHasMatricula(false);
        setIsAuth(false);
      }
    }
  };

  /**
   * Efeito para inicializar o estado de autenticação
   * Executa na montagem do componente
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log("🔍 Inicializando autenticação...");

        // Verifica se existe token de autenticação
        const hasToken = isAuthenticated();
        console.log("Token encontrado:", hasToken);

        if (hasToken) {
          // Tenta buscar informações do usuário do localStorage primeiro
          const cachedUser = getUserInfo();
          console.log("Usuário em cache:", cachedUser);

          if (cachedUser) {
            setUser(cachedUser);
            setIsAuth(true);
            console.log("✅ Usuário definido a partir do cache");

            // Verifica matrícula em background
            setTimeout(() => {
              checkMatricula();
            }, 1000);
          } else {
            console.log("Sem dados em cache, tentando buscar da API...");
            try {
              const userInfo = await fetchCurrentUser();
              setUser(userInfo);
              setIsAuth(true);
              console.log("✅ Usuário definido a partir da API");
            } catch (apiError) {
              console.error("Erro ao buscar usuário da API:", apiError);
              // Se não conseguir buscar da API, mantém o token mas limpa o usuário
              setUser(null);
              setIsAuth(false);
            }
          }
        } else {
          console.log("Sem token, limpando usuário");
          setUser(null);
          setHasMatricula(false);
          setIsAuth(false);
        }
      } catch (error) {
        console.error("Erro ao inicializar autenticação:", error);
        // Não faz logout automático em caso de erro, apenas limpa o estado
        setUser(null);
        setHasMatricula(false);
        setIsAuth(false);
      } finally {
        console.log("✅ Autenticação inicializada");
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    // Só executa no lado do cliente
    if (typeof window !== "undefined") {
      initializeAuth();
    } else {
      setIsLoading(false);
      setIsInitialized(true);
    }
  }, [checkMatricula]);

  /**
   * Valor do contexto
   */
  const value: AuthContextType = {
    user,
    isAuthenticated: isAuth,
    isLoading: isLoading || !isInitialized,
    hasMatricula,
    logout,
    refreshUser,
    checkMatricula,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
