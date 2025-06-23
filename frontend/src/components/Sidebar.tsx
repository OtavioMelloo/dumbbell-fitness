"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Dumbbell, ClipboardList } from "lucide-react";

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
 * - Informações do usuário logado
 */
const Sidebar = () => {
  // Hook para obter o caminho atual da URL
  const pathname = usePathname();

  /**
   * Função para verificar se um link está ativo
   * @param path - Caminho a ser verificado
   * @returns true se o caminho atual começa com o path fornecido
   */
  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <aside className="bg-gray1 h-screen w-[285px] p-4 flex flex-col justify-between">
      <div className="w-full flex flex-col">
        {/* Logo da academia */}
        <h2 className="text-primary-green font-bebas text-[32px] mb-8 flex flex-col items-center">
          DUMBELL FITNESS
        </h2>

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
      <div className="text-white flex items-center gap-2">
        <User size={22} />
        <span>user</span>
      </div>
    </aside>
  );
};

export default Sidebar;
