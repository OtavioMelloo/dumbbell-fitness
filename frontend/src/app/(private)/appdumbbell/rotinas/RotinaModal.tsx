'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState, useRef } from 'react';
import { X } from 'lucide-react';
import api from '@/lib/axios';
import ButtonLogin from '@/components/ButtonLogin';

interface Exercicio {
  id: number;
  nome: string;
  descricao: string;
}

interface RotinaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function RotinaModal({ isOpen, onClose, onSave }: RotinaModalProps) {
  const [nome, setNome] = useState('');
  const [exercicios, setExercicios] = useState<Exercicio[]>([]);
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      setError(null);
      api.get('/exercicios/')
        .then(res => setExercicios(res.data))
        .catch(() => setError('Falha ao carregar exercícios.'))
        .finally(() => setLoading(false));

      // Foco automático no input nome
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // Reset quando fecha o modal
      setNome('');
      setSelecionados([]);
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  const toggleSelecionado = (id: number) => {
    setSelecionados(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!nome.trim() || selecionados.length === 0) return;
    try {
      await api.post('/rotinas/', { nome, exercicios: selecionados });
      onSave();
      onClose();
    } catch {
      alert('Erro ao salvar rotina, tente novamente.');
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
              <Dialog.Panel className="w-full max-w-lg overflow-hidden rounded-2xl bg-neutral-900 p-6 text-white shadow-xl transition-all">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-xl font-semibold">
                    Nova Rotina
                  </Dialog.Title>
                  <button onClick={onClose} aria-label="Fechar modal">
                    <X />
                  </button>
                </div>

                <div className="space-y-4">
                  <input
                    ref={inputRef}
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-600 rounded"
                    placeholder="Nome da rotina"
                  />

                  {loading && <p>Carregando exercícios...</p>}
                  {error && <p className="text-red-500">{error}</p>}

                  {!loading && !error && (
                    <div className="max-h-60 overflow-y-auto space-y-2">
                      {exercicios.length === 0 && (
                        <p className="text-gray-400">Nenhum exercício encontrado.</p>
                      )}
                      {exercicios.map(ex => (
                        <label
                          key={ex.id}
                          className="flex items-center gap-2 cursor-pointer select-none"
                        >
                          <input
                            type="checkbox"
                            checked={selecionados.includes(ex.id)}
                            onChange={() => toggleSelecionado(ex.id)}
                          />
                          <span>{ex.nome}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end gap-4">
                  <ButtonLogin onClick={onClose} variant="secondary" className="w-fit">
                    Cancelar
                  </ButtonLogin>
                  <ButtonLogin
                    onClick={handleSubmit}
                    variant="primary"
                    className="w-fit"
                    disabled={!nome.trim() || selecionados.length === 0}
                  >
                    Salvar
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