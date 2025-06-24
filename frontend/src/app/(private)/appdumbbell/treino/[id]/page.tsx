"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  buscarTreinoPorId,
  buscarExercicios,
  ExercicioTreino,
  salvarUltimaRotinaFinalizada,
} from "@/services/api";
import {
  // Play,
  // Pause,
  // RotateCcw,
  Plus,
  // X,
  // Timer,
  // Check,
  Trash2,
  Trophy,
} from "lucide-react";
import ExercicioCard from "@/components/ExercicioCard";
import { useAuth } from "@/contexts/AuthContext";

interface Exercicio {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  grupo_muscular: string;
  equipamento?: string | null;
}

interface ExercicioCardData {
  id: number;
  nome: string;
  series: number;
  repeticoes: number;
  carga: number;
  descanso: number;
  isResting: boolean;
  restTimeLeft: number;
  completed: boolean;
}

interface TreinoData {
  id: number;
  nome?: string;
  objetivo: string;
  disponibilidade: string;
  observacao?: string;
  exercicios: ExercicioTreino[];
}

export default function TreinoPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [treino, setTreino] = useState<TreinoData | null>(null);
  const [exerciciosCards, setExerciciosCards] = useState<ExercicioCardData[]>(
    []
  );
  const [exerciciosDisponiveis, setExerciciosDisponiveis] = useState<
    Exercicio[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddExercise, setShowAddExercise] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null);
  const [newExerciseSeries, setNewExerciseSeries] = useState(3);
  const [newExerciseRepeticoes, setNewExerciseRepeticoes] = useState(12);
  const [newExerciseDescanso, setNewExerciseDescanso] = useState(90);
  const [treinoStartTime, setTreinoStartTime] = useState<Date | null>(null);
  const [treinoDuration, setTreinoDuration] = useState(0);
  // const [showDiscardWarning, setShowDiscardWarning] = useState(false);

  useEffect(() => {
    const carregarTreino = async () => {
      try {
        setIsLoading(true);
        const treinoData = await buscarTreinoPorId(Number(id));
        setTreino(treinoData);

        // Iniciar timer do treino
        if (!treinoStartTime) {
          setTreinoStartTime(new Date());
        }

        // Carregar exercícios disponíveis para adicionar
        const exerciciosData = await buscarExercicios();
        setExerciciosDisponiveis(exerciciosData);

        // Criar cards dos exercícios do treino
        const cards = treinoData.exercicios.map((ex: ExercicioTreino) => ({
          id: ex.exercicio,
          nome:
            exerciciosData.find((e: Exercicio) => e.id === ex.exercicio)
              ?.nome || `Exercício ${ex.exercicio}`,
          series: ex.series,
          repeticoes: ex.repeticoes,
          carga: ex.carga || 0,
          descanso: ex.descanso,
          isResting: false,
          restTimeLeft: ex.descanso,
          completed: false,
        }));

        setExerciciosCards(cards);
      } catch (error) {
        console.error("Erro ao carregar treino:", error);
        // Em caso de erro, usar dados de exemplo
        setTreino({
          id: Number(id),
          objetivo: "Hipertrofia",
          disponibilidade: "3x por semana",
          observacao: "Treino focado em ganho de massa muscular",
          exercicios: [
            {
              exercicio: 1, // ID do exercício
              series: 3,
              repeticoes: 12,
              descanso: 90,
            },
            {
              exercicio: 2, // ID do exercício
              series: 4,
              repeticoes: 10,
              descanso: 120,
            },
          ],
        });

        // Iniciar timer do treino
        if (!treinoStartTime) {
          setTreinoStartTime(new Date());
        }
      } finally {
        setIsLoading(false);
      }
    };

    carregarTreino();
  }, [id, treinoStartTime]);

  // Timer para atualizar a duração do treino
  useEffect(() => {
    if (!treinoStartTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const duration = Math.floor(
        (now.getTime() - treinoStartTime.getTime()) / 1000
      );
      setTreinoDuration(duration);
    }, 1000);

    return () => clearInterval(interval);
  }, [treinoStartTime]);

  // Timer para descanso
  useEffect(() => {
    const interval = setInterval(() => {
      setExerciciosCards((prev) =>
        prev.map((card) => {
          if (card.isResting && card.restTimeLeft > 0) {
            return {
              ...card,
              restTimeLeft: card.restTimeLeft - 1,
            };
          } else if (card.isResting && card.restTimeLeft === 0) {
            return {
              ...card,
              isResting: false,
              restTimeLeft: card.descanso,
            };
          }
          return card;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const startRest = (cardId: number) => {
    setExerciciosCards((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? { ...card, isResting: true, restTimeLeft: card.descanso }
          : card
      )
    );
  };

  const pauseRest = (cardId: number) => {
    setExerciciosCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, isResting: false } : card
      )
    );
  };

  const resetRest = (cardId: number) => {
    setExerciciosCards((prev) =>
      prev.map((card) =>
        card.id === cardId
          ? { ...card, isResting: false, restTimeLeft: card.descanso }
          : card
      )
    );
  };

  const toggleCompleted = (cardId: number) => {
    setExerciciosCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, completed: !card.completed } : card
      )
    );
  };

  const addExercise = () => {
    if (selectedExercise) {
      const exercicio = exerciciosDisponiveis.find(
        (e) => e.id === selectedExercise
      );
      if (exercicio) {
        const newCard: ExercicioCardData = {
          id: exercicio.id,
          nome: exercicio.nome,
          series: newExerciseSeries,
          repeticoes: newExerciseRepeticoes,
          carga: 0,
          descanso: newExerciseDescanso,
          isResting: false,
          restTimeLeft: newExerciseDescanso,
          completed: false,
        };
        setExerciciosCards((prev) => [...prev, newCard]);
        setSelectedExercise(null);
        setShowAddExercise(false);
      }
    }
  };

  const removeExercise = (cardId: number) => {
    setExerciciosCards((prev) => prev.filter((card) => card.id !== cardId));
  };

  const finalizarTreino = () => {
    // Calcular duração real do treino
    const duration = treinoStartTime
      ? Math.floor((new Date().getTime() - treinoStartTime.getTime()) / 1000)
      : 0;

    const formatDuration = (seconds: number) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;

      if (hours > 0) {
        return `${hours}h ${minutes}m ${secs}s`;
      } else if (minutes > 0) {
        return `${minutes}m ${secs}s`;
      } else {
        return `${secs}s`;
      }
    };

    // Salvar informações da rotina finalizada
    const completedRoutine = {
      id: Number(id),
      name: treino?.nome || `Rotina ${id}`,
      objetivo: treino?.objetivo || "Treino",
      completedAt: new Date().toISOString(),
      duration: formatDuration(duration),
      exercisesCompleted: exerciciosCards.filter((card) => card.completed)
        .length,
      totalExercises: exerciciosCards.length,
    };

    // Salvar no localStorage usando a função utilitária
    salvarUltimaRotinaFinalizada(completedRoutine, user?.id);

    // Mostrar mensagem de sucesso
    // alert("🎉 Treino finalizado com sucesso!");

    // Navegar de volta para rotinas
    router.push("/appdumbbell/rotinas");
  };

  const handleDiscardTreino = () => {
    const exerciciosCompletados = exerciciosCards.filter(
      (card) => card.completed
    ).length;
    const totalExercicios = exerciciosCards.length;

    if (exerciciosCompletados > 0) {
      // Se há progresso, mostrar aviso mais detalhado
      const mensagem = `⚠️ ATENÇÃO!\n\nVocê já completou ${exerciciosCompletados} de ${totalExercicios} exercícios.\n\nTem certeza que deseja descartar este treino?\n\nTodo o progresso será perdido.`;

      if (confirm(mensagem)) {
        router.push("/appdumbbell/rotinas");
      }
    } else {
      // Se não há progresso, descartar diretamente
      router.push("/appdumbbell/rotinas");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gray1 rounded-24 p-8">
            <div className="text-white text-center">Carregando treino...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header do Treino */}
        <div className="bg-gray1 rounded-24 p-8 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-white text-4xl font-bebas mb-2">
                Treino #{id}
              </h1>
              {treino && (
                <div className="text-gray-300">
                  <p>
                    <strong>Objetivo:</strong> {treino.objetivo}
                  </p>
                  <p>
                    <strong>Disponibilidade:</strong> {treino.disponibilidade}
                  </p>
                  {treino.observacao && (
                    <p>
                      <strong>Observação:</strong> {treino.observacao}
                    </p>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => setShowAddExercise(true)}
              className="bg-primary-green hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              Adicionar Exercício
            </button>
          </div>

          {/* Barra de Progresso */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white text-sm font-medium">
                Progresso do Treino
              </span>
              <div className="flex items-center gap-4">
                <span className="text-gray-300 text-sm">
                  {exerciciosCards.filter((card) => card.completed).length} /{" "}
                  {exerciciosCards.length} exercícios
                </span>
                {treinoStartTime && (
                  <span className="text-gray-300 text-sm">
                    ⏱️ {Math.floor(treinoDuration / 60)}:
                    {(treinoDuration % 60).toString().padStart(2, "0")}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-3">
              <div
                className="bg-primary-green h-3 rounded-full transition-all duration-500 ease-in-out"
                style={{
                  width: `${
                    exerciciosCards.length > 0
                      ? (exerciciosCards.filter((card) => card.completed)
                          .length /
                          exerciciosCards.length) *
                        100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-gray-400 text-xs">
                {exerciciosCards.filter((card) => card.completed).length ===
                  exerciciosCards.length && exerciciosCards.length > 0
                  ? "🎉 Treino completo!"
                  : "Continue treinando!"}
              </span>
              <span className="text-gray-400 text-xs">
                {Math.round(
                  exerciciosCards.length > 0
                    ? (exerciciosCards.filter((card) => card.completed).length /
                        exerciciosCards.length) *
                        100
                    : 0
                )}
                %
              </span>
            </div>
          </div>
        </div>

        {/* Cards dos Exercícios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {exerciciosCards.map((card) => (
            <ExercicioCard
              key={card.id}
              id={card.id}
              nome={card.nome}
              series={card.series}
              repeticoes={card.repeticoes}
              isResting={card.isResting}
              restTimeLeft={card.restTimeLeft}
              completed={card.completed}
              onToggleCompleted={toggleCompleted}
              onStartRest={startRest}
              onPauseRest={pauseRest}
              onResetRest={resetRest}
              onRemove={removeExercise}
            />
          ))}
        </div>

        {/* Botões de ação */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={finalizarTreino}
            disabled={
              exerciciosCards.filter((card) => card.completed).length === 0
            }
            className="bg-primary-green hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2"
          >
            <Trophy size={20} />
            Finalizar Treino
          </button>

          <button
            onClick={handleDiscardTreino}
            className={`${
              exerciciosCards.filter((card) => card.completed).length > 0
                ? "bg-red-600 hover:bg-red-700 animate-pulse"
                : "bg-gray-600 hover:bg-gray-700"
            } text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2`}
          >
            <Trash2 size={20} />
            Descartar Treino
            {exerciciosCards.filter((card) => card.completed).length > 0 && (
              <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-full ml-2">
                ⚠️
              </span>
            )}
          </button>
        </div>

        {/* Aviso de progresso */}
        {exerciciosCards.filter((card) => card.completed).length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-yellow-400 text-sm">
              ⚠️ Você tem progresso salvo. Use &quot;Finalizar Treino&quot; para
              salvar ou &quot;Descartar Treino&quot; para cancelar.
            </p>
          </div>
        )}

        {/* Modal para Adicionar Exercício */}
        {showAddExercise && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray1 rounded-24 p-8 max-w-md w-full mx-4">
              <h3 className="text-white text-2xl font-bebas mb-6">
                Adicionar Exercício
              </h3>

              <div className="mb-6">
                <label className="block text-gray-300 text-sm mb-2">
                  Selecionar Exercício
                </label>
                <select
                  value={selectedExercise || ""}
                  onChange={(e) => setSelectedExercise(Number(e.target.value))}
                  className="w-full px-4 py-2 bg-gray border border-gray2 rounded-lg text-white focus:outline-none focus:border-primary-green"
                >
                  <option value="">Escolha um exercício</option>
                  {exerciciosDisponiveis.map((exercicio) => (
                    <option key={exercicio.id} value={exercicio.id}>
                      {exercicio.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Configurações do Exercício */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    Séries
                  </label>
                  <input
                    type="number"
                    value={newExerciseSeries}
                    onChange={(e) =>
                      setNewExerciseSeries(Number(e.target.value))
                    }
                    className="w-full px-4 py-2 bg-gray border border-gray2 rounded-lg text-white focus:outline-none focus:border-primary-green"
                    min="1"
                    max="20"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    Repetições
                  </label>
                  <input
                    type="number"
                    value={newExerciseRepeticoes}
                    onChange={(e) =>
                      setNewExerciseRepeticoes(Number(e.target.value))
                    }
                    className="w-full px-4 py-2 bg-gray border border-gray2 rounded-lg text-white focus:outline-none focus:border-primary-green"
                    min="1"
                    max="999"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    Descanso (s)
                  </label>
                  <input
                    type="number"
                    value={newExerciseDescanso}
                    onChange={(e) =>
                      setNewExerciseDescanso(Number(e.target.value))
                    }
                    className="w-full px-4 py-2 bg-gray border border-gray2 rounded-lg text-white focus:outline-none focus:border-primary-green"
                    min="0"
                    max="600"
                    step="5"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowAddExercise(false);
                    setSelectedExercise(null);
                    setNewExerciseSeries(3);
                    setNewExerciseRepeticoes(12);
                    setNewExerciseDescanso(90);
                  }}
                  className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={addExercise}
                  disabled={!selectedExercise}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    selectedExercise
                      ? "bg-primary-green text-white hover:bg-green-600"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
