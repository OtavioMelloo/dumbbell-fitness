import type { Metadata } from "next";
import { Bebas_Neue, Roboto } from "next/font/google";
import "@/app/globals.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import MatriculaCheck from "@/components/MatriculaCheck";

/**
 * Configuração das fontes Google Fonts
 *
 * Roboto: Fonte principal para textos do corpo
 * Bebas Neue: Fonte para títulos e elementos destacados
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const roboto = Roboto({
  variable: "--font-roboto", // Variável CSS para usar a fonte Roboto
  subsets: ["latin"], // Subconjunto de caracteres latinos
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const bebas_neue = Bebas_Neue({
  variable: "--font-bebas", // Variável CSS para usar a fonte Bebas Neue
  subsets: ["latin"], // Subconjunto de caracteres latinos
  weight: "400", // Peso da fonte (normal)
});

/**
 * Metadados da aplicação
 */
export const metadata: Metadata = {
  title: "dumbbell fitness - Treino",
};

/**
 * Layout para páginas de treino
 *
 * Este layout garante que as páginas de treino tenham:
 * - Proteção de rota com autenticação obrigatória
 * - Verificação de matrícula ativa
 * - Layout responsivo (sem sidebar duplicada)
 */
export default function TreinoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedRoute>
      <MatriculaCheck>{children}</MatriculaCheck>
    </ProtectedRoute>
  );
}
