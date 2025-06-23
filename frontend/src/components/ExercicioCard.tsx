import React from "react";

interface Exercicio {
  id: number;
  nome: string;
  descricao: string;
}

interface ExercicioCardProps {
  exercicio: Exercicio;
}

const ExercicioCard: React.FC<ExercicioCardProps> = ({ exercicio }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900">{exercicio.nome}</h2>
      <p className="text-gray-700 mt-2">{exercicio.descricao}</p>
    </div>
  );
};

export default ExercicioCard;
