"use client";

import React from "react";
import Loading from "./Loading";

interface PageLoadingProps {
  text?: string;
  showBackground?: boolean;
}

const PageLoading: React.FC<PageLoadingProps> = ({
  text = "Carregando página...",
  showBackground = true,
}) => {
  return (
    <div className={`min-h-screen ${showBackground ? "bg-gray" : ""} p-6`}>
      <div className="max-w-6xl mx-auto">
        <Loading size="large" text={text} fullScreen={false} className="h-64" />
      </div>
    </div>
  );
};

export default PageLoading;
