// app/publicacoes-oficiais/[tipo]/page.js

"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { viewMapping, tiposLeisEAtos, modalidadesLicitacao, situacoesLicitacao } from '@/data/publicacoesData';
import { Search, Calendar, FileDown, ChevronLeft, ChevronRight, Download, FilterX, Eye, SearchX } from 'lucide-react';
import Link from 'next/link';

// --- COMPONENTES AUXILIARES DE UI (RE-ADICIONADOS) ---
const StatusBadge = ({ situacao }) => {
  const S_STYLES = {
    'finalizada': 'bg-blue-100 text-blue-800',
    'aberta': 'bg-green-100 text-green-800',
    'em_andamento': 'bg-yellow-100 text-yellow-800',
    'cancelada': 'bg-red-100 text-red-800',
  };
  return <span className={`px-2.5 py-1 text-xs font-bold rounded-full capitalize ${S_STYLES[situacao] || 'bg-gray-100 text-gray-800'}`}>{situacao.replace('_', ' ')}</span>;
};
const InputFilter = ({ label, ...props }) => (
    <div><label className="block text-sm font-medium text-gray-600 mb-1">{label}</label><input {...props} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-emerald-500" /></div>
);
const SelectFilter = ({ label, options, ...props }) => (
    <div><label className="block text-sm font-medium text-gray-600 mb-1">{label}</label><select {...props} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-emerald-500"><option value="">Todos</option>{options.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></div>
);
const DateRangeFilter = ({ filters, onChange }) => (
    <div><label className="block text-sm font-medium text-gray-600 mb-1">Período de Publicação</label><div className="flex gap-2"><input type="date" name="dataDe" value={filters.dataDe} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-emerald-500" /><input type="date" name="dataAte" value={filters.dataAte} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-emerald-500" /></div></div>
);
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex justify-center items-center gap-2 mt-8"><button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-md disabled:opacity-50 hover:bg-gray-200"><ChevronLeft/></button><span className="font-semibold text-gray-700">Página {currentPage} de {totalPages}</span><button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-md disabled:opacity-50 hover:bg-gray-200"><ChevronRight/></button></div>
);
const EmptyState = () => (
    <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm border"><SearchX size={48} className="mx-auto text-gray-400" /><h2 className="mt-4 text-2xl font-bold text-gray-800">Nenhum resultado encontrado</h2><p className="text-gray-600 mt-2">Tente ajustar os filtros.</p></div>
);
const LoadingSkeleton = () => (
    <div className="animate-pulse"><div className="bg-gray-200/80 p-6 rounded-xl mb-8 h-40"></div><div className="bg-gray-200/80 rounded-xl h-96"></div></div>
);

