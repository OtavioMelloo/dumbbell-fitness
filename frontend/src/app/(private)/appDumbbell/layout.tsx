import type { Metadata } from "next";
import "../../globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Dumbbell Fitness",
  description: "Sua rotina de treinos na palma da mão.",
};

export default function RotinasLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="font-sans bg-grayp text-white w-full min-h-screen antialiased">
      <div className="flex w-full min-h-screen">
        <Sidebar />
        <main className="flex-1 h-full p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
