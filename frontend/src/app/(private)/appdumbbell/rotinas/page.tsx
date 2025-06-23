"use client";

import RotinaHeader from "@/components/rotina/RotinaHeader";
import React, { useState } from "react";
import RotinaModal from "./RotinaModal";

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
const page = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    // lógica de salvar, atualizar lista, etc
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
    </main>
  );
};

export default page;
