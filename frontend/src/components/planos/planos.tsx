import PlanoItem from "./planoItem";
import { plano, PlanoProps } from "@/data/plano";

/**
 * Componente Planos
 *
 * Container que renderiza todos os planos disponíveis na academia.
 * Utiliza os dados do arquivo plano.ts para criar uma lista
 * de cards representando cada plano com suas características.
 *
 * Funcionalidades:
 * - Renderiza dinamicamente todos os planos
 * - Passa todas as propriedades necessárias para cada PlanoItem
 * - Layout responsivo com distribuição uniforme dos cards
 * - Estilização consistente com o design system
 */
function Planos() {
  return (
    <div className="w-full px-4 flex justify-evenly items-center mt-[5px] mb-[5px]">
      {/* Mapeia cada plano para um componente PlanoItem */}
      {plano.map((item: PlanoProps) => (
        <PlanoItem
          key={item.id} // Chave única para otimização do React
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
