import React from "react";
import { clsx } from "clsx";

/**
 * Interface para as props do componente ButtonLogin
 * Estende as propriedades padrão de button HTML
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"; // Variante de estilo do botão
}

/**
 * Componente ButtonLogin
 *
 * Um botão customizado com:
 * - Duas variantes de estilo (primary e secondary)
 * - Efeitos de hover e transições
 * - Estilização consistente com o design system
 * - Suporte a todas as propriedades padrão de button HTML
 *
 * @param children - Conteúdo do botão (texto, ícones, etc.)
 * @param variant - Variante de estilo ('primary' ou 'secondary')
 * @param props - Todas as outras propriedades de button HTML
 */
export const ButtonLogin = ({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  // Estilos base aplicados a todos os botões
  const base =
    "px-4 w-[380px] h-[40px] rounded-12 my-[2px] transition hover:scale-105";

  // Estilos específicos para cada variante
  const styles = {
    // Variante primária: fundo verde, texto preto
    primary:
      "bg-primary-green text-black hover:text-primary-dark-green hover:bg-primary-light-green font-bold",
    // Variante secundária: transparente com borda verde
    secondary:
      "bg-transparent text-primary-green border-primary-green border-[2px] gap-1 font-medium",
  };

  return (
    <button className={clsx(base, styles[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default ButtonLogin;
