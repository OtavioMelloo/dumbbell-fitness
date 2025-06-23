"use client";

import RotinaHeader from "@/components/rotina/RotinaHeader";
import React, { useState } from "react";
import RotinaModal from "./RotinaModal";

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
