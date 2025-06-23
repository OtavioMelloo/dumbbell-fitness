import React from "react";
import Planos from "@/components/planos/planos";

/**
 * Página de Matrícula da Academia Dumbbell
 *
 * Esta página permite que novos usuários se matriculem na academia.
 * Contém apenas:
 * - Seção de planos disponíveis para matrícula
 *
 * Layout responsivo com largura máxima de 1250px
 */
const Matricula = () => {
  return (
    <div className="bg-gray w-screen h-screen flex flex-col items-center justify-center">
      {/* Seção de planos centralizada */}
      <div className="w-full flex items-center justify-center bg-gray1 py-[15px]">
        <div className="w-[1250px] flex flex-col items-center justify-center">
          {/* Título da seção de planos */}
          <h1 className="text-white text-6xl font-bebas p-5">PLANOS</h1>

          {/* Componente que exibe os planos disponíveis */}
          <Planos />
        </div>
      </div>
    </div>
  );
};

export default Matricula;
