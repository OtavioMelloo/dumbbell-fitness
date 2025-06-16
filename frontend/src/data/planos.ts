import { CircleCheck } from 'lucide-react';

export type PlanoProps = {
    id: number;
    titulo: string;
    preco: string;
    beneficios: string[];
    Icone: React.ElementType;
};
    
export const planos: PlanoProps[] = [
    {
        id: 1,
        titulo: 'Plano Starter',
        preco: 'R$ 109.90/mês',
        beneficios: [ 
            'Escolha entre ginastica/dança ou musculação.',
            'Atendimento exclusivo com professores dumbbell.',
            'Escolha entre ginastica/dança ou musculação.',
            'Acesso ilimitado a unidade.',

        ],
        Icone: CircleCheck,
    },
    {
        id: 2,
        titulo: 'Plano Dumbbell',
        preco: 'R$ 129.90/mês',
        beneficios: [
            'Atendimento exclusivo com professores dumbbell.',
            'Escolha entre ginastica/dança ou musculação.',
            'Acesso ilimitado a unidade.',
            'Leve 3 amigos por mês para treinar com você.',
            'Sem multas ou taxas de cancelamento.',
        ],
        Icone: CircleCheck,
    }
]