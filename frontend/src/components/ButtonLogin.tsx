import React from "react";
import { clsx } from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const ButtonLogin = ({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  const base = "px-4 h-[40px] rounded-12 my-[2px] transition hover:scale-105";
  const styles = {
    primary:
      "bg-primary-green  text-black hover:text-primary-dark-green hover:bg-primary-light-green font-bold",
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
