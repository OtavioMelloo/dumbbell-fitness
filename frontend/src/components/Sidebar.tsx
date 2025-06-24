"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User, Dumbbell, ClipboardList, LogOut, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Array de itens de navegação da sidebar
 *
 * Cada item contém:
 * - label: Texto exibido no menu
 * - href: URL de destino
 * - icon: Ícone do Lucide React
 */
const navItems = [
  {
    label: "Rotinas",
    href: "/appdumbbell/rotinas",
    icon: ClipboardList, // Ícone de lista de tarefas
  },
  {
    label: "Exercícios",
    href: "/appdumbbell/exercicios",
    icon: Dumbbell, // Ícone de halter
  },
  {
    label: "Contrate um Personal",
    href: "/appdumbbell/contrate-personal",
    icon: Users, // Ícone de usuários
  },
  {
    label: "Perfil",
    href: "/appdumbbell/perfil",
    icon: User, // Ícone de usuário
  },
];

/**
 * Componente Sidebar (Barra Lateral)
 *
 * Barra de navegação lateral da área privada da aplicação.
 * Contém:
 * - Logo da academia
 * - Menu de navegação com ícones
 * - Indicador de página ativa
 * - Informações do usuário logado com opção de logout
 */
const Sidebar = () => {
  // Hook para obter o caminho atual da URL
  const pathname = usePathname();
  const router = useRouter();

  // Contexto de autenticação
  const { user, logout } = useAuth();

  // Estado para controlar o dropdown de logout
  const [showLogout, setShowLogout] = useState(false);

  /**
   * Função para verificar se um link está ativo
   * @param path - Caminho a ser verificado
   * @returns true se o caminho atual começa com o path fornecido
   */
  const isActive = (path: string) => pathname.startsWith(path);

  /**
   * Função para fazer logout
   */
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  /**
   * Função para alternar o dropdown de logout
   */
  const toggleLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <aside className="bg-gray1 h-screen w-[285px] p-4 flex flex-col justify-between">
      <div className="w-full flex flex-col">
        {/* Logo da academia */}
        <div className="mb-8 flex flex-col items-center">
          <Link
            href="/appdumbbell/rotinas"
            className="cursor-pointer hover:opacity-80 transition-opacity duration-200"
          >
            <h2 className="text-primary-green font-bebas text-4xl mb-[-8px] leading-none">
              DUMBELL
            </h2>
            <h3 className="text-primary-green font-roboto font-light text-xl leading-none">
              FITNESS
            </h3>
          </Link>
        </div>

        {/* Lista de itens de navegação */}
        <ul className="flex items-start flex-col gap-4 text-[20px]">
          {navItems.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center font-medium text-[20px] gap-2 transition-colors duration-150 py-2 px-2 ${
                  isActive(href)
                    ? "text-primary-green bg-grayp w-[230px] rounded-12 py-2 px-1" // Estilo para item ativo
                    : "text-white hover:text-primary-green " // Estilo para item inativo
                }`}
              >
                <Icon size={22} />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Área de informações do usuário */}
      <div className="relative">
        <div
          className="text-white flex items-center gap-2 cursor-pointer hover:text-primary-green transition-colors duration-200 p-2 rounded-lg"
          onClick={toggleLogout}
        >
          <User size={22} />
          <span className="font-medium">
            {user?.first_name ||
              (user?.username ? user.username.split("@")[0] : "Usuário")}
          </span>
        </div>

        {/* Dropdown de logout */}
        {showLogout && (
          <div className="absolute bottom-full left-0 mb-2 w-full bg-gray2 rounded-lg p-2 shadow-lg">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 text-white hover:text-primary-green transition-colors duration-200 p-2 rounded-lg hover:bg-gray1"
            >
              <LogOut size={18} />
              <span>Sair</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
