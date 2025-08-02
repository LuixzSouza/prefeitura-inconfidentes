// app/busca/page.js

"use client"; // Transforma em um Componente de Cliente para interatividade

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';
import { publicacoes } from '@/data/publicacoesData';
import { departamentosData } from '@/data/departamentosData';
import Link from 'next/link';
import { SearchX, Search } from 'lucide-react';
import { popularLinks } from '@/data/navigationData';

// Função de busca (sem alterações)
function performSearch(query) {
  if (!query) return [];
  const lowerCaseQuery = query.toLowerCase();
  let results = [];

  publicacoes.forEach(pub => {
    let title = '';
    let description = '';
    let isMatch = false;

    if (pub.ementa && pub.numero) {
      const tipoCapitalized = pub.tipo.charAt(0).toUpperCase() + pub.tipo.slice(1, -1);
      title = `${tipoCapitalized} Nº ${pub.numero}`;
      description = pub.ementa;
      if (title.toLowerCase().includes(lowerCaseQuery) || description.toLowerCase().includes(lowerCaseQuery)) {
        isMatch = true;
      }
    } else if (pub.objeto && pub.modalidade) {
      title = `${pub.modalidade} Nº ${pub.numero}`;
      description = pub.objeto;
      if (title.toLowerCase().includes(lowerCaseQuery) || description.toLowerCase().includes(lowerCaseQuery)) {
        isMatch = true;
      }
    }
    if (isMatch) {
      results.push({ title, description, href: `/publicacoes-oficiais/${pub.tipo}`, category: 'Publicação Oficial' });
    }
  });

  departamentosData.forEach(depto => {
    if (depto.nome && depto.nome.toLowerCase().includes(lowerCaseQuery)) {
      results.push({ title: `Departamento de ${depto.nome}`, description: `Informações sobre o departamento de ${depto.nome}.`, href: `/departamentos/${depto.slug}`, category: 'Departamento' });
    }
  });

  return results;
}


// NOVO COMPONENTE PARA A TELA DE "NENHUM RESULTADO ENCONTRADO"
const EmptyState = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        router.push(`/busca?q=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border flex flex-col items-center">
            <SearchX size={48} className="mx-auto text-gray-400" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Nenhum resultado encontrado</h2>
            <p className="text-gray-600 mt-2 max-w-md mx-auto">
                Tente refazer sua busca com termos diferentes ou verifique a ortografia.
            </p>

            {/* Nova barra de busca */}
            <form onSubmit={handleSearch} className="relative w-full max-w-lg mt-8">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Pesquisar novamente..."
                    className="w-full py-2.5 pl-10 pr-12 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button type="submit" className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-emerald-600" aria-label="Pesquisar">
                    <Search />
                </button>
            </form>

            <div className='mt-8'>
                <h3 className='font-semibold text-gray-700'>Ou navegue por seções populares:</h3>
                <div className='flex flex-wrap justify-center gap-2 mt-3'>
                    {popularLinks.map(link => (
                        <Link key={link.href} href={link.href} className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200'>
                            {link.text}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};


const SearchPage = () => {
  // Hook para ler os parâmetros da URL no lado do cliente
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const searchResults = performSearch(query);

  // Removi o Breadcrumbs daqui, pois ele já é chamado pelo Header globalmente.
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-800">
          Resultados da busca por: 
          <span className="text-emerald-600 ml-2">"{query}"</span>
        </h1>
        <p className="mt-2 text-gray-600">{searchResults.length} resultado(s) encontrado(s).</p>

        <div className="mt-10 space-y-6">
          {searchResults.length > 0 ? (
            searchResults.map((result, index) => (
              <Link key={index} href={result.href} className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl hover:border-emerald-500 border-l-4 border-transparent transition-all">
                <span className="text-sm font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">{result.category}</span>
                <h2 className="mt-2 text-xl font-bold text-gray-800 hover:text-emerald-600">{result.title}</h2>
                <p className="mt-1 text-gray-600">{result.description}</p>
              </Link>
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;