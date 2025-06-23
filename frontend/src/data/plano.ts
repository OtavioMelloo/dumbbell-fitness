import { CircleCheck } from "lucide-react";
import api from "../services/api";

/**
 * Tipo TypeScript para definir a estrutura de um plano de academia
 *
 * @property id - Identificador único do plano
 * @property titulo - Nome do plano
 * @property preco - Preço mensal do plano
 * @property beneficios - Lista de benefícios incluídos no plano
 * @property Icone - Componente React do ícone do plano
 * @property buttonColor - Cor de fundo do botão do plano
 * @property buttonBorder - Cor da borda do botão do plano
 * @property buttonTextColor - Cor do texto do botão (opcional)
 */
export type PlanoProps = {
  id: number;
  titulo: string;
  preco: number;
  beneficios: string[];
  Icone: React.ElementType;

  buttonColor: string;
  buttonBorder: string;
  buttonTextColor?: string;
};

/**
 * Tipo para os dados retornados pela API
 * Estrutura esperada da resposta da API Django
 */
export type PlanoAPI = {
  id: number;
  titulo: string;
  preco: number | string; // Pode vir como string da API
  descricao: string;
  beneficios: string[];
  ativo: boolean;
  created_at: string;
  updated_at: string;
};

/**
 * Função para buscar planos da API
 * @returns Promise com array de planos da API
 */
export const fetchPlanosFromAPI = async (): Promise<PlanoAPI[]> => {
  try {
    const response = await api.get("/planos/");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar planos da API:", error);
    throw error;
  }
};

/**
 * Função para converter dados da API para o formato usado no frontend
 * @param planosAPI - Array de planos vindos da API
 * @returns Array de planos no formato PlanoProps
 */
export const convertPlanosFromAPI = (planosAPI: PlanoAPI[]): PlanoProps[] => {
  return planosAPI.map((planoAPI, index) => ({
    id: planoAPI.id,
    titulo: planoAPI.titulo,
    preco:
      typeof planoAPI.preco === "string"
        ? parseFloat(planoAPI.preco)
        : planoAPI.preco,
    beneficios: planoAPI.beneficios,
    Icone: CircleCheck,
    buttonBorder:
      index === 0 ? "border-secundary-purple" : "border-primary-green",
    buttonColor: index === 0 ? "bg-secundary-purple" : "bg-primary-green",
    buttonTextColor: index === 0 ? "text-white" : "text-black",
  }));
};

/**
 * Função para buscar planos com fallback para dados mockados
 * @returns Promise com array de planos (da API ou mockados)
 */
export const getPlanos = async (): Promise<PlanoProps[]> => {
  try {
    // Tenta buscar da API primeiro
    const planosAPI = await fetchPlanosFromAPI();
    return convertPlanosFromAPI(planosAPI);
  } catch (error) {
    console.warn("Usando dados mockados devido a erro na API:", error);
    // Se falhar, retorna os dados mockados
    return plano;
  }
};

/**
 * Array de planos disponíveis na academia (dados mockados como fallback)
 *
 * Cada plano contém:
 * - Informações básicas (título, preço)
 * - Lista de benefícios específicos
 * - Configurações visuais para o botão
 * - Ícone representativo
 */
export const plano: PlanoProps[] = [
  {
    id: 1,
    titulo: "Plano Starter",
    preco: 109.9,
    beneficios: [
      "Escolha entre ginástica/dança ou musculação.",
      "Atendimento exclusivo com professores dumbbell.",
      "Acesso ilimitado à unidade.",
    ],
    Icone: CircleCheck, // Ícone de check do Lucide React
    buttonBorder: "border-secundary-purple", // Borda roxa
    buttonColor: "bg-secundary-purple", // Fundo roxo
    buttonTextColor: "text-white", // Texto branco
  },
  {
    id: 2,
    titulo: "Plano Dumbbell",
    preco: 129.9,
    beneficios: [
      "Atendimento exclusivo com professores dumbbell.",
      "Escolha entre ginástica/dança ou musculação.",
      "Acesso ilimitado à unidade.",
      "Leve 3 amigos por mês para treinar com você.",
      "Sem multas ou taxas de cancelamento.",
    ],
    Icone: CircleCheck, // Ícone de check do Lucide React
    buttonBorder: "border-primary-green", // Borda verde
    buttonColor: "bg-primary-green", // Fundo verde
    buttonTextColor: "text-black", // Texto preto
  },
];
