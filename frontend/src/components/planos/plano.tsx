import PlanoProps from '../';

function Plano({ titulo, preco, beneficios, Icone}: PlanoProps) {
    return (
        <div className="w-[390px] h-[600px] rounded-sm border-secundary-purple flex flex-col">
            <h1 className="text-white font-bold uppercase">{titulo}, {preco}, {beneficios}, {Icone}</h1>
            
        </div>
    )


}

export default Plano;
