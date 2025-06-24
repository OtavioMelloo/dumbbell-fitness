"use client";

import React from "react";

interface LoadingProps {
  size?: "small" | "medium" | "large";
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = "medium",
  text = "Carregando...",
  fullScreen = false,
  className = "",
}) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 bg-gray/90 backdrop-blur-sm flex items-center justify-center z-50"
    : "flex items-center justify-center";

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner animado */}
        <div className="relative">
          <div
            className={`${sizeClasses[size]} border-4 border-gray2 border-t-primary-green rounded-full animate-spin`}
          />
          {/* Círculo interno para efeito mais suave */}
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
              size === "small"
                ? "w-3 h-3"
                : size === "medium"
                ? "w-6 h-6"
                : "w-8 h-8"
            } border-2 border-gray2 border-t-primary-green rounded-full animate-spin`}
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          />
        </div>

        {/* Texto de loading */}
        {text && (
          <div className="text-center">
            <p className="text-white font-medium text-sm">{text}</p>
            {/* Pontos animados */}
            <div className="flex justify-center space-x-1 mt-2">
              <div
                className="w-2 h-2 bg-primary-green rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-2 h-2 bg-primary-green rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-2 h-2 bg-primary-green rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loading;
