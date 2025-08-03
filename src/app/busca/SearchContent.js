"use client"; // Marca este componente como um Componente de Cliente

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SearchX, Search } from 'lucide-react';
import { publicacoes } from '@/data/publicacoesData'; // Mantenha seus imports de dados
import { departamentosData } from '@/data/departamentosData';
import { popularLinks } from '@/data/navigationData';

// Sua função de busca (pode ficar neste arquivo ou em um arquivo de utilitários separado)
function performSearch(query) {
    if (!query) return [];
    const lowerCaseQuery = query.toLowerCase();
    let results = [];

    // Sua lógica de busca para publicações...
    publicacoes.forEach(pub => {
        let title = '', description = '', isMatch = false;
        if (pub.ementa && pub.numero) {
            const tipoCapitalized = pub.tipo.charAt(0).toUpperCase() + pub.tipo.slice(1, -1);
            title = `${tipoCapitalized} Nº ${pub.numero}`;
            description = pub.ementa;
            if (title.toLowerCase().includes(lowerCaseQuery) || description.toLowerCase().includes(lowerCaseQuery)) isMatch = true;
        } else if (pub.objeto && pub.modalidade) {
            title = `${pub.modalidade} Nº ${pub.numero}`;
            description = pub.objeto;
            if (title.toLowerCase().includes(lowerCaseQuery) || description.toLowerCase().includes(lowerCaseQuery)) isMatch = true;
        }
        if (isMatch) results.push({ title, description, href: `/publicacoes-oficiais/${pub.tipo}`, category: 'Publicação Oficial' });
    });

    // Sua lógica de busca para departamentos...
    departamentosData.forEach(depto => {
        if (depto.nome && depto.nome.toLowerCase().includes(lowerCaseQuery)) {
            results.push({ title: `Departamento de ${depto.nome}`, description: `Informações sobre o departamento.`, href: `/departamentos/${depto.slug}`, category: 'Departamento' });
        }
    });

    return results;
}


// O componente que mostra a tela de "Nenhum resultado"
const EmptyState = ({ query }) => {
    // ... seu componente EmptyState (pode ser mantido como estava)
    return (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border flex flex-col items-center">
            <SearchX size={48} className="mx-auto text-gray-400" />
            <h2 className="mt-4 text-2xl font-bold text-gray-800">Nenhum resultado encontrado para "{query}"</h2>
            <p className="text-gray-600 mt-2">Tente refazer sua busca ou navegue pelas seções populares.</p>
            <div className='flex flex-wrap justify-center gap-2 mt-8'>
                {popularLinks.map(link => (
                    <Link key={link.href} href={link.href} className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200'>
                        {link.text}
                    </Link>
                ))}
            </div>
        </div>
    );
};

// O componente que realmente usa o hook e exibe o conteúdo
export function SearchContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    const searchResults = performSearch(query);

    return (
        <>
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
                    query && <EmptyState query={query} />
                )}
            </div>
        </>
    );
}