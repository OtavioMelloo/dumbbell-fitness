import ModalidadeItem from "../modalidade/modalidadeItem";
import { modalidades, Modalidade } from "../../data/modalidade";

/**
 * Componente Modalidades
 *
 * Container que renderiza todas as modalidades esportivas disponíveis.
 * Utiliza os dados do arquivo modalidade.ts para criar uma lista
 * de cards representando cada modalidade.
 *
 * Funcionalidades:
 * - Renderiza dinamicamente todas as modalidades
 * - Passa as propriedades necessárias para cada ModalidadeItem
 * - Mantém layout responsivo e organizado
 */
function Modalidades() {
  return (
    <div className="w-full mt-[10px] mb-[10px]">
      {/* Mapeia cada modalidade para um componente ModalidadeItem */}
      {modalidades.map((item: Modalidade) => (
        <ModalidadeItem
          key={item.id} // Chave única para otimização do React
          titulo={item.titulo} // Nome da modalidade
          descricao={item.descricao} // Descrição detalhada
          Icone={item.Icone} // Componente do ícone
        />
      ))}
    </div>
  );
}

export default Modalidades;
