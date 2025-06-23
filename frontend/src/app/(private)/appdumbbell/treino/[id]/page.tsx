"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "@/lib/axios";

interface Exercicio {
  id: number;
  nome: string;
}

export default function TreinoPage() {
  const { id } = useParams();
  const router = useRouter();

  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [checked, setChecked] = useState<number[]>([]);

  useEffect(() => {
    axios.get(`/api/rotinas/${id}/`).then((res) => {
      setExercicios(res.data.exercicios);
    });
  }, [id]);

  const toggleCheck = (exId: number) => {
    setChecked((prev) =>
      prev.includes(exId) ? prev.filter((x) => x !== exId) : [...prev, exId]
    );
  };

  const finalizarTreino = () => {
    router.push("/appdumbbell/rotinas");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Checklist do Treino</h1>

      {exercicios.map((ex) => (
        <label key={ex.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checked.includes(ex.id)}
            onChange={() => toggleCheck(ex.id)}
          />
          <span
            className={
              checked.includes(ex.id) ? "line-through text-gray-400" : ""
            }
          >
            {ex.nome}
          </span>
        </label>
      ))}

      <button
        onClick={finalizarTreino}
        className="mt-6 bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
      >
        Finalizar Rotina
      </button>
    </div>
  );
}
