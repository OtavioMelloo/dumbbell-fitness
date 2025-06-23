import { CircleCheck } from "lucide-react";

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
 * Array de planos disponíveis na academia
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
