import type { Metadata } from "next";
import { Bebas_Neue, Roboto } from "next/font/google";
import "./globals.css";

// Váriaveis de fonts
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"]
})  

const bebas_neue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400"
})  

export const metadata: Metadata = {
  title: "dumbbell fitness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${bebas_neue.variable} ${roboto.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
