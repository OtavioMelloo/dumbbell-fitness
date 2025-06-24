import axios from "axios";

// Interfaces para tipos de dados
interface Cartao {
  aluno: number;
  numero_cartao: string;
  nome_titular: string;
  data_validade: string;
  bandeira_cartao: string;
}

interface Matricula {
  aluno: number;
  ativo: boolean;
  data_criacao: string;
}

interface Aluno {
  id: number;
  [key: string]: unknown;
}

/**
 * Configuração da instância do Axios para comunicação com a API
 *
 * Esta instância é configurada com:
 * - URL base da API (Render para produção)
 * - Headers padrão para requisições JSON
 * - Interceptor para adicionar token de autenticação automaticamente
 * - Configurações que podem ser reutilizadas em todo o projeto
 */
const api = axios.create({
  // URL base da API - Render para produção
  baseURL: "https://dumbbell-fitness-backend-wg7d.onrender.com/api/v1",

  // Headers padrão para todas as requisições
  headers: {
    "Content-Type": "application/json", // Indica que o corpo da requisição é JSON
  },

  // Timeout aumentado para 30 segundos (padrão é 0 = sem timeout)
  timeout: 30000,

  // Configurações adicionais para melhorar a estabilidade
  maxRedirects: 5,
  validateStatus: (status) => status < 500, // Aceita qualquer status < 500
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
    // Log para debug do método HTTP
    // console.log("🔧 Interceptor - Método HTTP:", config.method?.toUpperCase());
    // console.log("🔧 Interceptor - URL:", config.url);
    // console.log(
    //   "🔧 Interceptor - URL completa:",
    //   (config.baseURL || "") + (config.url || "")
    // );

    // Busca o token do localStorage
    const token = localStorage.getItem("drf_token");
    // console.log("🔧 Interceptor - Token encontrado:", token ? "Sim" : "Não");

    // Se existe um token, adiciona no header Authorization
    if (token) {
      config.headers.Authorization = `Token ${token}`; // DRF usa "Token" ao invés de "Bearer"
      // console.log("🔧 Interceptor - Header Authorization adicionado");
    } else {
      // console.log(
      //   "🔧 Interceptor - Nenhum token encontrado, requisição sem autenticação"
      // );
    }

    // console.log("🔧 Interceptor - Headers finais:", config.headers);
    return config;
  },
  (error) => {
    // console.error("🔧 Interceptor - Erro na requisição:", error);
    return Promise.reject(error);
  }
);

/**
 * Interceptor para tratar respostas da API
 * TEMPORÁRIO: Desabilitado para evitar loops de redirecionamento
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log(
    //   "🚨 Interceptor - Erro da API:",
    //   error.response?.status,
    //   error.config?.url
    // );

    // TEMPORÁRIO: Desabilitado redirecionamento automático
    // if (error.response?.status === 401) {
    //   console.log("🔑 Erro 401 - Removendo dados de autenticação");
    //   removeAuthData();
    //   if (
    //     typeof window !== "undefined" &&
    //     window.location.pathname !== "/login" &&
    //     window.location.pathname !== "/" &&
    //     !window.location.pathname.startsWith("/sobre") &&
    //     !window.location.pathname.startsWith("/matricula")
    //   ) {
    //     console.log("🔄 Redirecionando para login");
    //     window.location.href = "/login";
    //   }
    // }

    return Promise.reject(error);
  }
);

/**
 * Função para salvar dados de autenticação (token e informações do usuário)
 * @param token - Token DRF recebido do login
 * @param userInfo - Informações do usuário
 */
export const setAuthData = (token: string, userInfo: UserInfo) => {
  // Verifica se está no lado do cliente antes de acessar localStorage
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem("drf_token", token);
  localStorage.setItem("user_info", JSON.stringify(userInfo));
};

/**
 * Função para remover dados de autenticação (logout)
 */
export const removeAuthData = () => {
  // Verifica se está no lado do cliente antes de acessar localStorage
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem("drf_token");
  localStorage.removeItem("user_info");
};

/**
 * Função para obter informações do usuário logado
 * @returns Informações do usuário ou null se não estiver logado
 */
