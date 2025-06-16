import { Dumbbell, AudioLines, Bike } from 'lucide-react';

export type Modalidade = {
    id: number;
    titulo: string;
    descricao: string;
    Icone: React.ElementType;
  };

  export const modalidades: Modalidade[] = [
    {
        id: 1,
        titulo: 'Musculação',
        descricao: 'Modalidade de treinamento físico focada no desenvolvimento e fortalecimento dos músculos esqueléticos através de exercícios resistidos, como o levantamento de pesos.',
        Icone: Dumbbell,
    },
    {
        id:2,
        titulo: 'Ginástica',
        descricao: 'Modalidade de treinamento físico que engloba uma série de movimentos sistematizados, visando aprimorar a força, flexibilidade e coordenação motora.',
        Icone: Bike,
    },
    {
        id: 3,
        titulo: 'Dança',
        descricao: "Modalidade rítmica, oferece uma forma dinâmica e envolvente de exercício físico, combinando movimento, ritmo e música para promover o bem-estar geral.",
        Icone: AudioLines,
    },
];