import Header from "@/components/header";
// import Carrossel from "@/components/carrossel";
import Modalidades from "@/components/modalidade/modalidades";
import Planos from "@/components/planos/planosItem";

export default function Home() {
  return (
    <div className="bg-grayp">
      <div className="w-[1250px]">
        <Header />
        <Modalidades />
        <Planos />
      </div>
    </div>
    
  );
}