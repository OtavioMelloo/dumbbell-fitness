function Header() {
  return (
    <header className="bg-gray1 rounded-24 mt-2 p-4 flex justify-between w-full text-white bg-dumbCinza h-[100px] mb-4">
      <div className="logoLetra">
        <h2 className="font-bebas text-5xl mb-[-10px]">DUMBELL</h2>
        <h3 className="font-roboto font-light text-2xl">FITNESS</h3>
      </div>

      <div className="w-[624px] h-[60px] flex items-center justify-between">
        <ul className="w-full text-roboto font-bold flex justify-between gap-4 p-4 text-[20px]">
          <li>PLANOS</li>
          <li>MODALIDADES</li>
          <li>ENTRAR</li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
