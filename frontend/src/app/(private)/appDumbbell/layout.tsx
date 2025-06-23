import type { Metadata } from "next";
import "../../globals.css";
import Sidebar from "@/components/Sidebar";

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
 * - Sidebar de navegação lateral (ocupando toda a altura)
 * - Área principal para conteúdo das páginas
 * - Estilos específicos para área privada
 *
 * @param children - Componentes filhos que serão renderizados na área principal
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full min-h-screen bg-gray">
      {/* Barra lateral de navegação */}
      <Sidebar />

      {/* Área principal de conteúdo */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
