"use client";

import RotinaHeader from "@/components/rotina/RotinaHeader";
import React, { useState, useEffect, useCallback } from "react";
import RotinaModal from "./RotinaModal";
import RoutineCard from "@/components/rotina/RoutineCards";
import LastCompletedRoutine from "@/components/rotina/LastCompletedRoutine";
import Loading from "@/components/Loading";
import {
  buscarTreinos,
  deletarTreino,
  TreinoCompleto,
  obterUltimaRotinaFinalizada,
} from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

/**
 * Página de Rotinas
 *
 * Esta página exibe as rotinas de exercícios disponíveis para o usuário.
 * Layout centralizado com container responsivo.
 *
 * Funcionalidades:
 * - Lista de rotinas personalizadas
 * - Filtros por modalidade
 * - Histórico de treinos
 * - Progresso do usuário
 * - Editar e deletar rotinas
 */
const Page = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [treinos, setTreinos] = useState<TreinoCompleto[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTreino, setEditingTreino] = useState<TreinoCompleto | null>(
    null
  );
  const [lastCompletedRoutine, setLastCompletedRoutine] = useState<{
    id: number;
    name: string;
    objetivo: string;
    completedAt: string;
    duration?: string;
    exercisesCompleted?: number;
    totalExercises?: number;
  } | null>(null);

  const carregarTreinos = useCallback(async () => {
    try {
      setLoading(true);
      const treinosData = await buscarTreinos();
      setTreinos(treinosData);

      // Carregar última rotina finalizada usando a função utilitária
      const lastCompleted = obterUltimaRotinaFinalizada(user?.id);
      if (lastCompleted) {
        setLastCompletedRoutine(lastCompleted);
      }
    } catch (error) {
      console.error("Erro ao carregar treinos:", error);
      // Em caso de erro, usar dados de exemplo
      setTreinos([
        {
          id: 1,
          aluno: 3, // ID da Sophia Silva
          objetivo: "Hipertrofia",
          disponibilidade: "3x por semana",
          observacao: "Treino focado em ganho de massa muscular",
          exercicios: [],
          data_criacao: "2024-06-24T10:00:00Z",
        },
        {
          id: 2,
          aluno: 3,
          objetivo: "Resistência",
          disponibilidade: "2x por semana",
          observacao: "Treino para melhorar resistência cardiovascular",
          exercicios: [],
          data_criacao: "2024-06-23T15:30:00Z",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Carregar treinos quando o componente montar
  useEffect(() => {
    carregarTreinos();
  }, [carregarTreinos]);

  const handleSave = async () => {
    setShowModal(false);
    setEditingTreino(null);
    // Recarregar treinos após salvar
    await carregarTreinos();
  };

  const handleEdit = (treinoId: string | number) => {
    const treino = treinos.find((t) => t.id === treinoId);
    if (treino) {
      setEditingTreino(treino);
      setShowModal(true);
    }
  };

  const handleDelete = async (treinoId: string | number) => {
    if (window.confirm("Tem certeza que deseja deletar esta rotina?")) {
      try {
        await deletarTreino(Number(treinoId));
        // Remover o treino da lista local
        setTreinos((prev) => prev.filter((t) => t.id !== treinoId));
        // alert("Rotina deletada com sucesso!");
      } catch (error) {
        console.error("Erro ao deletar treino:", error);
        // alert("Erro ao deletar rotina. Tente novamente.");
      }
    }
  };

  const handleStart = (treinoId: string | number) => {
    // Navegar para a página de treino
    router.push(`/appdumbbell/treino/${treinoId}`);
  };

  const handleAddClick = () => {
    setEditingTreino(null);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray">
        <Loading
          fullScreen={true}
          text="Carregando suas rotinas..."
          size="large"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray p-6">
      <div className="max-w-6xl mx-auto">
        <RotinaHeader onAddClick={handleAddClick} />

        {/* Layout com grid para rotinas e última rotina finalizada */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Coluna principal com rotinas */}
          <div className="lg:col-span-3">
            {/* Container centralizado para os cards de rotina */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {treinos.length > 0 ? (
                treinos.map((treino) => (
                  <RoutineCard
                    key={treino.id}
                    routine={{
                      id: treino.id,
                      name: treino.nome || `Rotina ${treino.id}`,
                      objetivo: treino.objetivo,
                      disponibilidade: treino.disponibilidade,
                      data_criacao: treino.data_criacao,
                    }}
                    onStart={handleStart}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-300 text-lg mb-4">
                    Nenhuma rotina encontrada
                  </p>
                  <p className="text-gray-400 text-sm">
                    Clique em &quot;Adicionar Rotina&quot; para criar sua
                    primeira rotina de exercícios.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Coluna lateral com última rotina finalizada */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <LastCompletedRoutine routine={lastCompletedRoutine} />
            </div>
          </div>
        </div>

        {showModal && (
          <RotinaModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setEditingTreino(null);
            }}
            onSave={handleSave}
            treinoParaEditar={editingTreino}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
