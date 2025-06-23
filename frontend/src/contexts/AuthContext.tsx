"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  UserInfo,
  isAuthenticated,
  getUserInfo,
  logoutUser,
  fetchCurrentUser,
} from "@/services/api";

/**
 * Interface para o contexto de autenticação
 */
interface AuthContextType {
  user: UserInfo | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
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
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Função para fazer logout
   * Remove dados de autenticação e atualiza o estado
   */
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  /**
   * Função para atualizar informações do usuário
   * Busca dados atualizados da API
   */
  const refreshUser = async () => {
    try {
      if (isAuthenticated()) {
        const userInfo = await fetchCurrentUser();
        setUser(userInfo);
      }
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
      // Se não conseguir buscar dados, faz logout
      logout();
    }
  };

  /**
   * Efeito para inicializar o estado de autenticação
   * Executa na montagem do componente
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Verifica se existe token de autenticação
        if (isAuthenticated()) {
          // Tenta buscar informações do usuário do localStorage primeiro
          const cachedUser = getUserInfo();
          if (cachedUser) {
            setUser(cachedUser);
          }

          // Depois tenta buscar dados atualizados da API
          try {
            const userInfo = await fetchCurrentUser();
            setUser(userInfo);
          } catch (error) {
            console.warn(
              "Não foi possível buscar dados atualizados do usuário:",
              error
            );
            // Se não conseguir buscar da API mas tem dados em cache, mantém os dados em cache
            if (!cachedUser) {
              logout();
            }
          }
        }
      } catch (error) {
        console.error("Erro ao inicializar autenticação:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Valor do contexto
   */
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
