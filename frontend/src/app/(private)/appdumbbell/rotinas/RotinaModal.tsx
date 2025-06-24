"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import {
  buscarExerciciosParaTreino,
  criarTreino,
  atualizarTreino,
  CriarTreinoData,
  ExercicioTreino,
  buscarAlunoPorNome,
  TreinoCompleto,
} from "@/services/api";
import ButtonLogin from "@/components/ButtonLogin";
import Loading from "@/components/Loading";
import { useAuth } from "@/contexts/AuthContext";

interface Exercicio {
  id: number;
  nome: string;
  descricao: string;
}

interface RotinaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  treinoParaEditar?: TreinoCompleto | null;
}

export default function RotinaModal({
  isOpen,
  onClose,
  onSave,
  treinoParaEditar,
}: RotinaModalProps) {
  const { user } = useAuth();
  const [nome, setNome] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [disponibilidade, setDisponibilidade] = useState("");
  const [observacao, setObservacao] = useState("");
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Determinar se está editando ou criando
  const isEditing = !!treinoParaEditar;

  // Mapeamento para converter valores abreviados para valores completos
  const mapearObjetivo = (valor: string): string => {
    const mapeamento: { [key: string]: string } = {
      H: "Hipertrofia",
      F: "Força",
      R: "Resistência",
      E: "Emagrecimento",
      FL: "Flexibilidade",
      Hipertrofia: "Hipertrofia",
      Força: "Força",
      Resistência: "Resistência",
      Emagrecimento: "Emagrecimento",
      Flexibilidade: "Flexibilidade",
    };
    return mapeamento[valor] || valor;
  };

  const mapearDisponibilidade = (valor: string): string => {
    const mapeamento: { [key: string]: string } = {
      D: "Diário",
      A: "Alternado",
      S: "Semanal",
      Diário: "Diário",
      Alternado: "Alternado",
      Semanal: "Semanal",
    };
    return mapeamento[valor] || valor;
  };

  // Função para converter valores completos para abreviados (solução temporária para banco de produção)
  const converterDisponibilidadeParaAPI = (valor: string): string => {
    const mapeamento: { [key: string]: string } = {
      Diário: "D",
      Alternado: "A",
      Semanal: "S",
      D: "D",
      A: "A",
      S: "S",
    };
    return mapeamento[valor] || valor;
  };

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError(null);

      const carregarExercicios = async () => {
        try {
          const dados = await buscarExerciciosParaTreino();
          setExercicios(dados);
        } catch (error) {
          setError("Falha ao carregar exercícios.");
        } finally {
          setLoading(false);
        }
      };

      carregarExercicios();

      // Se estiver editando, preencher os campos com os dados do treino
      if (treinoParaEditar) {
        console.log("🔍 Editando treino:", treinoParaEditar);
        console.log("📝 Nome original do treino:", treinoParaEditar.nome);
        console.log("🆔 ID do treino:", treinoParaEditar.id);

        setNome(treinoParaEditar.nome || `Rotina ${treinoParaEditar.id}`);
        setObjetivo(mapearObjetivo(treinoParaEditar.objetivo || ""));
        setDisponibilidade(
          mapearDisponibilidade(treinoParaEditar.disponibilidade || "")
        );
        setObservacao(treinoParaEditar.observacao || "");
        // Selecionar os exercícios do treino
        const exerciciosIds = treinoParaEditar.exercicios.map(
          (e) => e.exercicio
        );
        setSelecionados(exerciciosIds);
      } else {
        // Reset quando criar novo
        setNome("");
        setObjetivo("");
        setDisponibilidade("");
        setObservacao("");
        setSelecionados([]);
      }

      // Foco automático no input nome
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // Reset quando fecha o modal
      setNome("");
      setObjetivo("");
      setDisponibilidade("");
      setObservacao("");
      setSelecionados([]);
      setError(null);
      setLoading(false);
    }
  }, [isOpen, treinoParaEditar]);

  const toggleSelecionado = (id: number) => {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    // alert(
    //   "Preencha todos os campos obrigatórios e selecione pelo menos um exercício."
    // );
    // return;

    try {
      setLoading(true);

      console.log("Usuário logado:", user);
      console.log("Nome do usuário:", user?.first_name);
      console.log("Estado de autenticação:", !!user);

      let alunoId = 1; // ID padrão para desenvolvimento

      if (user?.first_name || user?.email) {
        try {
          // Usar first_name se disponível, senão usar email
          const nomeBusca = user.first_name || user.email;
          console.log("Buscando aluno por:", nomeBusca);

          // Buscar o aluno pelo nome do usuário logado usando nossa API
          const alunos = await buscarAlunoPorNome(nomeBusca);
          console.log("Alunos encontrados:", alunos);

          if (alunos && alunos.length > 0) {
            const aluno = alunos[0];
            console.log("Aluno selecionado:", aluno);

            if (aluno && aluno.id) {
              alunoId = aluno.id;
            } else {
              console.warn(
                "Aluno encontrado mas sem ID válido, usando ID padrão"
              );
            }
          } else {
            console.warn("Nenhum aluno encontrado, usando ID padrão");
          }
        } catch (error) {
          console.warn("Erro ao buscar aluno, usando ID padrão:", error);
        }
      } else {
        console.warn("Usuário sem nome ou email, usando ID padrão");
      }

      // Preparar dados do treino
      const dadosTreino: CriarTreinoData = {
        treino: {
          nome: nome,
          aluno: alunoId,
          objetivo: objetivo,
          disponibilidade: disponibilidade,
          observacao: observacao || undefined,
        },
        exercicios: selecionados.map((exercicioId) => ({
          exercicio: exercicioId,
          series: 3, // Valores padrão - podem ser ajustados depois
          repeticoes: 12,
          carga: undefined,
          descanso: 90,
        })),
      };

      // Log de debug para verificar os valores
      console.log("🔍 Debug - Valores antes do envio:");
      console.log("📝 Nome:", nome);
      console.log("📝 Nome (tipo):", typeof nome);
      console.log("📝 Nome (length):", nome.length);
      console.log("🎯 Objetivo:", objetivo);
      console.log("📅 Disponibilidade original:", disponibilidade);
      console.log(
        "📅 Disponibilidade convertida:",
        converterDisponibilidadeParaAPI(disponibilidade)
      );
      console.log("📋 Dados completos:", dadosTreino);
      console.log("📋 Dados do treino:", dadosTreino.treino);

      if (isEditing && treinoParaEditar) {
        console.log("Atualizando treino:", dadosTreino);
        await atualizarTreino(treinoParaEditar.id, dadosTreino);
        // alert("Treino atualizado com sucesso!");
      } else {
        console.log("Criando treino:", dadosTreino);
        await criarTreino(dadosTreino);
        // alert("Treino criado com sucesso!");
      }

      onSave();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar treino:", error);

      if (error instanceof Error) {
        // alert(`Erro ao salvar treino: ${error.message}`);
      } else {
        // alert("Erro ao salvar treino, tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition show={!!isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-6">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl overflow-hidden rounded-2xl bg-gray1 p-6 text-white shadow-xl transition-all">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title className="text-2xl font-bebas">
                    {isEditing ? "Editar Treino" : "Novo Treino"}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    aria-label="Fechar modal"
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Debug info - remover em produção */}
                  <div className="bg-gray rounded-lg p-4 text-xs">
                    <h4 className="text-primary-green font-medium mb-2">
                      Debug Info:
                    </h4>
                    <p className="text-gray-300">
                      Usuário logado: {user ? "Sim" : "Não"}
                    </p>
                    <p className="text-gray-300">
                      ID: {user?.id || "Não definido"}
                    </p>
                    <p className="text-gray-300">
                      Nome: {user?.first_name || "Não definido"}
                    </p>
                    <p className="text-gray-300">
                      Email: {user?.email || "Não definido"}
                    </p>
                    <p className="text-gray-300">
                      Username: {user?.username || "Não definido"}
                    </p>
                    <p className="text-gray-300">
                      Nome para busca:{" "}
                      {user?.first_name || user?.email || "Nenhum"}
                    </p>
                  </div>

                  {/* Informações básicas do treino */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Nome do Treino *
                      </label>
                      <input
                        ref={inputRef}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="w-full px-4 py-2 bg-gray border border-gray2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green"
                        placeholder="Ex: Treino A - Peito e Tríceps"
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Objetivo *
                      </label>
                      <select
                        value={objetivo}
                        onChange={(e) => setObjetivo(e.target.value)}
                        className="w-full px-4 py-2 bg-gray border border-gray2 rounded-lg text-white focus:outline-none focus:border-primary-green"
                      >
                        <option value="">Selecione o objetivo</option>
                        <option value="Hipertrofia">Hipertrofia</option>
                        <option value="Força">Força</option>
                        <option value="Resistência">Resistência</option>
                        <option value="Emagrecimento">Emagrecimento</option>
                        <option value="Flexibilidade">Flexibilidade</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Disponibilidade *
                      </label>
                      <select
                        value={disponibilidade}
                        onChange={(e) => setDisponibilidade(e.target.value)}
                        className="w-full px-4 py-2 bg-gray border border-gray2 rounded-lg text-white focus:outline-none focus:border-primary-green"
                      >
                        <option value="">Selecione a disponibilidade</option>
                        <option value="Diário">Diário</option>
                        <option value="Alternado">Alternado</option>
                        <option value="Semanal">Semanal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Observações
                      </label>
                      <input
                        value={observacao}
                        onChange={(e) => setObservacao(e.target.value)}
                        className="w-full px-4 py-2 bg-gray border border-gray2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-green"
                        placeholder="Observações opcionais"
                      />
                    </div>
                  </div>

                  {/* Seleção de exercícios */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-3">
                      Exercícios *
                    </label>

                    {loading && (
                      <p className="text-gray-400">Carregando exercícios...</p>
                    )}
                    {error && <p className="text-red-400">{error}</p>}

                    {!loading && !error && (
                      <div className="max-h-60 overflow-y-auto space-y-2 bg-gray rounded-lg p-4">
                        {exercicios.length === 0 && (
                          <p className="text-gray-400">
                            Nenhum exercício encontrado.
                          </p>
                        )}
                        {exercicios.map((ex) => (
                          <label
                            key={ex.id}
                            className="flex items-center gap-3 cursor-pointer select-none p-2 hover:bg-gray-700 rounded transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={selecionados.includes(ex.id)}
                              onChange={() => toggleSelecionado(ex.id)}
                              className="w-4 h-4 text-primary-green bg-gray border-gray2 rounded focus:ring-primary-green focus:ring-2"
                            />
                            <div>
                              <span className="text-white font-medium">
                                {ex.nome}
                              </span>
                              <p className="text-gray-400 text-sm">
                                {ex.descricao}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-4">
                  <ButtonLogin
                    onClick={onClose}
                    variant="secondary"
                    className="w-fit"
                    disabled={loading}
                  >
                    Cancelar
                  </ButtonLogin>
                  <ButtonLogin
                    onClick={handleSubmit}
                    variant="primary"
                    className="w-fit"
                    disabled={
                      !nome.trim() ||
                      !objetivo ||
                      !disponibilidade ||
                      selecionados.length === 0 ||
                      loading
                    }
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loading size="small" text="" />
                        {isEditing ? "Salvando..." : "Criando..."}
                      </div>
                    ) : isEditing ? (
                      "Salvar Treino"
                    ) : (
                      "Criar Treino"
                    )}
                  </ButtonLogin>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
