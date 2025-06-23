import type { Metadata } from "next";
import { Bebas_Neue, Roboto } from "next/font/google";
import "../../globals.css";
import Sidebar from "@/components/Sidebar";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const bebas_neue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Dumbbell Fitness",
  description: "Sua rotina de treinos na palma da mão.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${roboto.variable} ${bebas_neue.variable} font-sans bg-grayp text-white w-full min-h-screen antialiased`}
      >
        <div className="flex w-full min-h-screen">
          <Sidebar />
          <main className="flex-1 h-full p-6 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