export const getUserInfo = (): UserInfo | null => {
  // Verifica se está no lado do cliente antes de acessar localStorage
  if (typeof window === "undefined") {
    return null;
  }

  const userInfoStr = localStorage.getItem("user_info");
  if (userInfoStr) {
    try {
      return JSON.parse(userInfoStr);
    } catch {
      // console.error("Erro ao parsear informações do usuário:", error);
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
  // Verifica se está no lado do cliente antes de acessar localStorage
  if (typeof window === "undefined") {
    return false;
  }
  return !!localStorage.getItem("drf_token");
};

/**
 * Função para obter o token atual
 * @returns Token atual ou null se não existir
 */
export const getToken = (): string | null => {
  // Verifica se está no lado do cliente antes de acessar localStorage
  if (typeof window === "undefined") {
    return null;
  }
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
      "https://dumbbell-fitness-backend-wg7d.onrender.com/api-token-auth/",
      credentials
    );

    const { token } = response.data;

    // Busca dados completos do usuário da API
    let userInfo: UserInfo;
    try {
      const userResponse = await axios.get(
        "https://dumbbell-fitness-backend-wg7d.onrender.com/api/v1/auth/user/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      const userData = userResponse.data;
      userInfo = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        first_name: userData.first_name,
        last_name: userData.last_name,
      };
    } catch {
      // console.error("Erro ao buscar dados do usuário:", userError);
      // Se não conseguir buscar dados completos, usa dados básicos
      userInfo = {
        id: 0,
        username: credentials.username,
        email: credentials.username, // Assume que username é email
      };
    }

    // Salva dados de autenticação
    setAuthData(token, userInfo);

    return { token, userInfo };
  } catch {
    // console.error("Erro no login:", error);
    throw new Error("Erro no login");
  }
};

/**
 * Função para fazer logout
 */
export const logoutUser = () => {
  removeAuthData();
  // TEMPORÁRIO: Desabilitado redirecionamento automático
  // if (typeof window !== "undefined") {
  //   window.location.href = "/login";
  // }
};

/**
 * Função para buscar dados do usuário atual da API
 * @returns Promise com informações atualizadas do usuário
 */
export const fetchCurrentUser = async (): Promise<UserInfo> => {
  try {
    // Busca dados do usuário da API
    const response = await api.get("/auth/user/");
    const userData = response.data;

    // Atualiza os dados no localStorage
    const userInfo: UserInfo = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      first_name: userData.first_name || "",
      last_name: userData.last_name || "",
    };

    // Salva os dados atualizados
    localStorage.setItem("user_info", JSON.stringify(userInfo));

    return userInfo;
  } catch {
    // console.warn("API não disponível, usando dados do localStorage:", error);

    // Se não conseguir buscar da API, tenta usar dados do localStorage
    const cachedUser = getUserInfo();
    if (cachedUser) {
      // console.log("Usando dados em cache do usuário:", cachedUser);
      return cachedUser;
    }

    // Se não há dados em cache, lança erro para forçar logout
    throw new Error("Usuário não encontrado");
  }
};

/**
 * Função para verificar se o usuário tem matrícula ativa
 * @param userId - ID do usuário
 * @returns Promise com true se tem matrícula ativa, false caso contrário
 */
export const verificarMatriculaAtiva = async (): Promise<boolean> => {
  try {
    // console.log("🔍 Verificando matrícula ativa para usuário:", userId);

    // Busca o usuário logado para obter o email
    const userInfo = getUserInfo();
    if (!userInfo) {
      // console.log("❌ Usuário não autenticado");
      return false;
    }

    // console.log("👤 Dados do usuário:", userInfo);

    // Busca o aluno pelo email do usuário
    const alunoUrl = `https://dumbbell-fitness-backend-wg7d.onrender.com/api/v1/cadastros/alunos/?email=${userInfo.email}`;
    // console.log("🔗 URL para buscar aluno:", alunoUrl);

    const token = getToken();
    // console.log("🔑 Token disponível:", !!token);

    const alunoResponse = await axios.get(alunoUrl, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    // console.log("📋 Resposta da busca por aluno:", alunoResponse.data);

    if (alunoResponse.data.results && alunoResponse.data.results.length > 0) {
      const aluno = alunoResponse.data.results[0];
      // console.log("👤 Aluno encontrado:", aluno.id);

      // Busca matrículas ativas do aluno
      const matriculaUrl = `/planos/matriculas/?aluno=${aluno.id}&ativo=true`;
      // console.log("🔗 URL para buscar matrículas:", matriculaUrl);

      const matriculaResponse = await api.get(matriculaUrl);

      // console.log("📋 Matrículas encontradas:", matriculaResponse.data);
      const temMatricula =
        matriculaResponse.data.results &&
        matriculaResponse.data.results.length > 0;
      // console.log("✅ Resultado final - Tem matrícula:", temMatricula);
      return temMatricula;
    }

    // console.log("❌ Aluno não encontrado");
    return false;
  } catch {
    // console.error("❌ Erro ao verificar matrícula ativa:", error);
    return false;
  }
};

/**
 * Função para criar um cartão de crédito
 * @param dadosCartao - Dados do cartão
 * @returns Promise com resposta da API
 */
export const criarCartao = async (dadosCartao: {
  numero_cartao: string;
  nome_titular: string;
  data_validade: string;
  cvv: string;
  bandeira_cartao: string;
}) => {
  try {
    // Busca o aluno associado ao usuário logado
    const userInfo = getUserInfo();
    if (!userInfo) {
      throw new Error("Usuário não autenticado");
    }

    const aluno = await buscarAlunoPorUsuario(userInfo.id);

    // Verifica se já existe um cartão com os mesmos dados para este aluno
    try {
      const cartoesResponse = await api.get(`/cadastros/cartoes/`);
      const cartoesExistentes = cartoesResponse.data;

      // Procura por um cartão com os mesmos dados
      const cartaoExistente = cartoesExistentes.find(
        (cartao: Cartao) =>
          cartao.aluno === aluno.id &&
          cartao.numero_cartao ===
            dadosCartao.numero_cartao.replace(/\s/g, "") &&
          cartao.nome_titular === dadosCartao.nome_titular &&
          cartao.data_validade === dadosCartao.data_validade &&
          cartao.bandeira_cartao === dadosCartao.bandeira_cartao
      );

      if (cartaoExistente) {
        // console.log(
        //   "✅ Cartão já existe, retornando cartão existente:",
        //   cartaoExistente
        // );
        return cartaoExistente;
      }
    } catch {
      // console.warn("Erro ao verificar cartões existentes, criando novo cartão:", error);
    }

    // Adiciona o campo aluno aos dados do cartão
    const dadosCompletos = {
      ...dadosCartao,
      aluno: aluno.id,
    };

    // console.log("🔄 Enviando dados do cartão para API:", dadosCompletos);
    const response = await api.post("/cadastros/cartoes/", dadosCompletos);
    // console.log("✅ Cartão criado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    // console.error("❌ Erro ao criar cartão:", error);

    // Log detalhado do erro
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: { status?: number; data?: unknown };
        config?: { url?: string; data?: unknown; headers?: unknown };
      };
      console.error("📊 Status do erro:", axiosError.response?.status);
      console.error("📋 Dados do erro:", axiosError.response?.data);
      console.error(
        "📋 Mensagem completa do erro:",
        JSON.stringify(axiosError.response?.data, null, 2)
      );
      console.error("🔗 URL que falhou:", axiosError.config?.url);
      console.error("📤 Dados enviados:", axiosError.config?.data);
      console.error("📤 Headers enviados:", axiosError.config?.headers);
    }

    throw error;
  }
};

