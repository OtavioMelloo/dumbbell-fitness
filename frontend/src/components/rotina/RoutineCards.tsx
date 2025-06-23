"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface RoutineCardProps {
  routine: {
    id: string;
    name: string;
  };
}

const RoutineCard: React.FC<RoutineCardProps> = ({ routine }) => {
  const router = useRouter();

  const handleStart = () => {
    router.push(`/appdumbbell/treino/${routine.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center mb-4 border border-gray-200">
      <span className="text-lg font-semibold text-gray-800">
        {routine.name}
      </span>

      <button
        onClick={handleStart}
        className="bg-lime-500 hover:bg-lime-600 text-gray-900 font-bold py-2 px-4 rounded-md transition-colors duration-200 ease-in-out"
      >
        Começar
      </button>
    </div>
  );
};

export default RoutineCard;
