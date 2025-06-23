"use client";

import RotinaHeader from "@/components/rotina/RotinaHeader";
import React, { useState } from "react";
import RotinaModal from "./RotinaModal";
import RoutineCard from "@/components/rotina/RoutineCards";

/**
 * Página de Rotinas
 *
 * Esta página exibe as rotinas de exercícios disponíveis para o usuário.
 * Atualmente em desenvolvimento - placeholder com fundo amarelo.
 *
 * Funcionalidades planejadas:
 * - Lista de rotinas personalizadas
 * - Filtros por modalidade
 * - Histórico de treinos
 * - Progresso do usuário
 */
const Page = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    setShowModal(false);
  };

  return (
    <main>
      <RotinaHeader onAddClick={() => setShowModal(true)} />

      {showModal && (
        <RotinaModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
        />
      )}

      <div>
        <RoutineCard
          routine={{ id: "1", name: "teste" }}
          onStart={(id) => console.log("Começar rotina:", id)}
        />
      </div>
      <div>
        <RoutineCard
          routine={{ id: "2", name: "teste2" }}
          onStart={(id) => console.log("Começar rotina:", id)}
        />
      </div>
    </main>
  );
};

export default Page;
