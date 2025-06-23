"use client";

import { useRouter, usePathname } from "next/navigation";

/**
 * Componente Header (Cabeçalho)
 *
 * Cabeçalho principal da aplicação contendo:
 * - Logo da academia (DUMBBELL FITNESS)
 * - Menu de navegação com links principais (apenas na página inicial)
 * - Botão de voltar para home (nas áreas privadas e de auth)
 * - Estilização consistente com o design system
 * - Navegação inteligente baseada na página atual
 */
function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // Função para scroll suave até uma seção (apenas na página inicial)
  const scrollToSection = (sectionId: string) => {
    // Se não estiver na página inicial, navega para lá primeiro
    if (pathname !== "/") {
      router.push("/");
      // Aguarda a navegação e depois faz o scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } else {
      // Se já estiver na página inicial, faz o scroll diretamente
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  // Função para navegar para login
  const navigateToLogin = () => {
    router.push("/login");
  };

  // Função para navegar para registro
  const navigateToRegistro = () => {
    router.push("/registro");
  };

  // Função para navegar para home
  const navigateToHome = () => {
    router.push("/");
  };

  // Verifica se está na área privada
  const isPrivateArea =
    pathname.startsWith("/appdumbbell") || pathname.startsWith("/rotinas");
  // Verifica se está na área de autenticação
  const isAuthArea =
    pathname.startsWith("/login") || pathname.startsWith("/registro");
  // Verifica se está na página inicial
  const isHomePage = pathname === "/";
  // Verifica se está na página de login
  const isLoginPage = pathname.startsWith("/login");
  // Verifica se está na página de registro
  const isRegistroPage = pathname.startsWith("/registro");

  return (
    <header className="bg-gray1 rounded-24 mt-2 p-4 flex justify-between w-full text-white bg-dumbCinza h-[100px] mb-4">
      {/* Logo da academia - clicável para voltar ao home */}
      <div
        className="logoLetra cursor-pointer hover:opacity-80 transition-opacity duration-200"
        onClick={navigateToHome}
      >
        <h2 className="font-bebas text-5xl mb-[-10px]">DUMBELL</h2>
        <h3 className="font-roboto font-light text-2xl">FITNESS</h3>
      </div>

      {/* Menu de navegação - apenas na página inicial */}
      {isHomePage && (
        <div className="w-[624px] h-[60px] flex items-center justify-between">
          <ul className="w-full text-roboto font-bold flex justify-between gap-4 p-4 text-[20px]">
            <li
              className="cursor-pointer hover:text-primary-green transition-colors duration-200"
              onClick={() => scrollToSection("planos")}
            >
              PLANOS
            </li>
            <li
              className="cursor-pointer hover:text-primary-green transition-colors duration-200"
              onClick={() => scrollToSection("modalidades")}
            >
              MODALIDADES
            </li>
            <li
              className="cursor-pointer hover:text-primary-green transition-colors duration-200"
              onClick={() => scrollToSection("sobre")}
            >
              SOBRE
            </li>
            <li
              className="cursor-pointer hover:text-primary-green transition-colors duration-200"
              onClick={navigateToLogin}
            >
              ENTRAR
            </li>
          </ul>
        </div>
      )}

      {/* Botões específicos para áreas de autenticação */}
      {isAuthArea && (
        <div className="flex items-center gap-6">
          {/* Botão de voltar para home */}
          <button
            className="text-roboto font-bold text-[18px] cursor-pointer hover:text-primary-green transition-colors duration-200"
            onClick={navigateToHome}
          >
            VOLTAR
          </button>

          {/* Botão específico para página de registro */}
          {isRegistroPage && (
            <button
              className="text-roboto font-bold text-[18px] cursor-pointer hover:text-primary-green transition-colors duration-200"
              onClick={navigateToLogin}
            >
              JÁ TENHO CONTA
            </button>
          )}
        </div>
      )}

      {/* Botões para área privada */}
      {isPrivateArea && (
        <div className="flex items-center gap-6">
          {/* Botão de voltar para home */}
          <button
            className="text-roboto font-bold text-[18px] cursor-pointer hover:text-primary-green transition-colors duration-200"
            onClick={navigateToHome}
          >
            VOLTAR
          </button>

          {/* Botão de sair */}
          <button
            className="text-roboto font-bold text-[18px] cursor-pointer hover:text-primary-green transition-colors duration-200"
            onClick={() => {
              // Aqui você pode adicionar lógica de logout se necessário
              router.push("/");
            }}
          >
            SAIR
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
