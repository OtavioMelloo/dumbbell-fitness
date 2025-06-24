"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Play } from "lucide-react";

interface RoutineCardProps {
  routine: {
    id: string | number;
    name: string;
    objetivo?: string;
    disponibilidade?: string;
    data_criacao?: string;
  };
  onStart?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

const RoutineCard: React.FC<RoutineCardProps> = ({
  routine,
  onStart,
  onEdit,
  onDelete,
}) => {
  const router = useRouter();

  const handleStart = () => {
    if (onStart) {
      onStart(routine.id);
    } else {
      router.push(`/appdumbbell/treino/${routine.id}`);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(routine.id);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(routine.id);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <div className="bg-gray1 rounded-24 p-6 hover:bg-gray-700 transition-colors border border-gray2">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-white text-xl font-bebas">{routine.name}</h3>
            <div className="flex gap-2">
              {onEdit && (
                <button
                  onClick={handleEdit}
                  className="p-2 text-gray-300 hover:text-primary-green transition-colors"
                  title="Editar rotina"
                >
                  <Edit size={16} />
                </button>
              )}
              {onDelete && (
                <button
                  onClick={handleDelete}
                  className="p-2 text-gray-300 hover:text-red-400 transition-colors"
                  title="Deletar rotina"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>

          {routine.objetivo && (
            <p className="text-gray-300 text-sm mb-2">
              <span className="font-medium">Objetivo:</span> {routine.objetivo}
            </p>
          )}

          {routine.disponibilidade && (
            <p className="text-gray-300 text-sm mb-2">
              <span className="font-medium">Disponibilidade:</span>{" "}
              {routine.disponibilidade}
            </p>
          )}

          {routine.data_criacao && (
            <p className="text-gray-400 text-xs mb-4">
              Criado em: {formatDate(routine.data_criacao)}
            </p>
          )}

          <p className="text-gray-300 text-sm mb-4">
            Clique em &quot;Começar&quot; para iniciar esta rotina de
            exercícios.
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleStart}
            className="bg-primary-green hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 ease-in-out flex items-center gap-2"
          >
            <Play size={16} />
            Começar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoutineCard;
