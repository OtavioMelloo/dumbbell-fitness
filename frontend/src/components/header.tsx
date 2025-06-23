/**
 * Componente Header (Cabeçalho)
 *
 * Cabeçalho principal da aplicação contendo:
 * - Logo da academia (DUMBBELL FITNESS)
 * - Menu de navegação com links principais
 * - Estilização consistente com o design system
 */
function Header() {
  return (
    <header className="bg-gray1 rounded-24 mt-2 p-4 flex justify-between w-full text-white bg-dumbCinza h-[100px] mb-4">
      {/* Logo da academia */}
      <div className="logoLetra">
        <h2 className="font-bebas text-5xl mb-[-10px]">DUMBELL</h2>
        <h3 className="font-roboto font-light text-2xl">FITNESS</h3>
      </div>

      {/* Menu de navegação */}
      <div className="w-[624px] h-[60px] flex items-center justify-between">
        <ul className="w-full text-roboto font-bold flex justify-between gap-4 p-4 text-[20px]">
          <li>PLANOS</li> {/* Link para seção de planos */}
          <li>MODALIDADES</li> {/* Link para seção de modalidades */}
          <li>ENTRAR</li> {/* Link para página de login */}
        </ul>
      </div>
    </header>
  );
}

export default Header;
