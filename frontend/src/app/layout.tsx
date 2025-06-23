import type { Metadata } from "next";
import { Bebas_Neue, Roboto } from "next/font/google";
import "./globals.css";

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
 * Layout Raiz da Aplicação
 *
 * Este é o layout principal que envolve todas as páginas da aplicação.
 * Configura:
 * - Idioma da página (português brasileiro)
 * - Fontes personalizadas (Roboto e Bebas Neue)
 * - Estilos globais
 * - Estrutura básica do HTML
 *
 * @param children - Componentes filhos que serão renderizados dentro do layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${bebas_neue.variable} ${roboto.variable} antialiased flex w-full h-screen bg-grayp justify-center`}
      >
        {/* Renderiza os componentes filhos (páginas) */}
        {children}
      </body>
    </html>
  );
}
