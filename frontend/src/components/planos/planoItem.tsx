import React from "react";

function PlanoItem({
  titulo,
  preco,
  beneficios,
  Icone,
  buttonBorder,
  buttonColor,
  buttonTextColor = "text-white",
}: Readonly<{
  titulo: string;
  preco: number;
  beneficios: string[];
  Icone: React.ElementType;

  buttonBorder: string;
  buttonColor: string;
  buttonTextColor?: string;
}>) {
  return (
    <div
      className={`w-[390px] h-[620px] flex flex-col justify-between items-center border-4 ${buttonBorder} p-6 rounded-2xl min-h-[400px] bg-black`}
    >
      <div className=" flex flex-col items-start text-white w-full gap-2">
        <h2 className="text-[49px] font-bebas text-center w-full">{titulo}</h2>
        <ul
          id="lista"
          className="text-sm list-none p-0 h-full flex flex-col items-start"
        >
          {beneficios.map((b, i) => (
            <li
              key={i}
              className="flex items-center justify-center gap-4 text-xl text-white mb-4 w-full"
            >
              <Icone
                className={`h-8 w-8 ${
                  buttonColor === "bg-secundary-purple"
                    ? "text-secundary-purple"
                    : "text-lime-400"
                }`}
              />
              <span className="w-full">{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col items-center w-full">
        <p className={`text-[61px] mb-[-10px] font-bebas text-white`}>
          R${preco.toFixed(2)}
        </p>
        <button
          className={`w-full py-4 px-4 text-center font-bold rounded ${buttonColor} ${buttonTextColor} transition hover:scale-105`}
        >
          ASSINAR AGORA
        </button>
      </div>
    </div>
  );
}

export default PlanoItem;
