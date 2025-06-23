import type { Metadata } from "next";
import "../../globals.css";
import Sidebar from "@/components/Sidebar";
import { Roboto, Bebas_Neue } from "next/font/google";

/**
 * Configuração das fontes Google Fonts para a área privada
 *
 * Roboto: Fonte principal com pesos 400 e 700
 * Bebas Neue: Fonte para títulos e elementos destacados
 */
const roboto = Roboto({
  variable: "--font-roboto", // Variável CSS para usar a fonte Roboto
  subsets: ["latin"], // Subconjunto de caracteres latinos
  weight: ["400", "700"], // Pesos da fonte (normal e bold)
});

const bebas_neue = Bebas_Neue({
  variable: "--font-bebas", // Variável CSS para usar a fonte Bebas Neue
  subsets: ["latin"], // Subconjunto de caracteres latinos
  weight: "400", // Peso da fonte (normal)
});

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
 * - Fontes personalizadas (Roboto e Bebas Neue)
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
    <html lang="pt-br">
      <body
        className={`${roboto.variable} ${bebas_neue.variable} font-sans bg-grayp text-white w-full min-h-screen antialiased`}
      >
        {/* Container principal com sidebar e área de conteúdo */}
        <div className="flex w-full min-h-screen">
          {/* Barra lateral de navegação */}
          <Sidebar />

          {/* Área principal de conteúdo */}
          <main className="flex-1 h-full p-6 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
