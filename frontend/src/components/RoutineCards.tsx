import React from "react";

/**
 * Interface para as props do componente RoutineCard
 *
 * @property routine - Objeto contendo informações da rotina
 * @property routine.id - Identificador único da rotina
 * @property routine.name - Nome da rotina
 * @property onStart - Função callback executada quando o usuário inicia a rotina
 */
interface RoutineCardProps {
  routine: {
    id: string;
    name: string;
  };
  onStart: (routineId: string) => void;
}

/**
 * Componente RoutineCard
 *
 * Card que exibe uma rotina de exercícios com:
 * - Nome da rotina
 * - Botão para iniciar a rotina
 * - Estilização consistente com design system
 *
 * @param routine - Dados da rotina a ser exibida
 * @param onStart - Função chamada quando o usuário clica em "Começar"
 */
const RoutineCard: React.FC<RoutineCardProps> = ({ routine, onStart }) => {
  return (
    <div
      className="
        bg-white
        rounded-lg
        shadow-md
        p-4
        flex
        justify-between
        items-center
        mb-4
        border border-gray-200
      "
    >
      {/* Nome da rotina */}
      <span className="text-lg font-semibold text-gray-800">
        {routine.name}
      </span>

      {/* Botão para iniciar a rotina */}
      <button
        onClick={() => onStart(routine.id)}
        className="
          bg-lime-500
          hover:bg-lime-600
          text-gray-900
          font-bold
          py-2
          px-4
          rounded-md
          transition-colors
          duration-200
          ease-in-out
        "
      >
        Começar
      </button>
    </div>
  );
};

export default RoutineCard;
