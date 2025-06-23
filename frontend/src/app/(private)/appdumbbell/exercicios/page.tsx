"use client";

import React from "react";

/**
 * Página de Exercícios
 *
 * Esta página exibe os exercícios disponíveis na academia.
 * Atualmente em desenvolvimento - placeholder básico.
 *
 * Funcionalidades planejadas:
 * - Lista de exercícios disponíveis
 * - Filtros por categoria
 * - Busca de exercícios
 * - Detalhes de cada exercício
 * - Vídeos demonstrativos
 */
const Exercicios = () => {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-white text-4xl font-bebas mb-8">Exercícios</h1>

        <div className="bg-gray1 rounded-24 p-8">
          <h2 className="text-white text-2xl font-bebas mb-6">
            Exercícios Disponíveis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder para exercícios */}
            <div className="bg-gray rounded-lg p-6">
              <h3 className="text-white text-lg font-bebas mb-2">
                Supino Reto
              </h3>
              <p className="text-gray-300 text-sm">
                Exercício para peitoral com barra ou halteres.
              </p>
            </div>

            <div className="bg-gray rounded-lg p-6">
              <h3 className="text-white text-lg font-bebas mb-2">
                Agachamento
              </h3>
              <p className="text-gray-300 text-sm">
                Exercício fundamental para pernas e glúteos.
              </p>
            </div>

            <div className="bg-gray rounded-lg p-6">
              <h3 className="text-white text-lg font-bebas mb-2">
                Levantamento Terra
              </h3>
              <p className="text-gray-300 text-sm">
                Exercício completo para força e estabilidade.
              </p>
            </div>

            <div className="bg-gray rounded-lg p-6">
              <h3 className="text-white text-lg font-bebas mb-2">
                Flexão de Braço
              </h3>
              <p className="text-gray-300 text-sm">
                Exercício para tríceps e peitoral.
              </p>
            </div>

            <div className="bg-gray rounded-lg p-6">
              <h3 className="text-white text-lg font-bebas mb-2">
                Puxada na Frente
              </h3>
              <p className="text-gray-300 text-sm">
                Exercício para costas e bíceps.
              </p>
            </div>

            <div className="bg-gray rounded-lg p-6">
              <h3 className="text-white text-lg font-bebas mb-2">
                Desenvolvimento
              </h3>
              <p className="text-gray-300 text-sm">
                Exercício para ombros e tríceps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exercicios;
