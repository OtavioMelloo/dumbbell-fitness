import Image from 'next/image';

function Header () {
    return (
        <header className="display flex justify-between w-full text-white">
            <Image src="/path-to-logo.png" alt="Logo" width={100} height={50} />

            <div className="w-[624px] h-[60px] flex items-center justify-between">
                <ul className="w-full text-roboto font-bold flex justify-between gap-4 p-4">
                    <li>PLANOS</li>
                    <li>MODALIDADES</li>
                    <li>ENTRAR</li>
                </ul>
            </div>
        </header>
            )
}

export default Header;