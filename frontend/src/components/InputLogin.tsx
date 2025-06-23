import React from "react";

/**
 * Interface para as props do componente InputLogin
 * Estende as propriedades padrão de input HTML
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Label opcional para o campo
  error?: string; // Mensagem de erro opcional
  id?: string; // ID do campo para associação com label
}

/**
 * Componente InputLogin
 *
 * Um campo de entrada customizado com:
 * - Label opcional
 * - Estilização consistente com o design system
 * - Tratamento de estados de erro
 * - Suporte a todas as propriedades padrão de input HTML
 *
 * @param label - Texto do label (opcional)
 * @param error - Mensagem de erro (opcional)
 * @param id - ID do campo para acessibilidade
 * @param props - Todas as outras propriedades de input HTML
 */
const InputLogin = ({ label, error, id, ...props }: InputProps) => {
  return (
    <div className="flex flex-col w-[380px]">
      {/* Label do campo (renderizado apenas se fornecido) */}
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-white"
        >
          {label}
        </label>
      )}

      {/* Campo de entrada principal */}
      <input
        id={id}
        className={`text-white px-2 py-2 rounded-12 border ${
          error ? "border-red-500" : "border-primary-green"
        } focus:outline-none focus:ring focus:ring-primary-green placeholder:text-gray3 font-thin font-roboto`}
        {...props}
      />

      {/* Mensagem de erro (renderizada apenas se houver erro) */}
      {error && <p className=" mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default InputLogin;
