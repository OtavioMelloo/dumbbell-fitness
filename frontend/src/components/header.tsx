"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { User } from "lucide-react";

/**
 * Componente Header (Cabeçalho)
 * Versão simplificada para evitar loops de redirecionamento
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
    // Se está na área privada, navega para rotinas em vez da página inicial
    if (isPrivateArea) {
      router.push("/appdumbbell/rotinas");
    } else {
      router.push("/");
    }
  };

  // Verifica se está na área privada
  const isPrivateArea =
    pathname.startsWith("/appdumbbell") || pathname.startsWith("/rotinas");
  // Verifica se está na área de autenticação
  const isAuthArea =
    pathname.startsWith("/login") || pathname.startsWith("/registro");
  // Verifica se está na página inicial
  const isHomePage = pathname === "/";
  // Verifica se está na página sobre
  const isSobrePage = pathname === "/sobre";
  // Verifica se está na página de registro
  const isRegistroPage = pathname.startsWith("/registro");

  return (
    <header className="bg-gray1 rounded-24 mt-2 p-4 flex justify-between items-center w-full text-white bg-dumbCinza h-[100px] mb-4">
      {/* Logo da academia - clicável para voltar ao home */}
      <div
        className="logoLetra cursor-pointer hover:opacity-80 transition-opacity duration-200 flex flex-col items-start"
        onClick={navigateToHome}
      >
        <h2 className="font-bebas text-5xl mb-[-10px] leading-none">DUMBELL</h2>
        <h3 className="font-roboto font-light text-2xl leading-none">
          FITNESS
        </h3>
      </div>

      {/* Menu de navegação - apenas na página inicial e sobre */}
      {(isHomePage || isSobrePage) && (
        <nav className="flex items-center justify-center flex-1">
          <ul className="text-roboto font-bold flex items-center justify-center gap-8 text-[20px]">
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
              onClick={() => router.push("/sobre")}
            >
              SOBRE
            </li>
            <li>
              <span
                className="cursor-pointer hover:text-primary-green transition-colors duration-200"
                onClick={navigateToLogin}
              >
                ROTINAS
              </span>
            </li>
            <li>
              <span
                className="cursor-pointer hover:text-primary-green transition-colors duration-200"
                onClick={navigateToLogin}
              >
                ENTRAR
              </span>
            </li>
          </ul>
        </nav>
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
        <div className="flex items-center gap-4">
          {/* Botão de perfil */}
          <Link
            href="/appdumbbell/perfil"
            className="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-200"
            title="Meu Perfil"
          >
            <User size={20} className="text-white" />
          </Link>

          {/* Botão de voltar para home */}
          <button
            className="text-roboto font-bold text-[18px] cursor-pointer hover:text-primary-green transition-colors duration-200"
            onClick={navigateToHome}
          >
            VOLTAR
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
