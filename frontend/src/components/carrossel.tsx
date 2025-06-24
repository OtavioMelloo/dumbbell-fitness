import React from "react";
import Image from "next/image";

/**
 * Componente Carrossel
 *
 * Exibe uma imagem promocional em formato de carrossel.
 * Atualmente mostra uma imagem estática, mas pode ser expandido
 * para incluir múltiplas imagens com navegação.
 *
 * Características:
 * - Altura fixa de 400px
 * - Imagem responsiva que cobre todo o container
 * - Otimização de imagem com Next.js Image
 */
const Carrossel = () => {
  return (
    <div className="relative w-full h-[400px]">
      {/* Imagem promocional do carrossel */}
      <Image
        src="/img/carrossel1.svg" // Caminho da imagem no diretório public
        alt="Imagem carrossel 1" // Texto alternativo para acessibilidade
        fill // Preenche todo o container pai
        priority // Prioriza o carregamento da imagem (LCP)
        className="object-cover" // Mantém proporção e cobre todo o espaço
      />
    </div>
  );
};

export default Carrossel;
