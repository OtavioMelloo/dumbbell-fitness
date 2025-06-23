"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Dumbbell, ClipboardList } from "lucide-react";

const navItems = [
  {
    label: "Rotinas",
    href: "/appdumbbell/rotinas",
    icon: ClipboardList,
  },
  {
    label: "Exercícios",
    href: "/appdumbbell/exercicios",
    icon: Dumbbell,
  },
  {
    label: "Perfil",
    href: "/appdumbbell/perfil",
    icon: User,
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <aside className="bg-gray1 fixed h-screen w-[285px] p-4 flex flex-col justify-between">
      <div className="w-full flex flex-col">
        <h2 className="text-primary-green font-bebas text-[32px] mb-8 flex flex-col items-center">
          DUMBELL FITNESS
        </h2>

        <ul className="flex items-start flex-col gap-4 text-[20px]">
          {navItems.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center font-medium text-[20px] gap-2 transition-colors duration-150 py-2 px-2 ${
                  isActive(href)
                    ? "text-primary-green bg-grayp w-[230px] rounded-12 py-2 px-1"
                    : "text-white hover:text-primary-green "
                }`}
              >
                <Icon size={22} />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
