"use client";

import React, { useState, useEffect } from "react";
import { buscarExercicios } from "@/services/api";

/**
 * Interface para o tipo de exercício
 */
interface Exercicio {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  grupo_muscular: string;
  equipamento?: string | null;
}

/**
 * Página de Exercícios
 *
 * Esta página exibe os exercícios disponíveis na academia.
 * Busca dados da API e exibe dinamicamente.
 *
 * Funcionalidades:
 * - Lista de exercícios da API
 * - Filtros por categoria
 * - Busca de exercícios
 * - Detalhes de cada exercício
 * - Estados de loading e erro
 */
const Exercicios = () => {
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState<string>("");
  const [busca, setBusca] = useState<string>("");

  // Buscar exercícios quando o componente montar
  useEffect(() => {
    const carregarExercicios = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const dados = await buscarExercicios();
        setExercicios(dados);
      } catch (err) {
        console.error("Erro ao carregar exercícios:", err);
        setError("Erro ao carregar exercícios. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    carregarExercicios();
  }, []);

  // Filtrar exercícios baseado na categoria e busca
  const exerciciosFiltrados = exercicios.filter((exercicio) => {
    const matchCategoria =
      !filtroCategoria || exercicio.categoria === filtroCategoria;
    const matchBusca =
      !busca ||
      exercicio.nome.toLowerCase().includes(busca.toLowerCase()) ||
      exercicio.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      exercicio.grupo_muscular.toLowerCase().includes(busca.toLowerCase()) ||
      (exercicio.equipamento &&
        exercicio.equipamento.toLowerCase().includes(busca.toLowerCase()));

    return matchCategoria && matchBusca;
  });

  // Obter categorias únicas para o filtro
  const categorias = [...new Set(exercicios.map((ex) => ex.categoria))];

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-white text-4xl font-bebas mb-8">Exercícios</h1>
          <div className="bg-gray1 rounded-24 p-8">
            <div className="text-white text-center">
              Carregando exercícios...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-white text-4xl font-bebas mb-8">Exercícios</h1>
          <div className="bg-gray1 rounded-24 p-8">
            <div className="text-red-400 text-center">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-4xl font-bebas mb-8">Exercícios</h1>

        <div className="bg-gray1 rounded-24 p-8">
          <h2 className="text-white text-2xl font-bebas mb-6">
            Exercícios Disponíveis
          </h2>

          {/* Filtros e Busca */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            {/* Busca */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar por nome, descrição, grupo muscular ou equipamento..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full px-4 py-2 bg-gray border border-gray2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green"
              />
            </div>

            {/* Filtro por categoria */}
            <div className="md:w-48">
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="w-full px-4 py-2 bg-gray border border-gray2 rounded-lg text-white focus:outline-none focus:border-primary-green"
              >
                <option value="">Todas as categorias</option>
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Contador de resultados */}
          <div className="mb-4">
            <p className="text-gray-300 text-sm">
              {exerciciosFiltrados.length} exercício
              {exerciciosFiltrados.length !== 1 ? "s" : ""} encontrado
              {exerciciosFiltrados.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Grid de exercícios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exerciciosFiltrados.map((exercicio) => (
              <div
                key={exercicio.id}
                className="bg-gray rounded-lg p-6 hover:bg-gray-700 transition-colors"
              >
                <h3 className="text-white text-lg font-bebas mb-2">
                  {exercicio.nome}
                </h3>
                <p className="text-gray-300 text-sm mb-3">
                  {exercicio.descricao}
                </p>

                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>Categoria:</span>
                    <span className="text-primary-green">
                      {exercicio.categoria}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Grupo Muscular:</span>
                    <span>{exercicio.grupo_muscular}</span>
                  </div>
                  {exercicio.equipamento && (
                    <div className="flex justify-between">
                      <span>Equipamento:</span>
                      <span>{exercicio.equipamento}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mensagem quando não há resultados */}
          {exerciciosFiltrados.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">
                Nenhum exercício encontrado com os filtros aplicados.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercicios;
