"use client";

import React, { useEffect, useState } from "react";
import ExercicioCard from "@/components/ExercicioCard";
// import axios from "@/lib/axios"; // se tiver axios

interface Exercicio {
  id: number;
  nome: string;
  descricao: string;
}

const ExerciciosPage = () => {
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);

  useEffect(() => {
    // ✅ MOCK - pode substituir por requisição real depois
    setExercicios([
      {
        id: 1,
        nome: "Supino Reto",
        descricao: "Execução do exercício deitado em um banco reto, com barra.",
      },
      {
        id: 2,
        nome: "Agachamento Livre",
        descricao:
          "Exercício com barra apoiada nas costas para trabalhar pernas e glúteos.",
      },
      {
        id: 3,
        nome: "Levantamento Terra",
        descricao:
          "Exercício para costas e pernas, levantando barra do chão com técnica correta.",
      },
      {
        id: 4,
        nome: "Desenvolvimento Militar",
        descricao: "Elevação da barra ou halteres acima da cabeça para ombros.",
      },
      {
        id: 5,
        nome: "Puxada na Barra Fixa",
        descricao:
          "Exercício para costas puxando o corpo para cima em barra fixa.",
      },
      {
        id: 6,
        nome: "Rosca Direta",
        descricao: "Flexão dos cotovelos para trabalhar os bíceps com barra.",
      },
      {
        id: 7,
        nome: "Tríceps Testa",
        descricao: "Extensão dos braços deitado para trabalhar tríceps.",
      },
      {
        id: 8,
        nome: "Elevação Lateral",
        descricao:
          "Elevação dos braços para trabalhar os ombros, com halteres.",
      },
      {
        id: 9,
        nome: "Abdominal Crunch",
        descricao: "Flexão do tronco para trabalhar a musculatura abdominal.",
      },
      {
        id: 10,
        nome: "Stiff",
        descricao:
          "Levantamento com pernas quase retas para trabalhar posteriores de coxa.",
      },
      {
        id: 11,
        nome: "Remada Curvada",
        descricao: "Exercício para costas puxando barra com tronco inclinado.",
      },
      {
        id: 12,
        nome: "Leg Press",
        descricao:
          "Empurrar a plataforma com as pernas para trabalhar quadríceps.",
      },
      {
        id: 13,
        nome: "Panturrilha em Pé",
        descricao: "Elevação dos calcanhares para trabalhar as panturrilhas.",
      },
      {
        id: 14,
        nome: "Flexão de Braço",
        descricao: "Exercício de peso corporal para peitoral e tríceps.",
      },
      {
        id: 15,
        nome: "Prancha",
        descricao: "Exercício isométrico para fortalecer core e estabilidade.",
      },
    ]);
    // axios.get("/api/exercicios/").then((res) => setExercicios(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Exercícios</h1>
      {exercicios.map((ex) => (
        <ExercicioCard key={ex.id} exercicio={ex} />
      ))}
    </div>
  );
};

export default ExerciciosPage;
