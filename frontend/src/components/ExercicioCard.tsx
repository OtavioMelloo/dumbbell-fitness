"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, X, Timer } from "lucide-react";

interface ExercicioCardProps {
  id: number;
  nome: string;
  series: number;
  repeticoes: number;
  isResting: boolean;
  restTimeLeft: number;
  completed: boolean;
  onToggleCompleted: (id: number) => void;
  onStartRest: (id: number) => void;
  onPauseRest: (id: number) => void;
  onResetRest: (id: number) => void;
  onRemove: (id: number) => void;
}

interface SerieData {
  numero: number;
  carga: number;
  repeticoes: number;
  completada: boolean;
}

const ExercicioCard: React.FC<ExercicioCardProps> = ({
  id,
  nome,
  series,
  repeticoes,
  isResting,
  restTimeLeft,
  completed,
  onToggleCompleted,
  onStartRest,
  onPauseRest,
  onResetRest,
  onRemove,
}) => {
  const [seriesData, setSeriesData] = useState<SerieData[]>([]);

  // Inicializar dados das séries
  useEffect(() => {
    const initialSeries = Array.from({ length: series }, (_, index) => ({
      numero: index + 1,
      carga: 0,
      repeticoes: repeticoes,
      completada: false,
    }));
    setSeriesData(initialSeries);
  }, [series, repeticoes]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const updateSerieCarga = (serieNumero: number, novaCarga: number) => {
    setSeriesData((prev) =>
      prev.map((serie) =>
        serie.numero === serieNumero ? { ...serie, carga: novaCarga } : serie
      )
    );
  };

  const updateSerieRepeticoes = (
    serieNumero: number,
    novasRepeticoes: number
  ) => {
    setSeriesData((prev) =>
      prev.map((serie) =>
        serie.numero === serieNumero
          ? { ...serie, repeticoes: novasRepeticoes }
          : serie
      )
    );
  };

  const toggleSerieCompletada = (serieNumero: number) => {
    setSeriesData((prev) =>
      prev.map((serie) =>
        serie.numero === serieNumero
          ? { ...serie, completada: !serie.completada }
          : serie
      )
    );
  };

  const todasSeriesCompletadas = seriesData.every((serie) => serie.completada);

  return (
    <div
      className={`bg-gray1 rounded-24 p-6 border-2 transition-all ${
        completed
          ? "border-green-500 bg-gray-800"
          : isResting
          ? "border-yellow-500"
          : "border-gray2"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-white text-xl font-bebas">{nome}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleCompleted(id)}
            className={`p-2 rounded-lg transition-colors ${
              completed
                ? "bg-green-600 text-white"
                : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            }`}
            title={
              completed ? "Desmarcar como completo" : "Marcar como completo"
            }
          >
            ✓
          </button>
          <button
            onClick={() => onRemove(id)}
            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            title="Remover exercício"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Informações do Exercício */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-300 text-sm mb-1">Séries</label>
          <div className="text-white text-lg font-semibold">{series}</div>
        </div>
        <div>
          <label className="block text-gray-300 text-sm mb-1">Repetições</label>
          <div className="text-white text-lg font-semibold">{repeticoes}</div>
        </div>
      </div>

      {/* Séries Individuais */}
      <div className="mb-4">
        <label className="block text-gray-300 text-sm mb-2">Séries</label>
        <div className="space-y-3">
          {seriesData.map((serie) => (
            <div
              key={serie.numero}
              className={`p-3 rounded-lg border ${
                serie.completada
                  ? "bg-green-900 border-green-500"
                  : "bg-gray border-gray2"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">
                  Série {serie.numero}
                </span>
                <button
                  onClick={() => toggleSerieCompletada(serie.numero)}
                  className={`p-1 rounded ${
                    serie.completada
                      ? "bg-green-600 text-white"
                      : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                  }`}
                  title={
                    serie.completada
                      ? "Desmarcar série"
                      : "Marcar série como completa"
                  }
                >
                  ✓
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 text-xs mb-1">
                    Carga (kg)
                  </label>
                  <input
                    type="number"
                    value={serie.carga}
                    onChange={(e) =>
                      updateSerieCarga(serie.numero, Number(e.target.value))
                    }
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded text-white text-sm focus:outline-none focus:border-primary-green"
                    placeholder="0"
                    min="0"
                    step="0.5"
                    disabled={serie.completada}
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-xs mb-1">
                    Repetições
                  </label>
                  <input
                    type="number"
                    value={serie.repeticoes}
                    onChange={(e) =>
                      updateSerieRepeticoes(
                        serie.numero,
                        Number(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 bg-gray border border-gray2 rounded text-white text-sm focus:outline-none focus:border-primary-green"
                    placeholder={repeticoes.toString()}
                    min="0"
                    max="999"
                    disabled={serie.completada}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timer de Descanso */}
      <div className="mb-4">
        <label className="block text-gray-300 text-sm mb-2">Descanso</label>
        <div className="flex items-center gap-3">
          <div
            className={`flex-1 text-center py-3 px-4 rounded-lg font-mono text-xl ${
              isResting
                ? "bg-yellow-600 text-white"
                : "bg-gray-600 text-gray-300"
            }`}
          >
            {formatTime(restTimeLeft)}
          </div>
          <div className="flex gap-2">
            {!isResting ? (
              <button
                onClick={() => onStartRest(id)}
                className="p-2 bg-primary-green text-white rounded-lg hover:bg-green-600 transition-colors"
                title="Iniciar descanso"
              >
                <Play size={16} />
              </button>
            ) : (
              <button
                onClick={() => onPauseRest(id)}
                className="p-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                title="Pausar descanso"
              >
                <Pause size={16} />
              </button>
            )}
            <button
              onClick={() => onResetRest(id)}
              className="p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
              title="Resetar descanso"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 text-sm">
        {completed && (
          <span className="text-green-400 flex items-center gap-1">
            ✓ Completo
          </span>
        )}
        {todasSeriesCompletadas && !completed && (
          <span className="text-blue-400 flex items-center gap-1">
            ✓ Todas as séries completadas
          </span>
        )}
        {isResting && (
          <span className="text-yellow-400 flex items-center gap-1">
            <Timer size={14} />
            Descansando...
          </span>
        )}
      </div>
    </div>
  );
};

export default ExercicioCard;
