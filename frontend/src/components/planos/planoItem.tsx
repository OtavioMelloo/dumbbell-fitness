"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Interface para as props do componente PlanoItem
 *
 * @property id - ID único do plano
 * @property titulo - Nome do plano
 * @property preco - Preço mensal do plano
 * @property beneficios - Lista de benefícios incluídos no plano
 * @property Icone - Componente React do ícone do plano
 * @property buttonBorder - Classe CSS para a cor da borda do card
 * @property buttonColor - Classe CSS para a cor de fundo do botão
 * @property buttonTextColor - Classe CSS para a cor do texto do botão (opcional)
 */
function PlanoItem({
  id,
  titulo,
  preco,
  beneficios,
  Icone,
  buttonBorder,
  buttonColor,
  buttonTextColor = "text-white", // Valor padrão para cor do texto
}: Readonly<{
  id: number;
  titulo: string;
  preco: number;
  beneficios: string[];
  Icone: React.ElementType;
  buttonBorder: string;
  buttonColor: string;
  buttonTextColor?: string;
}>) {
  // Hook para navegação
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  /**
   * Função para redirecionar baseado no status de autenticação
   */
  const handleAssinar = () => {
    const checkoutUrl = `/matricula/checkout?plano=${id}`;

    if (isAuthenticated) {
      // Se está autenticado, vai direto para checkout
      router.push(checkoutUrl);
    } else {
      // Se não está autenticado, vai para login com URL de retorno
      router.push(`/login?returnUrl=${encodeURIComponent(checkoutUrl)}`);
    }
  };

  // Converte preco para número para garantir que toFixed funcione
  const precoNumerico = typeof preco === "string" ? parseFloat(preco) : preco;

  return (
    <div
      className={`w-[390px] h-[620px] flex flex-col justify-between items-center border-4 ${buttonBorder} p-6 rounded-2xl min-h-[400px] bg-black`}
    >
      {/* Seção superior com título e benefícios */}
      <div className=" flex flex-col items-start text-white w-full gap-2">
        {/* Título do plano */}
        <h2 className="text-[49px] font-bebas text-center w-full">{titulo}</h2>

        {/* Lista de benefícios */}
        <ul
          id="lista"
          className="text-sm list-none p-0 h-full flex flex-col items-start"
        >
          {beneficios.map((b, i) => (
            <li
              key={i}
              className="flex items-center justify-center gap-4 text-xl text-white mb-4 w-full"
            >
              {/* Ícone do benefício com cor dinâmica baseada no plano */}
              <Icone
                className={`h-8 w-8 ${
                  buttonColor === "bg-secundary-purple"
                    ? "text-secundary-purple" // Cor roxa para plano Starter
                    : "text-lime-400" // Cor verde para plano Dumbbell
                }`}
              />
              <span className="w-full">{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Seção inferior com preço e botão */}
      <div className="flex flex-col items-center w-full">
        {/* Preço do plano */}
        <p className={`text-[61px] mb-[-10px] font-bebas text-white`}>
          R${precoNumerico.toFixed(2)}
        </p>

        {/* Botão de assinatura */}
        <button
          onClick={handleAssinar}
          className={`w-full py-4 px-4 text-center font-bold rounded ${buttonColor} ${buttonTextColor} transition hover:scale-105`}
        >
          ASSINAR AGORA
        </button>
      </div>
    </div>
  );
}

export default PlanoItem;