/**
 * Função para criar uma matrícula
 * @param dadosMatricula - Dados da matrícula
 * @returns Promise com resposta da API
 */
export const criarMatricula = async (dadosMatricula: {
  plano: number;
  forma_pagamento: string;
  cartao: number;
  aluno?: number; // Campo opcional, será adicionado automaticamente
}) => {
  try {
    // Busca o aluno associado ao usuário logado
    const userInfo = getUserInfo();
    if (!userInfo) {
      throw new Error("Usuário não autenticado");
    }

    const aluno = await buscarAlunoPorUsuario(userInfo.id);

    // Verifica se já existe uma matrícula ativa para este aluno
    try {
      const matriculasResponse = await api.get(`/cadastros/matriculas/`);
      const matriculasExistentes = matriculasResponse.data;

      // Procura por uma matrícula ativa do mesmo aluno
      const matriculaExistente = matriculasExistentes.find(
        (matricula: Matricula) => matricula.aluno === aluno.id
      );

      if (matriculaExistente) {
        // Retorna um erro especial que será tratado no frontend
        const error = new Error("MATRICULA_EXISTENTE");
        (error as { matriculaExistente?: boolean }).matriculaExistente = true;
        throw error;
      }
    } catch (error) {
      if (error instanceof Error && error.message === "MATRICULA_EXISTENTE") {
        throw error; // Re-lança o erro especial
      }
      // console.warn(
      //   "Erro ao verificar matrículas existentes, continuando com criação:",
      //   error
      // );
    }

    // Substitui o ID do usuário pelo ID do aluno
    const dadosCompletos = {
      ...dadosMatricula,
      aluno: aluno.id,
    };

    // console.log("🔄 Enviando dados da matrícula para API:", dadosCompletos);
    const response = await api.post("/cadastros/matriculas/", dadosCompletos);
    // console.log("✅ Matrícula criada com sucesso:", response.data);
    return response.data;
  } catch (error) {
    // console.error("❌ Erro ao criar matrícula:", error);

    // Log detalhado do erro
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: { status?: number; data?: unknown };
        config?: { url?: string; data?: unknown };
      };
      console.error("📊 Status do erro:", axiosError.response?.status);
      console.error("📋 Dados do erro:", axiosError.response?.data);
      console.error(
        "📋 Mensagem completa do erro:",
        JSON.stringify(axiosError.response?.data, null, 2)
      );
      console.error("🔗 URL que falhou:", axiosError.config?.url);
      console.error("📤 Dados enviados:", axiosError.config?.data);
    }

    throw error;
  }
};

/**
 * Função para solicitar redefinição de senha
 * @param email - Email do usuário
 * @returns Promise com resposta da API
 */
