import axios from "axios";

/**
 * Configuração da instância do Axios para comunicação com a API
 *
 * Esta instância é configurada com:
 * - URL base da API (localhost para desenvolvimento)
 * - Headers padrão para requisições JSON
 * - Interceptor para adicionar token de autenticação automaticamente
 * - Configurações que podem ser reutilizadas em todo o projeto
 */
const api = axios.create({
  // URL base da API - localhost para desenvolvimento
  baseURL: "http://localhost:8000/api/v1",

  // Headers padrão para todas as requisições
  headers: {
    "Content-Type": "application/json", // Indica que o corpo da requisição é JSON
  },
});

/**
 * Tipo para informações do usuário
 */
export interface UserInfo {
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  // Adicione outros campos conforme necessário
}

/**
 * Interceptor para adicionar token de autenticação automaticamente
 * Executa antes de cada requisição para incluir o token no header Authorization
 */
api.interceptors.request.use(
  (config) => {
    // Busca o token do localStorage
    const token = localStorage.getItem("drf_token");

    // Se existe um token, adiciona no header Authorization
    if (token) {
      config.headers.Authorization = `Token ${token}`; // DRF usa "Token" ao invés de "Bearer"
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor para tratar respostas da API
 * Pode ser usado para tratar erros de autenticação globalmente
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Se receber erro 401 (não autorizado), remove o token e redireciona para login
    if (error.response?.status === 401) {
      removeAuthData();
      // Redirecionar para login se estiver em uma página que requer autenticação
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Função para salvar dados de autenticação (token e informações do usuário)
 * @param token - Token DRF recebido do login
 * @param userInfo - Informações do usuário
 */
export const setAuthData = (token: string, userInfo: UserInfo) => {
  localStorage.setItem("drf_token", token);
  localStorage.setItem("user_info", JSON.stringify(userInfo));
};

/**
 * Função para remover dados de autenticação (logout)
 */
export const removeAuthData = () => {
  localStorage.removeItem("drf_token");
  localStorage.removeItem("user_info");
};

/**
 * Função para obter informações do usuário logado
 * @returns Informações do usuário ou null se não estiver logado
 */
export const getUserInfo = (): UserInfo | null => {
  const userInfoStr = localStorage.getItem("user_info");
  if (userInfoStr) {
    try {
      return JSON.parse(userInfoStr);
    } catch (error) {
      console.error("Erro ao parsear informações do usuário:", error);
      return null;
    }
  }
  return null;
};

/**
 * Função para verificar se o usuário está autenticado
 * @returns true se existe um token válido
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("drf_token");
};

/**
 * Função para obter o token atual
 * @returns Token atual ou null se não existir
 */
export const getToken = (): string | null => {
  return localStorage.getItem("drf_token");
};

/**
 * Função para fazer login e salvar dados de autenticação
 * @param credentials - Credenciais de login (username/email e password)
 * @returns Promise com dados de autenticação
 */
export const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    // Faz login na API DRF usando a URL correta
    const response = await axios.post(
      "http://localhost:8000/api-token-auth/",
      credentials
    );

    const { token } = response.data;

    // Cria um objeto básico com informações do usuário
    // (podemos buscar dados completos depois se necessário)
    const userInfo = {
      id: 0, // Será atualizado quando buscarmos dados completos
      username: credentials.username,
      email: credentials.username, // Assumindo que username é o email
      first_name: "",
      last_name: "",
    };

    // Salva dados de autenticação
    setAuthData(token, userInfo);

    return { token, user: userInfo };
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
};

/**
 * Função para fazer logout
 */
export const logoutUser = () => {
  removeAuthData();
  // Redireciona para página de login
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

/**
 * Função para buscar dados do usuário atual da API
 * @returns Promise com informações atualizadas do usuário
 */
export const fetchCurrentUser = async (): Promise<UserInfo> => {
  try {
    // Por enquanto, retorna os dados do localStorage
    // Se houver um endpoint específico para buscar dados do usuário, podemos implementar aqui
    const userInfo = getUserInfo();

    if (!userInfo) {
      throw new Error("Usuário não encontrado");
    }

    return userInfo;
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error);
    throw error;
  }
};

/**
 * Função para enviar dados do cartão para a API
 * @param dadosCartao - Dados do cartão e plano selecionado
 * @returns Promise com resposta da API
 */
export const enviarDadosCartao = async (dadosCartao: {
  numero_cartao: string;
  nome_cartao: string;
  data_validade: string;
  cvv: string;
  bandeira: string;
  plano_id: number;
  plano_nome: string;
  plano_preco: number;
}) => {
  try {
    const response = await api.post("/cadastros/cartoes/", dadosCartao);
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar dados do cartão:", error);
    throw error;
  }
};

export default api;