// --- COMPONENTES DE VISUALIZAÇÃO ---
const LeisEAtosView = ({ items }) => {
    const [filters, setFilters] = useState({ tipo: '', numero: '', ementa: '', dataDe: '', dataAte: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const handleFilterChange = (e) => setFilters({...filters, [e.target.name]: e.target.value });
    const clearFilters = () => setFilters({ tipo: '', numero: '', ementa: '', dataDe: '', dataAte: '' });
    const filteredItems = useMemo(() => items.filter(item => {
        return (filters.tipo ? item.tipo.toLowerCase() === filters.tipo.toLowerCase() : true) &&
               (filters.numero ? String(item.numero).includes(filters.numero) : true) &&
               (filters.ementa ? item.ementa.toLowerCase().includes(filters.ementa.toLowerCase()) : true);
    }), [items, filters]);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <SelectFilter label="Tipo" name="tipo" value={filters.tipo} onChange={handleFilterChange} options={tiposLeisEAtos.map(t => t.toLowerCase())} />
                    <InputFilter label="Número" name="numero" value={filters.numero} onChange={handleFilterChange} placeholder="Ex.: 1501"/>
                    <InputFilter label="Ementa" name="ementa" value={filters.ementa} onChange={handleFilterChange} placeholder="Ex.: Dispõe sobre..." />
                    <DateRangeFilter filters={filters} onChange={handleFilterChange}/>
                </div>
                <div className="flex justify-end gap-2 mt-4 pt-4 border-t"><button onClick={clearFilters} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"><FilterX size={16}/> Limpar</button><button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"><Search size={16}/> Pesquisar</button></div>
            </div>
            {paginatedItems.length > 0 ? (
                <>
                    <div className="bg-white rounded-xl shadow-sm border overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead className="bg-slate-50 text-slate-600 uppercase text-xs"><tr><th className="p-4 font-semibold">Tipo</th><th className="p-4 font-semibold">Número/Ano</th><th className="p-4 font-semibold">Ementa</th><th className="p-4 font-semibold">Data</th><th className="p-4 font-semibold text-center">Documento</th></tr></thead><tbody>{paginatedItems.map(item => (<tr key={item.id} className="border-t hover:bg-emerald-50/30"><td className="p-4 font-medium capitalize">{item.tipo}</td><td className="p-4">{`${item.numero}/${item.ano}`}</td><td className="p-4 max-w-lg text-gray-700">{item.ementa}</td><td className="p-4 whitespace-nowrap">{new Date(item.data_sancao).toLocaleDateString('pt-BR')}</td><td className="p-4 text-center"><a href={item.caminho_arquivo} title="Baixar Documento" target="_blank" rel="noopener noreferrer" className="inline-block p-2 text-emerald-600 hover:text-white hover:bg-emerald-600 rounded-full transition-colors"><Download size={20}/></a></td></tr>))}</tbody></table></div></div>
                    {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
                </>
            ) : <EmptyState />}
        </div>
    );
};
const LicitacoesView = ({ items }) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                        <tr><th className="p-4 font-semibold">Modalidade</th><th className="p-4 font-semibold">Número</th><th className="p-4 font-semibold">Objeto</th><th className="p-4 font-semibold">Abertura</th><th className="p-4 font-semibold">Situação</th><th className="p-4 font-semibold"></th></tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} className="border-t hover:bg-emerald-50/30">
                                <td className="p-4 font-medium">{item.modalidade}</td><td className="p-4">{item.numero}</td><td className="p-4 max-w-md text-gray-700">{item.objeto}</td><td className="p-4 whitespace-nowrap">{new Date(item.data_abertura).toLocaleDateString('pt-BR')}</td><td className="p-4"><StatusBadge situacao={item.status} /></td><td className="p-4">
                                <Link href={`/licitacao/${item.id}`} className="flex items-center justify-center gap-2 w-full px-3 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700">
                                    <Eye size={16}/> Detalhes
                                </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// --- COMPONENTE PRINCIPAL DA PÁGINA ---
const PublicacoesListPage = () => {
    const params = useParams();
    const tipo = params.tipo;
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/publicacoes/${tipo}`);
                if (!response.ok) { // Verifica se a resposta da API foi bem-sucedida
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erro na API');
                }
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error("Falha ao buscar dados da API:", error);
                setItems([]);
            } finally {
                setIsLoading(false);
            }
        }
        if (tipo) fetchData();
    }, [tipo]);
    
    const viewComponentKey = viewMapping[tipo] || null;
    const pageTitle = tipo ? tipo.toString().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Publicações";
    
    const renderContent = () => {
        if (isLoading) return <LoadingSkeleton />;
        switch(viewComponentKey) {
            case 'LicitacoesView': return <LicitacoesView items={items} />;
            case 'LeisEAtosView': return <LeisEAtosView items={items} />;
            default: return <EmptyState />;
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <Breadcrumbs />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">{pageTitle}</h1>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-emerald-700 bg-emerald-100 rounded-lg hover:bg-emerald-200">
                        <Download size={16}/> Exportar Dados
                    </button>
                </div>
                {renderContent()}
            </main>
            <Footer />
        </div>
    );
};

export default PublicacoesListPage;