export const solicitarRedefinicaoSenha = async (email: string) => {
  try {
    const response = await axios.post(
      "https://dumbbell-fitness-backend-wg7d.onrender.com/api/v1/auth/password-reset/",
      { email }
    );
    return response.data;
  } catch (error) {
    // console.error("Erro ao solicitar redefinição de senha:", error);
    throw error;
  }
};

/**
 * Função para redefinir senha com token
 * @param token - Token de redefinição
 * @param newPassword - Nova senha
 * @returns Promise com resposta da API
 */
export const redefinirSenha = async (token: string, newPassword: string) => {
  try {
    const response = await axios.post(
      "https://dumbbell-fitness-backend-wg7d.onrender.com/api/v1/auth/password-reset/confirm/",
      {
        token,
        new_password: newPassword,
      }
    );
    return response.data;
  } catch (error) {
    // console.error("Erro ao redefinir senha:", error);
    throw error;
  }
};

/**
 * Função para enviar dados do cartão para a API (DEPRECATED)
 * @param dadosCartao - Dados do cartão e plano selecionado
 * @returns Promise com resposta da API
 * @deprecated Use criarCartao and criarMatricula instead
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
    // console.error("Erro ao enviar dados do cartão:", error);
    throw error;
  }
};

/**
 * Função para buscar aluno pelo nome
 * @param nome - Nome do aluno
 * @returns Promise com dados do aluno
 */
export const buscarAlunoPorNome = async (nome: string) => {
  try {
    const response = await api.get(`/cadastros/alunos/?nome=${nome}`);
    return response.data;
  } catch (error) {
    // console.error("Erro ao buscar aluno por nome:", error);
    throw error;
  }
};

/**
 * Função para buscar aluno por email
 * @param email - Email do aluno
 * @returns Promise com dados do aluno
 */
export const buscarAlunoPorEmail = async (email: string) => {
  try {
    const response = await api.get(`/cadastros/alunos/?email=${email}`);
    return response.data;
  } catch (error) {
    // console.error("Erro ao buscar aluno por email:", error);
    throw error;
  }
};

/**
 * Função para atualizar o perfil do usuário
 * @param userData - Dados do usuário para atualizar
 * @returns Promise com dados atualizados do usuário
 */
export const atualizarPerfil = async (userData: {
  nome?: string;
  email?: string;
  sexo?: string;
  data_nascimento?: string;
  peso?: string;
  altura?: string;
  endereco?: number;
}) => {
  try {
    // Buscar o usuário atual
    const currentUser = getUserInfo();
    // console.log("Usuário atual:", currentUser);

    if (!currentUser) {
      throw new Error("Usuário não encontrado");
    }

    // Tentar atualizar via API
    try {
      // Buscar o aluno pelo nome
      if (!currentUser.first_name) {
        throw new Error("Nome do usuário não disponível");
      }

      const alunosResponse = await buscarAlunoPorNome(currentUser.first_name);
      // console.log("Resposta da busca por nome:", alunosResponse);

      if (!alunosResponse || alunosResponse.length === 0) {
        throw new Error("Aluno não encontrado na API");
      }

      const aluno = alunosResponse[0]; // Pega o primeiro resultado
      // console.log("Aluno encontrado:", aluno);

      const url = `/cadastros/alunos/${aluno.id}/`;
      // console.log("URL da requisição:", url);
      // console.log("Dados sendo enviados:", userData);

      const response = await api.patch(url, userData);
      return response.data;
    } catch {
      // console.warn("API não disponível, simulando atualização:", apiError);

      // Simular atualização salvando no localStorage
      const updatedUser: UserInfo = {
        ...currentUser,
        first_name: userData.nome || currentUser.first_name || "",
        email: userData.email || currentUser.email,
      };

      // Salvar dados atualizados no localStorage
      localStorage.setItem("user_info", JSON.stringify(updatedUser));

      // Retornar dados simulados
      return {
        id: updatedUser.id,
        nome: updatedUser.first_name,
        email: updatedUser.email,
        sexo: userData.sexo,
        data_nascimento: userData.data_nascimento,
        peso: userData.peso,
        altura: userData.altura,
        message: "Perfil atualizado (modo offline)",
      };
    }
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    throw error;
  }
};

/**
 * Função para buscar dados do aluno específico
 * @param alunoId - ID do aluno
 * @returns Promise com dados do aluno
 */
