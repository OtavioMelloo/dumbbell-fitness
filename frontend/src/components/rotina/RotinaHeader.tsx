"use client";

import React from "react";
import { Plus } from "lucide-react";
import ButtonLogin from "@/components/ButtonLogin";

interface RotinaHeaderProps {
  onAddClick: () => void;
}

const RotinaHeader = ({ onAddClick }: RotinaHeaderProps) => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-[42px] mb-4 font-bebas text-white">ROTINAS</h1>

      <ButtonLogin
        onClick={onAddClick}
        variant="primary"
        className="flex items-center justify-center gap-2 w-48 mx-auto"
      >
        Adicionar Rotina
        <Plus size={16} />
      </ButtonLogin>
    </div>
  );
};

export default RotinaHeader;
