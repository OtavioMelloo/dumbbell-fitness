import Header from "@/components/header";
import Carrossel from "@/components/carrossel";
import Modalidades from "@/components/modalidade/modalidades";
import Planos from "@/components/planos/planos";

/**
 * Página Principal (Home) da Academia Dumbbell
 *
 * Esta é a página inicial do site, contendo:
 * - Header com navegação
 * - Carrossel de imagens promocionais
 * - Seção de modalidades esportivas
 * - Seção de planos disponíveis
 *
 * Layout responsivo com largura máxima de 1250px
 */
export default function Home() {
  return (
    <div className="bg-gray w-screen flex flex-col items-center">
      {/* Container principal com largura máxima */}
      <div className="w-full max-w-[1250px] px-4">
        {/* Cabeçalho da página */}
        <Header />

        {/* Carrossel de imagens promocionais */}
        <Carrossel />

        {/* Seção de modalidades esportivas */}
        <div id="modalidades">
          <Modalidades />
        </div>
      </div>

      {/* Seção de planos com fundo diferente */}
      <div
        id="planos"
        className="w-full flex items-center justify-center bg-gray1 py-[15px] mt-[40px]"
      >
        <div className="w-full max-w-[1250px] px-4 flex flex-col items-center justify-center">
          {/* Título da seção de planos */}
          <h1 className="text-white text-6xl font-bebas p-5">PLANOS</h1>

          {/* Componente que exibe os planos disponíveis */}
          <Planos />
        </div>
      </div>
    </div>
  );
}
