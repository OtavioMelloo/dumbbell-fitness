import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id?: string;
}

const InputLogin = ({ label, error, id, ...props }: InputProps) => {
  return (
    <div className="flex flex-col w-[380px]">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-medium text-white"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`text-white px-2 py-2 rounded-12 border ${
          error ? "border-red-500" : "border-primary-green"
        } focus:outline-none focus:ring focus:ring-primary-green placeholder:text-gray3 font-thin font-roboto`}
        {...props}
      />
      {error && <p className=" mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );  
};

export default InputLogin;