export const buscarAluno = async (alunoId: number) => {
  try {
    const response = await api.get(`/cadastros/alunos/${alunoId}/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar aluno:", error);
    throw error;
  }
};

/**
 * Função para listar todos os alunos (para debug)
 * @returns Promise com lista de alunos
 */
export const listarAlunos = async () => {
  try {
    const response = await api.get("/cadastros/alunos/");
    console.log("Lista de alunos:", response.data);

    // Mostrar detalhes de cada aluno
    response.data.forEach((aluno: Aluno, index: number) => {
      console.log(`Aluno ${index + 1} completo:`, aluno);
      console.log(`Campos do Aluno ${index + 1}:`, Object.keys(aluno));
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao listar alunos:", error);
    throw error;
  }
};

/**
 * Função para buscar exercícios da API
 * @returns Promise com lista de exercícios
 */
export const buscarExercicios = async () => {
  try {
    const response = await api.get("/exercicios/");
    console.log("Exercícios encontrados:", response.data);

    // Se a API retornou dados, processar e retornar
    if (response.data && response.data.length > 0) {
      // Processar os dados da API para garantir que todos os campos existam
      const exerciciosProcessados = response.data.map(
        (exercicio: {
          id: number;
          nome: string;
          descricao: string;
          categoria?: string;
          grupo_muscular?: string;
          equipamento?: string | null;
        }) => ({
          id: exercicio.id,
          nome: exercicio.nome,
          descricao: exercicio.descricao,
          categoria: exercicio.categoria || "Não definido",
          grupo_muscular: exercicio.grupo_muscular || "Não definido",
          equipamento: exercicio.equipamento || null,
        })
      );

      return exerciciosProcessados;
    } else {
      // Se a API retornou array vazio, usar exercícios padrão
      console.warn("API retornou array vazio, usando exercícios padrão");
      return getExerciciosPadrao();
    }
  } catch (error) {
    console.warn("API não disponível, retornando exercícios padrão:", error);
    return getExerciciosPadrao();
  }
};

/**
 * Função auxiliar para retornar exercícios padrão
 */
const getExerciciosPadrao = () => {
  return [
    {
      id: 1,
      nome: "Supino Reto",
      descricao:
        "Exercício fundamental para desenvolvimento do peitoral. Deite no banco, segure a barra com pegada pronada e execute o movimento controladamente.",
      categoria: "Musculação",
      grupo_muscular: "Peitoral",
      equipamento: "Barra e Banco",
    },
    {
      id: 2,
      nome: "Agachamento",
      descricao:
        "Exercício composto que trabalha principalmente quadríceps, glúteos e core. Posicione os pés na largura dos ombros e agache mantendo o peito erguido.",
      categoria: "Musculação",
      grupo_muscular: "Pernas",
      equipamento: "Barra ou Peso Corporal",
    },
    {
      id: 3,
      nome: "Levantamento Terra",
      descricao:
        "Exercício completo para força e estabilidade. Mantenha a coluna neutra e levante a barra do chão até a altura dos quadris.",
      categoria: "Musculação",
      grupo_muscular: "Costas",
      equipamento: "Barra",
    },
    {
      id: 4,
      nome: "Flexão de Braço",
      descricao:
        "Exercício funcional para tríceps e peitoral. Mantenha o corpo alinhado e execute o movimento controladamente.",
      categoria: "Funcional",
      grupo_muscular: "Tríceps",
      equipamento: "Peso Corporal",
    },
    {
      id: 5,
      nome: "Puxada na Frente",
      descricao:
        "Exercício para desenvolvimento das costas. Puxe a barra em direção ao peito, mantendo os cotovelos próximos ao corpo.",
      categoria: "Musculação",
      grupo_muscular: "Costas",
      equipamento: "Pulley",
    },
    {
      id: 6,
      nome: "Desenvolvimento",
      descricao:
        "Exercício para ombros e tríceps. Levante os pesos acima da cabeça, mantendo o controle do movimento.",
      categoria: "Musculação",
      grupo_muscular: "Ombros",
      equipamento: "Halteres ou Barra",
    },
    {
      id: 7,
      nome: "Corrida na Esteira",
      descricao:
        "Exercício cardiovascular que melhora a resistência e queima calorias. Mantenha uma postura ereta e respire naturalmente.",
      categoria: "Cardio",
      grupo_muscular: "Pernas",
      equipamento: "Esteira",
    },
    {
      id: 8,
      nome: "Bicicleta Ergométrica",
      descricao:
        "Exercício cardiovascular de baixo impacto. Ajuste a altura do banco e mantenha uma cadência constante.",
      categoria: "Cardio",
      grupo_muscular: "Pernas",
      equipamento: "Bicicleta Ergométrica",
    },
  ];
};

/**
 * Função para buscar exercícios para criação de treinos
 * @returns Promise com lista de exercícios
 */
export const buscarExerciciosParaTreino = async () => {
  try {
    const response = await api.get("/exercicios/");
    console.log("Exercícios para treino encontrados:", response.data);
    return response.data;
  } catch (error) {
    console.warn("API não disponível, retornando exercícios padrão:", error);
    return getExerciciosPadrao();
  }
};

/**
 * Interface para dados do treino
 */
export interface DadosTreino {
  nome?: string;
  aluno: number;
  objetivo: string;
  disponibilidade: string;
  observacao?: string;
}

/**
 * Interface para exercício do treino
 */
export interface ExercicioTreino {
  exercicio: number;
  series: number;
  repeticoes: number;
  carga?: number;
  descanso: number;
}

/**
 * Interface para criação completa do treino
 */
export interface CriarTreinoData {
  treino: DadosTreino;
  exercicios: ExercicioTreino[];
}

/**
 * Função para criar um novo treino
 * @param dadosTreino - Dados do treino e exercícios
 * @returns Promise com resposta da API
 */
export const criarTreino = async (dadosTreino: CriarTreinoData) => {
  try {
    console.log("🔄 Criando treino...");
    console.log("📋 Dados recebidos:", dadosTreino);
    console.log("📋 Tipo dos dados:", typeof dadosTreino);
    console.log(
      "📋 Estrutura dos dados:",
      JSON.stringify(dadosTreino, null, 2)
    );

    // Verificar se os dados estão corretos
    if (!dadosTreino.treino) {
      console.error("❌ dadosTreino.treino está undefined");
      throw new Error("Dados do treino inválidos");
    }

    if (!dadosTreino.exercicios || !Array.isArray(dadosTreino.exercicios)) {
      console.error(
        "❌ dadosTreino.exercicios está inválido:",
        dadosTreino.exercicios
      );
      throw new Error("Dados dos exercícios inválidos");
    }

    console.log("📋 Dados do treino:", dadosTreino.treino);
    console.log("📋 Quantidade de exercícios:", dadosTreino.exercicios.length);

    // Corrigir payload para o formato esperado pelo backend
    // O backend espera os dados da relação ExercicioTreino com series, repeticoes, carga, descanso
    const payload = {
      ...dadosTreino.treino,
      exercicios: dadosTreino.exercicios.map((ex) => ({
        exercicio: ex.exercicio,
        series: ex.series,
        repeticoes: ex.repeticoes,
        carga: ex.carga,
        descanso: ex.descanso,
      })),
    };

    console.log("📤 Payload final:", payload);
    console.log("📤 Payload JSON:", JSON.stringify(payload, null, 2));
    console.log("🔗 URL da requisição: /treinos/");
    console.log("🔧 Método HTTP: POST");

    const response = await api.post("/treinos/", payload);
    console.log("✅ Treino criado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao criar treino:", error);

    // Log detalhado do erro
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: { status?: number; data?: unknown };
        config?: { url?: string; data?: unknown; headers?: unknown };
      };
      console.error("📊 Status do erro:", axiosError.response?.status);
      console.error("📋 Dados do erro:", axiosError.response?.data);
      console.error(
        "📋 Mensagem completa do erro:",
        JSON.stringify(axiosError.response?.data, null, 2)
      );
      console.error("🔗 URL que falhou:", axiosError.config?.url);
      console.error("📤 Dados enviados:", axiosError.config?.data);
      console.error("📤 Headers enviados:", axiosError.config?.headers);
    }

    throw error;
  }
};

/**
 * Interface para dados completos do treino (incluindo ID)
 */
export interface TreinoCompleto {
  id: number;
  nome?: string;
  aluno: number;
  objetivo: string;
  disponibilidade: string;
  observacao?: string;
  exercicios: ExercicioTreino[];
  data_criacao?: string;
  data_atualizacao?: string;
}

/**
 * Função para buscar todos os treinos do usuário logado
 * @returns Promise com lista de treinos
 */
export const buscarTreinos = async (): Promise<TreinoCompleto[]> => {
  try {
    const response = await api.get("/treinos/");
    console.log("Treinos encontrados:", response.data);

    // Converter valores de disponibilidade para exibição completa
    const treinosConvertidos = response.data.map((treino: TreinoCompleto) => ({
      ...treino,
      disponibilidade: converterDisponibilidadeParaExibicao(
        treino.disponibilidade
      ),
    }));

    console.log("Treinos com disponibilidade convertida:", treinosConvertidos);
    return treinosConvertidos;
  } catch (error) {
    console.error("Erro ao buscar treinos:", error);
    throw error;
  }
};

/**
 * Função para buscar um treino específico por ID
 * @param treinoId - ID do treino
 * @returns Promise com dados do treino
 */
export const buscarTreinoPorId = async (
  treinoId: number
): Promise<TreinoCompleto> => {
  try {
    const response = await api.get(`/treinos/${treinoId}/`);
    console.log("Treino encontrado:", response.data);

    // Converter valor de disponibilidade para exibição completa
    const treinoConvertido = {
      ...response.data,
      disponibilidade: converterDisponibilidadeParaExibicao(
        response.data.disponibilidade
      ),
    };

    console.log("Treino com disponibilidade convertida:", treinoConvertido);
    return treinoConvertido;
  } catch (error) {
    console.error("Erro ao buscar treino:", error);
    throw error;
  }
};

/**
 * Função para atualizar um treino existente
 * @param treinoId - ID do treino
 * @param dadosTreino - Dados atualizados do treino
 * @returns Promise com resposta da API
 */
export const atualizarTreino = async (
  treinoId: number,
  dadosTreino: CriarTreinoData
) => {
  try {
    console.log("🔍 Atualizando treino ID:", treinoId);
    console.log("📋 Dados recebidos:", dadosTreino);

    // Corrigir payload para o formato esperado pelo backend
    // O backend espera os dados da relação ExercicioTreino com series, repeticoes, carga, descanso
    const payload = {
      ...dadosTreino.treino,
      exercicios: dadosTreino.exercicios.map((ex) => ({
        exercicio: ex.exercicio,
        series: ex.series,
        repeticoes: ex.repeticoes,
        carga: ex.carga,
        descanso: ex.descanso,
      })),
    };

    console.log("📤 Payload sendo enviado:", payload);
    console.log("🔗 URL da requisição:", `/treinos/${treinoId}/`);
    console.log("🔧 Método HTTP: PATCH");

    const response = await api.patch(`/treinos/${treinoId}/`, payload);
    console.log("✅ Treino atualizado com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao atualizar treino:", error);

    // Log detalhado do erro
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as {
        response?: { status?: number; data?: unknown };
        config?: { url?: string; data?: unknown };
      };
      console.error("📊 Status do erro:", axiosError.response?.status);
      console.error("📋 Dados do erro:", axiosError.response?.data);
      console.error(
        "📋 Mensagem completa do erro:",
        JSON.stringify(axiosError.response?.data, null, 2)
      );
      console.error("🔗 URL que falhou:", axiosError.config?.url);
      console.error("📤 Dados enviados:", axiosError.config?.data);
    }

    throw error;
  }
};

/**
 * Função para deletar um treino
 * @param treinoId - ID do treino
 * @returns Promise com resposta da API
 */
export const deletarTreino = async (treinoId: number) => {
  try {
    console.log("Deletando treino:", treinoId);

    const response = await api.delete(`/treinos/${treinoId}/`);
    console.log("Treino deletado com sucesso");
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar treino:", error);
    throw error;
  }
};

/**
 * Função para buscar aluno pelo ID do usuário
 * @param userId - ID do usuário
 * @returns Promise com dados do aluno
 */
export const buscarAlunoPorUsuario = async (userId: number) => {
  try {
    console.log("🔍 Buscando aluno por usuário ID:", userId);
    const response = await api.get(`/cadastros/alunos/?user=${userId}`);
    console.log("📋 Resposta da API de alunos:", response.data);

    if (response.data && response.data.length > 0) {
      const aluno = response.data[0];
      console.log("✅ Aluno encontrado:", aluno);
      return aluno; // Retorna o primeiro resultado
    }

    console.log("❌ Nenhum aluno encontrado para o usuário ID:", userId);
    throw new Error("Aluno não encontrado para este usuário");
  } catch (error) {
    console.error("❌ Erro ao buscar aluno por usuário:", error);
    throw error;
  }
};

/**
 * Função para buscar informações detalhadas da matrícula do usuário
 * @param userId - ID do usuário
 * @returns Promise com informações da matrícula e plano
 */
export const buscarMatriculaDetalhada = async (userId: number) => {
  try {
    console.log("🔍 Buscando matrícula detalhada para usuário:", userId);

    // Busca o usuário logado para obter o email
    const userInfo = getUserInfo();
    if (!userInfo) {
      console.log("❌ Usuário não autenticado");
      return null;
    }

    // Busca o aluno pelo email do usuário
    const alunoUrl = `https://dumbbell-fitness-backend-wg7d.onrender.com/api/v1/cadastros/alunos/?email=${userInfo.email}`;
    const token = getToken();

    const alunoResponse = await axios.get(alunoUrl, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (alunoResponse.data.results && alunoResponse.data.results.length > 0) {
      const aluno = alunoResponse.data.results[0];
      console.log("👤 Aluno encontrado:", aluno.id);

      // Busca matrículas ativas do aluno com detalhes do plano
      const matriculaUrl = `/planos/matriculas/?aluno=${aluno.id}&ativo=true&expand=plano`;
      const matriculaResponse = await api.get(matriculaUrl);

      console.log("📋 Matrículas encontradas:", matriculaResponse.data);

      if (
        matriculaResponse.data.results &&
        matriculaResponse.data.results.length > 0
      ) {
        const matricula = matriculaResponse.data.results[0];
        console.log("✅ Matrícula ativa encontrada:", matricula);
        return matricula;
      }
    }

    console.log("❌ Nenhuma matrícula ativa encontrada");
    return null;
  } catch (error) {
    console.error("❌ Erro ao buscar matrícula detalhada:", error);
    return null;
  }
};

/**
 * Função para buscar matrícula ativa do aluno logado diretamente da rota /cadastros/matriculas/
 * @returns Promise com a matrícula ativa mais recente ou null
 */
export const buscarMatriculaPorAluno = async () => {
  try {
    const userInfo = getUserInfo();
    if (!userInfo) {
      throw new Error("Usuário não autenticado");
    }
    // Buscar o aluno pelo userId
    const aluno = await buscarAlunoPorUsuario(userInfo.id);
    if (!aluno || !aluno.id) {
      throw new Error("Aluno não encontrado");
    }
    // Buscar matrículas do aluno
    const response = await api.get(`/cadastros/matriculas/?aluno=${aluno.id}`);
    const matriculas = response.data.results || response.data;
    // Filtrar matrícula ativa mais recente
    const matriculaAtiva = matriculas
      .filter((m: Matricula) => m.ativo)
      .sort(
        (a: Matricula, b: Matricula) =>
          new Date(b.data_criacao).getTime() -
          new Date(a.data_criacao).getTime()
      )[0];

    if (matriculaAtiva && matriculaAtiva.plano) {
      // Mapear ID do plano para nome
      let nomePlano = "Plano Desconhecido";
      if (matriculaAtiva.plano === 1) {
        nomePlano = "Dumbbell";
      } else if (matriculaAtiva.plano === 2) {
        nomePlano = "Starter";
      }

      // Retornar matrícula com nome do plano mapeado
      return {
        ...matriculaAtiva,
        plano: {
          id: matriculaAtiva.plano,
          nome: nomePlano,
        },
      };
    }

    return matriculaAtiva || null;
  } catch (error) {
    console.error("Erro ao buscar matrícula do aluno:", error);
    return null;
  }
};

// =============================================================================
// FUNÇÕES UTILITÁRIAS PARA CONVERSÃO DE DADOS
// =============================================================================

/**
 * Converte valores de disponibilidade de formato abreviado para completo
 * @param valor - Valor abreviado (D, A, S) ou completo
 * @returns Valor completo para exibição
 */
export const converterDisponibilidadeParaExibicao = (valor: string): string => {
  const mapeamento: { [key: string]: string } = {
    D: "Diário",
    A: "Alternado",
    S: "Semanal",
    Diário: "Diário",
    Alternado: "Alternado",
    Semanal: "Semanal",
  };
  return mapeamento[valor] || valor;
};

/**
 * Converte valores de disponibilidade de formato completo para abreviado
 * @param valor - Valor completo (Diário, Alternado, Semanal) ou abreviado
 * @returns Valor abreviado para API
 */
export const converterDisponibilidadeParaAPI = (valor: string): string => {
  const mapeamento: { [key: string]: string } = {
    Diário: "D",
    Alternado: "A",
    Semanal: "S",
    D: "D",
    A: "A",
    S: "S",
  };
  return mapeamento[valor] || valor;
};

/**
 * Função para salvar a última rotina finalizada específica do usuário
 * @param completedRoutine - Dados da rotina finalizada
 * @param userId - ID do usuário
 */
export const salvarUltimaRotinaFinalizada = (
  completedRoutine: unknown,
  userId?: number
) => {
  if (typeof window === "undefined") {
    return;
  }

  const user = userId || getUserInfo()?.id || "anonymous";
  const storageKey = `lastCompletedRoutine_${user}`;
  localStorage.setItem(storageKey, JSON.stringify(completedRoutine));
};

/**
 * Função para obter a última rotina finalizada específica do usuário
 * @param userId - ID do usuário (opcional, usa o usuário logado se não fornecido)
 * @returns Dados da última rotina finalizada ou null
 */
export const obterUltimaRotinaFinalizada = (userId?: number) => {
  if (typeof window === "undefined") {
    return null;
  }

  const user = userId || getUserInfo()?.id || "anonymous";
  const storageKey = `lastCompletedRoutine_${user}`;
  const lastCompleted = localStorage.getItem(storageKey);

  if (lastCompleted) {
    try {
      return JSON.parse(lastCompleted);
    } catch (error) {
      console.error("Erro ao parsear última rotina finalizada:", error);
      return null;
    }
  }

  return null;
};

/**
 * Função para limpar a última rotina finalizada específica do usuário
 * @param userId - ID do usuário (opcional, usa o usuário logado se não fornecido)
 */
export const limparUltimaRotinaFinalizada = (userId?: number) => {
  if (typeof window === "undefined") {
    return;
  }

  const user = userId || getUserInfo()?.id || "anonymous";
  const storageKey = `lastCompletedRoutine_${user}`;
  localStorage.removeItem(storageKey);
};

// =============================================================================
// CONFIGURAÇÃO DO AXIOS
// =============================================================================

export default api;
