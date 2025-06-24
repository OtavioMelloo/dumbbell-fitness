"use client";

import React from "react";
import { Trophy, Clock, Calendar } from "lucide-react";

interface LastCompletedRoutineProps {
  routine?: {
    id: number;
    name: string;
    objetivo: string;
    completedAt: string;
    duration?: string;
    exercisesCompleted?: number;
    totalExercises?: number;
  } | null;
}

const LastCompletedRoutine: React.FC<LastCompletedRoutineProps> = ({
  routine,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!routine) {
    return (
      <div className="bg-gray1 rounded-24 p-6 border border-gray2">
        <div className="flex items-center gap-3 mb-3">
          <Trophy className="text-gray-400" size={20} />
          <h3 className="text-white text-lg font-bebas">Última Rotina</h3>
        </div>
        <p className="text-gray-400 text-sm">
          Nenhuma rotina finalizada ainda.
        </p>
        <p className="text-gray-500 text-xs mt-2">
          Complete seu primeiro treino para ver aqui!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray1 rounded-24 p-6 border border-green-500">
      <div className="flex items-center gap-3 mb-3">
        <Trophy className="text-yellow-400" size={20} />
        <h3 className="text-white text-lg font-bebas">
          Última Rotina Finalizada
        </h3>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="text-white font-semibold text-sm">{routine.name}</h4>
          <p className="text-gray-300 text-xs">{routine.objetivo}</p>
        </div>

        {routine.exercisesCompleted !== undefined &&
          routine.totalExercises !== undefined && (
            <div className="bg-gray-800 rounded-lg p-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-300 text-xs">Exercícios</span>
                <span className="text-gray-300 text-xs">
                  {routine.exercisesCompleted}/{routine.totalExercises}
                </span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${
                      routine.totalExercises > 0
                        ? (routine.exercisesCompleted /
                            routine.totalExercises) *
                          100
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          )}

        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <Calendar size={14} />
          <span>{formatDate(routine.completedAt)}</span>
        </div>

        {routine.duration && (
          <div className="flex items-center gap-2 text-gray-400 text-xs">
            <Clock size={14} />
            <span>Duração: {routine.duration}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-green-400 text-xs">
          <Trophy size={14} />
          <span>Concluída com sucesso!</span>
        </div>
      </div>
    </div>
  );
};

export default LastCompletedRoutine;
