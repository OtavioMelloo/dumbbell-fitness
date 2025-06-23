import axios from "axios";

/**
 * Configuração da instância do Axios para comunicação com a API
 *
 * Esta instância é configurada com:
 * - URL base da API
 * - Headers padrão para requisições JSON
 * - Configurações que podem ser reutilizadas em todo o projeto
 */
const api = axios.create({
  // URL base da API - deve ser alterada para a URL real do seu backend
  baseURL: "https://seu-backend-na-railway.app/api",

  // Headers padrão para todas as requisições
  headers: {
    "Content-Type": "application/json", // Indica que o corpo da requisição é JSON
  },
});

export default api;
