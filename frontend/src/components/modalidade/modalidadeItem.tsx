import React from "react";

function ModalidadeItem({
  titulo,
  descricao,
  Icone,
}: Readonly<{ titulo: string; descricao: string; Icone: React.ElementType }>) {
  return (
    <div className="w-full flex gap-10 items-center justify-center h-[180px] bg-gray1 mt-8 rounded-24 shadow-md shadow-primary-green ">
      <Icone className="text-primary-green w-[150px] h-[150px] mx-6" />
      <div className="w-full mt-[10px] mb-[10px]">
        <h1 className="text-2xl font-bold text-white">{titulo}</h1>
        <p className="text-lg w-full mr-10px text-white">{descricao}</p>
      </div>
    </div>
  );
}


export default ModalidadeItem;
