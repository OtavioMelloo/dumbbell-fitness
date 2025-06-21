import PlanoItem from "./planoItem";
import { plano, PlanoProps } from "@/data/plano";

function Planos() {
  return (
    <div className="w-full px-4 flex justify-evenly items-center mt-[5px] mb-[5px]">
      {plano.map((item: PlanoProps) => (
        <PlanoItem
          key={item.id}
          titulo={item.titulo}
          preco={item.preco}
          beneficios={item.beneficios}
          Icone={item.Icone}
          buttonBorder={item.buttonBorder}
          buttonColor={item.buttonColor}
          buttonTextColor={item.buttonTextColor}
        />
      ))}
    </div>
  );
}

export default Planos;
