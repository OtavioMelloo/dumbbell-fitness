import type { Metadata } from "next";
import { Bebas_Neue, Roboto } from "next/font/google";
import "@/app/globals.css";
import ProtectedRoute from "@/components/ProtectedRoute";
import MatriculaCheck from "@/components/MatriculaCheck";

/**
 * Configuração das fontes Google Fonts
 */
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const bebas_neue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
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
