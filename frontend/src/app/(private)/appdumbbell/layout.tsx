import type { Metadata } from "next";
import { Bebas_Neue, Roboto } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

/**
 * Configuração das fontes Google Fonts
 *
 * Roboto: Fonte principal para textos do corpo
 * Bebas Neue: Fonte para títulos e elementos destacados
 */
const roboto = Roboto({
  variable: "--font-roboto", // Variável CSS para usar a fonte Roboto
  subsets: ["latin"], // Subconjunto de caracteres latinos
});

const bebas_neue = Bebas_Neue({
  variable: "--font-bebas", // Variável CSS para usar a fonte Bebas Neue
  subsets: ["latin"], // Subconjunto de caracteres latinos
  weight: "400", // Peso da fonte (normal)
});

/**
 * Metadados da aplicação
 * Define informações básicas como título da página
 */
export const metadata: Metadata = {
  title: "dumbbell fitness", // Título que aparece na aba do navegador
};

/**
 * Layout para páginas privadas da aplicação
 *
 * Este layout envolve todas as páginas que requerem autenticação.
 * Configura:
 * - Proteção de rota com autenticação obrigatória
 * - Sidebar para navegação
 * - Layout responsivo
 * - TEMPORÁRIO: MatriculaCheck removido para evitar loops
 *
 * @param children - Componentes filhos que serão renderizados dentro do layout
 */
export default function AppDumbbellLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <div className="flex w-full h-full">
        <Sidebar />
        {children}
      </div>
    </ProtectedRoute>
  );
}
