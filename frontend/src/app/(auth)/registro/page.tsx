"use client";

import React, { useState } from "react";
import ButtonLogin from "@/components/ButtonLogin";
import InputLogin from "@/components/InputLogin";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const Register = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      const res = await axios.post(
        "https://sua-api-na-railway.app/api/register/",
        {
          email,
          password: senha,
        }
      );

      console.log("Usuário cadastrado com sucesso!", res.data);

      router.push("/login");
    } catch (err) {
      const error = err as AxiosError;
      console.error(error.response?.data);
      setError("Erro ao cadastrar. Verifique os dados.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full items-center justify-center flex flex-col"
    >
      <h1 className="h-[80px] text-white text-[61px] font-bebas">Cadastro</h1>

      <div className="my-8">
        <InputLogin
          label="E-mail"
          placeholder="Coloque seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          type="email"
          id="email"
        />

        <InputLogin
          label="Senha"
          placeholder="Crie uma senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          error={error}
          type="password"
          id="senha"
        />

        <InputLogin
          label="Confirmar Senha"
          placeholder="Repita a senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          error={error}
          type="password"
          id="confirmarSenha"
        />
      </div>

      <ButtonLogin type="submit">Cadastrar</ButtonLogin>

      <div className="w-[250px] bg-gray2 h-[2px] my-4"></div>

      <div className="h-[20px] my-2">
        <h3 className="text-white">
          Já tem conta?{" "}
          <span
            className="underline text-primary-green italic cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Fazer login
          </span>
        </h3>
      </div>
    </form>
  );
};

export default Register;
