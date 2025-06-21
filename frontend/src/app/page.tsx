import Header from "@/components/header";
import Carrossel from "@/components/carrossel";
import Modalidades from "@/components/modalidade/modalidades";
import Planos from "@/components/planos/planos";

export default function Home() {
  return (
    <div className="bg-gray w-screen flex flex-col items-center">
      <div className="w-[1250px]">
        <Header />
        <Carrossel />
        <Modalidades />
      </div>
      <div className="w-full flex items-center justify-center bg-gray1 py-[15px] mt-[40px]">
        <div className="w-[1250px] flex flex-col items-center justify-center">
          <h1 className="text-white text-6xl font-bebas p-5">PLANOS</h1>
          <Planos />
        </div>
      </div>
    </div>
  );
}
