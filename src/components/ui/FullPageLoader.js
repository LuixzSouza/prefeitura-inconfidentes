import React from 'react';
import Image from 'next/image';

export const FullPageLoader = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-center p-4">
      {/* Logo Pulsante */}
      <div className="animate-pulse-slow">
        <Image 
          width={250}
          height={84} 
          alt="Logo da Prefeitura de Inconfidentes" 
          src="/images/renovation-25_28.png"
          priority
        />
      </div>
      
      {/* Texto */}
      <p className="mt-6 text-lg font-semibold text-gray-600 tracking-wider">
        Carregando...
      </p>

      {/* Nova Barra de Carregamento */}
      <div className="w-full max-w-xs h-1.5 bg-gray-200 rounded-full overflow-hidden mt-4">
        <div className="h-full bg-emerald-500 animate-loading-fill"></div>
      </div>
    </div>
  );
};