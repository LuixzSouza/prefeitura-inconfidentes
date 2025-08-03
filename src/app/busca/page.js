// app/busca/page.js

// Removido o "use client" do topo do arquivo.

import React, { Suspense } from 'react'; // 1. Importa o Suspense
import { SearchContent } from './SearchContent'; // 2. Importa o novo componente filho
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';

// ===================================================================
// COMPONENTE PRINCIPAL DA PÁGINA (SERVER COMPONENT)
// Este componente é estático e pode ser pré-renderizado no servidor.
// ===================================================================
export default function SearchPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
          Resultados da Busca
        </h1>
        
        {/* 3. Envolvemos o componente dinâmico com <Suspense>.
          - O 'fallback' é o que o usuário vê inicialmente.
          - O <SearchContent /> será renderizado no navegador do cliente.
        */}
        <Suspense fallback={<p className="mt-10 text-gray-600">Carregando resultados...</p>}>
          <SearchContent />
        </Suspense>

      </main>
      <Footer />
    </div>
  );
}