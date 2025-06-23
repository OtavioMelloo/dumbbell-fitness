"use client";

import { useEffect, useState } from "react";
import PlanoItem from "./planoItem";
import { PlanoProps, getPlanos } from "@/data/plano";

/**
 * Componente Planos
 *
 * Container que renderiza todos os planos disponíveis na academia.
 * Busca dados da API Django DRF e renderiza dinamicamente os planos.
 *
 * Funcionalidades:
 * - Busca planos da API automaticamente
 * - Renderiza dinamicamente todos os planos
 * - Passa todas as propriedades necessárias para cada PlanoItem
 * - Layout responsivo com distribuição uniforme dos cards
 * - Estilização consistente com o design system
 * - Fallback para dados mockados em caso de erro na API
 * - Estado de loading durante a busca
 */
function Planos() {
  const [planos, setPlanos] = useState<PlanoProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Efeito para buscar planos da API na montagem do componente
   */
  useEffect(() => {
    const fetchPlanos = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Busca planos da API (com fallback para dados mockados)
        const planosData = await getPlanos();
        setPlanos(planosData);

        console.log("Planos carregados:", planosData);
      } catch (err) {
        console.error("Erro ao carregar planos:", err);
        setError("Erro ao carregar planos. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanos();
  }, []);

  // Renderiza loading enquanto busca dados
  if (isLoading) {
    return (
      <div className="w-full px-4 flex justify-center items-center mt-[5px] mb-[5px]">
        <div className="text-white text-lg">Carregando planos...</div>
      </div>
    );
  }

  // Renderiza erro se houver problema
  if (error) {
    return (
      <div className="w-full px-4 flex justify-center items-center mt-[5px] mb-[5px]">
        <div className="text-red-400 text-center">
          <div className="text-lg mb-2">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="text-primary-green underline"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  // Renderiza os planos
  return (
    <div className="w-full px-4 flex justify-evenly items-center mt-[5px] mb-[5px]">
      {/* Mapeia cada plano para um componente PlanoItem */}
      {planos.map((item: PlanoProps) => (
        <PlanoItem
          key={item.id} // Chave única para otimização do React
          id={item.id} // ID do plano para navegação
          titulo={item.titulo} // Nome do plano
          preco={item.preco} // Preço mensal
          beneficios={item.beneficios} // Lista de benefícios
          Icone={item.Icone} // Componente do ícone
          buttonBorder={item.buttonBorder} // Cor da borda do botão
          buttonColor={item.buttonColor} // Cor de fundo do botão
          buttonTextColor={item.buttonTextColor} // Cor do texto do botão
        />
      ))}
    </div>
  );
}

export default Planos;
