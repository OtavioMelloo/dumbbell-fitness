import type { Metadata } from "next";
import "../../globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/header";

/**
 * Metadados da aplicação para a área privada
 * Define informações básicas como título e descrição
 */
export const metadata: Metadata = {
  title: "Dumbbell Fitness",
  description: "Sua rotina de treinos na palma da mão.",
};

/**
 * Layout da Área Privada da Aplicação
 *
 * Este é o layout específico para a área autenticada da aplicação.
 * Configura:
 * - Header de navegação
 * - Sidebar de navegação lateral
 * - Área principal para conteúdo das páginas
 * - Estilos específicos para área privada
 *
 * @param children - Componentes filhos que serão renderizados na área principal
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Header de navegação */}
      <div className="w-full flex justify-center">
        <div className="w-[1250px]">
          <Header />
        </div>
      </div>

      {/* Container com sidebar e área de conteúdo */}
      <div className="flex w-full flex-1">
        {/* Barra lateral de navegação */}
        <Sidebar />

        {/* Área principal de conteúdo */}
        <main className="flex-1 h-full p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
