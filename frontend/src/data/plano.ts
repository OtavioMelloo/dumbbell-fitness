import { CircleCheck } from "lucide-react";

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
    Icone: CircleCheck,
    buttonBorder: "border-secundary-purple",
    buttonColor: "bg-secundary-purple",
    buttonTextColor: "text-white",
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
    Icone: CircleCheck,
    buttonBorder: "border-primary-green",
    buttonColor: "bg-primary-green",
    buttonTextColor: "text-black",
  },
];
