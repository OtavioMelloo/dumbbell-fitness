"use client";

import React, { useState } from "react";
import ButtonLogin from "@/components/ButtonLogin";
import InputLogin from "@/components/InputLogin";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const router = useRouter(); // ✅ useRouter instanciado

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://sua-api-na-railway.app/api/token/",
        {
          email,
          password: senha,
        }
      );

      const { access, refresh } = res.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      router.push("/rotinas"); 

      console.log("Logado com sucesso!");
    } catch (err) {
      const error = err as AxiosError;
      console.error(error.response?.data);
      setError("Email ou senha inválidos");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full items-center justify-center flex flex-col"
    >
      <h1 className="h-[80px] text-white text-[61px] font-bebas">Login</h1>

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
          placeholder="Coloque sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          error={error}
          type="password"
          id="senha"
        />
      </div>

      <ButtonLogin type="submit">Entrar</ButtonLogin>

      <div className="w-[250px] bg-gray2 h-[2px] my-4"></div>

      <div className="flex flex-col gap-2 mt-2">
        <ButtonLogin variant="secondary">Entrar com o Facebook</ButtonLogin>
        <ButtonLogin variant="secondary">Entrar com o Google</ButtonLogin>
      </div>

      <div className="h-[20px] my-2">
        <h3 className="text-white">
          Não possui conta?{" "}
          <span
            className="underline text-primary-green italic cursor-pointer"
            onClick={() => router.push("/registro")} 
          >
            Criar uma conta
          </span>
        </h3>
      </div>
    </form>
  );
};

export default Login;
