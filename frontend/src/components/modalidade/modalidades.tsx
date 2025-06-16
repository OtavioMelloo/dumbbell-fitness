import ModalidadeItem from "../modalidade/modalidadeItem";
import { modalidades, Modalidade } from "../../data/modalidade"; 

function Modalidades() {
    return (
        <div className="w-full mt-[10px] mb-[10px]">
            {modalidades.map((item: Modalidade) => (
                <ModalidadeItem
                    key={item.id}
                    titulo={item.titulo}
                    descricao={item.descricao}
                    Icone={item.Icone}
                />
            ))}
        </div>
    );
}

export default Modalidades;