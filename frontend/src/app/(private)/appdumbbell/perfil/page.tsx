"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Camera,
  Eye,
  EyeOff,
  CreditCard,
  Calendar,
  Star,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  atualizarPerfil,
  fetchCurrentUser,
  buscarMatriculaPorAluno,
} from "@/services/api";
import { useRouter } from "next/navigation";

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
  const { user } = useAuth();
  const router = useRouter();

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

  // Estado para controlar se está em modo de edição
  const [isEditing, setIsEditing] = useState(false);

  // Estado para controlar loading
  const [isLoading, setIsLoading] = useState(false);

  // Estados para informações da matrícula
  const [matriculaInfo, setMatriculaInfo] = useState<any>(null);
  const [planoInfo, setPlanoInfo] = useState<any>(null);
  const [loadingMatricula, setLoadingMatricula] = useState(true);

  // Carregar dados do usuário quando o componente montar
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        nome: user.first_name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // Carregar informações da matrícula
  useEffect(() => {
    const carregarMatricula = async () => {
      if (user) {
        try {
          setLoadingMatricula(true);
          const matricula = await buscarMatriculaPorAluno();

          if (matricula) {
            setMatriculaInfo(matricula);
            setPlanoInfo(matricula.plano);

            // Atualizar o campo plano no formulário
            setFormData((prev) => ({
              ...prev,
              plano: matricula.plano?.nome || "",
            }));
          }
        } catch (error) {
          console.error("Erro ao carregar matrícula:", error);
        } finally {
          setLoadingMatricula(false);
        }
      }
    };

    carregarMatricula();
  }, [user]);

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

  const handleEditar = () => {
    setIsEditing(true);
  };

  const handleSalvar = async () => {
    setIsLoading(true);
    try {
      // Buscar dados do usuário atual
      const currentUser = await fetchCurrentUser();
      console.log("Usuário atual:", currentUser);

      // Preparar dados para enviar à API
      const dadosParaEnviar = {
        nome: formData.nome,
        email: formData.email,
        sexo:
          formData.genero === "masculino"
            ? "M"
            : formData.genero === "feminino"
            ? "F"
            : undefined,
        data_nascimento: formData.dataNascimento,
        peso: formData.peso ? formData.peso.toString() : undefined,
        altura: formData.altura ? formData.altura.toString() : undefined,
        // endereco será mantido como está se existir
      };

      console.log("Tentando atualizar perfil com dados:", dadosParaEnviar);

      await atualizarPerfil(dadosParaEnviar);

      // Recarregar dados do usuário da API
      const userData = await fetchCurrentUser();

      // Atualizar o formulário com os dados mais recentes
      setFormData((prev) => ({
        ...prev,
        nome: userData.first_name || "",
        email: userData.email || "",
      }));

      // Sair do modo de edição
      setIsEditing(false);

      // Mostrar mensagem de sucesso (você pode implementar um toast aqui)
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      alert("Erro ao salvar perfil. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelar = () => {
    setIsEditing(false);
    // Recarregar dados originais do usuário
    if (user) {
      setFormData((prev) => ({
        ...prev,
        nome: user.first_name || "",
        email: user.email || "",
      }));
    }
  };

  const handleVerPlanos = () => {
    router.push("/");
  };

  return (
    <div className="flex-1 p-6 bg-gray min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-8">
          {/* Coluna esquerda - Foto e credenciais */}
          <div className="w-1/3">
            <div className="bg-gray1 rounded-24 p-6 h-[600px]">
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
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green disabled:opacity-50 disabled:cursor-not-allowed"
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
                      disabled={!isEditing}
                      className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Sua senha"
                    />
                    {isEditing && (
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Seção do Plano */}
              <div className="mt-6 pt-6 border-t border-gray2">
                <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                  <CreditCard size={20} />
                  Meu Plano
                </h3>

                {loadingMatricula ? (
                  <div className="text-gray-400 text-sm">
                    Carregando informações do plano...
                  </div>
                ) : planoInfo ? (
                  <div className="text-primary-green font-semibold text-lg">
                    {planoInfo.nome}
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-gray-400 text-sm mb-2">
                      Nenhum plano ativo
                    </div>
                    <button
                      onClick={handleVerPlanos}
                      className="text-primary-green text-xs hover:underline"
                    >
                      Ver planos disponíveis
                    </button>
                  </div>
                )}
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
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green disabled:opacity-50 disabled:cursor-not-allowed"
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
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green disabled:opacity-50 disabled:cursor-not-allowed"
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
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green disabled:opacity-50 disabled:cursor-not-allowed"
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
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                {/* Plano */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Plano
                  </label>
                  <input
                    type="text"
                    name="plano"
                    value={planoInfo ? planoInfo.nome : "Nenhum plano ativo"}
                    disabled={true}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white focus:outline-none focus:border-primary-green disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Seu plano atual"
                  />
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
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white focus:outline-none focus:border-primary-green disabled:opacity-50 disabled:cursor-not-allowed"
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
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white focus:outline-none focus:border-primary-green disabled:opacity-50 disabled:cursor-not-allowed"
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
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green disabled:opacity-50 disabled:cursor-not-allowed"
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
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="70"
                  />
                </div>
              </div>

              {/* Botões */}
              <div className="mt-8 flex justify-end gap-4">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={handleEditar}
                    className="bg-gray2 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
                  >
                    Editar Informações
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleCancelar}
                      disabled={isLoading}
                      className="bg-gray2 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={handleSalvar}
                      disabled={isLoading}
                      className="bg-primary-green text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Salvando..." : "Salvar Alterações"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
