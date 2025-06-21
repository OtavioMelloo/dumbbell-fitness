import React from "react";
import Image from "next/image";

const Carrossel = () => {
  return (
    <div className="relative w-full h-[400px]">
      <Image
        src="/img/carrossel1.svg"
        alt="Imagem carrossel 1"
        fill
        className="object-cover"
      />
    </div>
  );
};

export default Carrossel;
