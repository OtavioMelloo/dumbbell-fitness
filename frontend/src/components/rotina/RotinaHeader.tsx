"use client";

import React from "react";
import { Plus } from "lucide-react";
import ButtonLogin from "@/components/ButtonLogin";

interface RotinaHeaderProps {
  onAddClick: () => void;
}

const RotinaHeader = ({ onAddClick }: RotinaHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6  px-4 py-2 rounded-12 ">
      <h1 className="text-[42px] mb-[-10px] font-bebas text-white">ROTINAS</h1>

      <ButtonLogin
        onClick={onAddClick}
        variant="primary"
        className="flex items-center justify-center gap-2 w-60"
      >
        Adicionar Rotina
        <Plus size={18} />
      </ButtonLogin>
    </div>
  );
};

export default RotinaHeader;
