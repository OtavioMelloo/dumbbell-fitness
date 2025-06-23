"use client";

import React, { useState } from "react";
import { User, Camera, Eye, EyeOff } from "lucide-react";

/**
 * Página de Perfil
 *
 * Esta página exibe e permite editar as informações do perfil do usuário.
 * Layout com Sidebar na esquerda e formulário de perfil na direita.
 *
 * Funcionalidades:
 * - Dados pessoais do usuário
 * - Upload de foto de perfil
 * - Edição de informações pessoais
 * - Alteração de email e senha
 */
const Perfil = () => {
  // Estados para os campos do formulário
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    cpf: "",
    celular: "",
    plano: "",
    genero: "",
    dataNascimento: "",
    altura: "",
    peso: "",
    email: "",
    senha: "",
  });

  // Estado para controlar a visibilidade da senha
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAlterarFoto = () => {
    // Lógica para alterar foto de perfil
    console.log("Alterar foto de perfil");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-8">
          {/* Coluna esquerda - Foto e credenciais */}
          <div className="w-1/3">
            <div className="bg-gray1 rounded-24 pl-0 pr-6 pt-6 pb-6 -ml-8 h-[600px]">
              <h1 className="text-white text-4xl font-bebas mb-8 text-center">
                Meu Perfil
              </h1>

              {/* Círculo de perfil */}
              <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mb-4">
                  <User size={64} className="text-gray" />
                </div>

                {/* Botão alterar foto */}
                <button
                  onClick={handleAlterarFoto}
                  className="flex items-center gap-2 bg-primary-green text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Camera size={16} />
                  Alterar Foto
                </button>
              </div>

              {/* Campos de email e senha */}
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green"
                    placeholder="Seu e-mail"
                  />
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="senha"
                      value={formData.senha}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green"
                      placeholder="Sua senha"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna direita - Formulário completo */}
          <div className="w-2/3">
            <div className="bg-gray1 rounded-24 p-6 h-[600px]">
              <h2 className="text-white text-2xl font-bebas mb-6 text-left">
                Informações Pessoais
              </h2>

              <div className="grid grid-cols-2 gap-6">
                {/* Nome */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green"
                    placeholder="Seu nome completo"
                  />
                </div>

                {/* CPF */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    CPF
                  </label>
                  <input
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green"
                    placeholder="000.000.000-00"
                  />
                </div>

                {/* Endereço */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Endereço
                  </label>
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green"
                    placeholder="Seu endereço completo"
                  />
                </div>

                {/* Celular */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Celular
                  </label>
                  <input
                    type="tel"
                    name="celular"
                    value={formData.celular}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                {/* Plano */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Plano
                  </label>
                  <select
                    name="plano"
                    value={formData.plano}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white focus:outline-none focus:border-primary-green"
                  >
                    <option value="">Selecione um plano</option>
                    <option value="mensal">Mensal</option>
                    <option value="trimestral">Trimestral</option>
                    <option value="semestral">Semestral</option>
                    <option value="anual">Anual</option>
                  </select>
                </div>

                {/* Gênero */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Gênero
                  </label>
                  <select
                    name="genero"
                    value={formData.genero}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white focus:outline-none focus:border-primary-green"
                  >
                    <option value="">Selecione</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                {/* Data de Nascimento */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white focus:outline-none focus:border-primary-green"
                  />
                </div>

                {/* Altura */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Altura (cm)
                  </label>
                  <input
                    type="number"
                    name="altura"
                    value={formData.altura}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green"
                    placeholder="170"
                  />
                </div>

                {/* Peso */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    name="peso"
                    value={formData.peso}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green"
                    placeholder="70"
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-gray2 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                >
                  Editar Informações
                </button>
                <button
                  type="button"
                  className="bg-primary-green text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
