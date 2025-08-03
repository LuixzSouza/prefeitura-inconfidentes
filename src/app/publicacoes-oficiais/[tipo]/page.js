// app/publicacoes-oficiais/[tipo]/page.js

"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Componentes da página (simulando importações)
// import { Header } from '@/components/NavBar/Header';
// import { Footer } from '@/components/sections/Footer';
// import { viewMapping, tiposLeisEAtos } from '@/data/publicacoesData'; // Mantenha seu viewMapping

// Ícones
import { Search, Calendar as CalendarIcon, Download, ChevronLeft, ChevronRight, FilterX, Eye, Lock, SearchX } from 'lucide-react';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';

// ===================================================================
// SEÇÃO 1: COMPONENTES AUXILIARES DE UI
// Componentes genéricos para filtros, paginação, status, etc.
// ===================================================================

const StatusBadge = ({ situacao }) => {
    // Mapeia os status do seu ENUM SQL para estilos visuais
    const S_STYLES = {
        'finalizada': 'bg-blue-100 text-blue-800',
        'aberta': 'bg-green-100 text-green-800',
        'em andamento': 'bg-yellow-100 text-yellow-800',
        'em_andamento': 'bg-yellow-100 text-yellow-800', // Alias
        'suspensa': 'bg-orange-100 text-orange-800',
        'cancelada': 'bg-red-100 text-red-800',
    };
    const texto = situacao ? situacao.replace(/_/g, ' ') : 'desconhecido';
    return <span className={`px-2.5 py-1 text-xs font-bold rounded-full capitalize ${S_STYLES[situacao] || 'bg-gray-100 text-gray-800'}`}>{texto}</span>;
};

const InputFilter = ({ label, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <input {...props} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-emerald-500" />
    </div>
);

const SelectFilter = ({ label, options, ...props }) => (
    <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
        <select {...props} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-emerald-500">
            <option value="">Todos</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
    <div className="flex justify-center items-center gap-2 mt-8">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-lg disabled:opacity-50 hover:bg-gray-100"><ChevronLeft size={20}/></button>
        <span className="font-semibold text-gray-700">Página {currentPage} de {totalPages}</span>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages} className="p-2 rounded-lg disabled:opacity-50 hover:bg-gray-100"><ChevronRight size={20}/></button>
    </div>
);

const EmptyState = ({ message = "Nenhum resultado encontrado." }) => (
    <div className="text-center py-16 px-6 bg-white rounded-xl shadow-sm border">
        <SearchX size={48} className="mx-auto text-gray-400" />
        <h2 className="mt-4 text-xl font-bold text-gray-800">{message}</h2>
        <p className="text-gray-600 mt-2">Tente ajustar os filtros ou pesquisar por outros termos.</p>
    </div>
);

const LoadingSkeleton = () => (
    <div className="animate-pulse">
        <div className="bg-gray-200 p-6 rounded-xl mb-8 h-40"></div>
        <div className="bg-gray-200 rounded-xl h-96"></div>
    </div>
);


// ===================================================================
// SEÇÃO 2: COMPONENTES DE VISUALIZAÇÃO (VIEWS)
// Cada componente é responsável por renderizar um tipo de publicação.
// ===================================================================

const LeisEAtosView = ({ items }) => {
    // ... (Seu código para LeisEAtosView parece bom e completo, mantido como está)
    // Apenas garantindo que os campos correspondem ao SQL: item.numero, item.ano, item.ementa, item.data_sancao, item.caminho_arquivo
    const [filters, setFilters] = useState({ tipo: '', numero: '', ementa: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
    const clearFilters = () => setFilters({ tipo: '', numero: '', ementa: '' });

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <SelectFilter label="Tipo" name="tipo" value={filters.tipo} onChange={handleFilterChange} options={['lei', 'decreto', 'portaria', 'resolucao']} />
                    <InputFilter label="Número" name="numero" value={filters.numero} onChange={handleFilterChange} placeholder="Ex.: 1572"/>
                    <InputFilter label="Ementa" name="ementa" value={filters.ementa} onChange={handleFilterChange} placeholder="Ex.: Dispõe sobre..." />
                </div>
                 <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
                    <button onClick={clearFilters} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"><FilterX size={16}/> Limpar</button>
                 </div>
            </div>
            {paginatedItems.length > 0 ? (
                <>
                    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                                    <tr>
                                        <th className="p-4 font-semibold">Tipo</th>
                                        <th className="p-4 font-semibold">Número/Ano</th>
                                        <th className="p-4 font-semibold">Ementa</th>
                                        <th className="p-4 font-semibold">Data</th>
                                        <th className="p-4 font-semibold text-center">Documento</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedItems.map(item => (
                                        <tr key={item.id} className="border-t hover:bg-emerald-50/30">
                                            <td className="p-4 font-medium capitalize">{item.tipo}</td>
                                            <td className="p-4">{`${item.numero}/${item.ano}`}</td>
                                            <td className="p-4 max-w-lg text-gray-700">{item.ementa}</td>
                                            <td className="p-4 whitespace-nowrap">{new Date(item.data_sancao).toLocaleDateString('pt-BR')}</td>
                                            <td className="p-4 text-center">
                                                <a href={item.caminho_arquivo} title="Baixar Documento" target="_blank" rel="noopener noreferrer" className="inline-block p-2 text-emerald-600 hover:text-white hover:bg-emerald-600 rounded-full transition-colors">
                                                    <Download size={20}/>
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />}
                </>
            ) : <EmptyState />}
        </div>
    );
};

const LicitacoesView = ({ items }) => {
    // Corrigido para usar os campos do SQL: item.modalidade, item.numero, item.objeto, item.data_abertura, item.status
    return (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                        <tr>
                            <th className="p-4 font-semibold">Modalidade</th>
                            <th className="p-4 font-semibold">Número</th>
                            <th className="p-4 font-semibold">Objeto</th>
                            <th className="p-4 font-semibold">Abertura</th>
                            <th className="p-4 font-semibold">Situação</th>
                            <th className="p-4 font-semibold"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} className="border-t hover:bg-emerald-50/30">
                                <td className="p-4 font-medium">{item.modalidade}</td>
                                <td className="p-4">{item.numero}</td>
                                <td className="p-4 max-w-md text-gray-700">{item.objeto}</td>
                                <td className="p-4 whitespace-nowrap">{new Date(item.data_abertura).toLocaleDateString('pt-BR')}</td>
                                <td className="p-4"><StatusBadge situacao={item.status} /></td>
                                <td className="p-4">
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

const ConcursosView = ({ items }) => {
    // Corrigido para usar os campos do SQL: item.titulo, item.numero, item.ano, item.descricao, item.data_abertura, item.status, item.caminho_edital
    return (
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                        <tr>
                            <th className="p-4 font-semibold">Título</th>
                            <th className="p-4 font-semibold">Número/Ano</th>
                            <th className="p-4 font-semibold">Abertura</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold text-center">Edital</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item.id} className="border-t hover:bg-emerald-50/30">
                                <td className="p-4 font-medium">{item.titulo}</td>
                                <td className="p-4">{`${item.numero}/${item.ano}`}</td>
                                <td className="p-4 whitespace-nowrap">{new Date(item.data_abertura).toLocaleDateString('pt-BR')}</td>
                                <td className="p-4"><StatusBadge situacao={item.status} /></td>
                                <td className="p-4 text-center">
                                    <a href={item.caminho_edital} title="Baixar Edital" target="_blank" rel="noopener noreferrer" className="inline-block p-2 text-emerald-600 hover:text-white hover:bg-emerald-600 rounded-full transition-colors">
                                        <Download size={20}/>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const DiarioOficialView = ({ items }) => {
    // Este componente agora é autocontido, com seus próprios filtros, como solicitado.
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const filteredItems = useMemo(() => {
        return items.filter(item => {
            // As datas da API virão como strings, então é preciso converter para Date objects para comparação
            const itemDate = new Date(item.data_publicacao);
            const matchesDate = !selectedDate || itemDate.toDateString() === selectedDate.toDateString();
            
            const matchesSearch = searchTerm === '' ||
                String(item.edicao_numero).includes(searchTerm) ||
                (item.descricao && item.descricao.toLowerCase().includes(searchTerm.toLowerCase()));

            return matchesDate && matchesSearch;
        });
    }, [items, searchTerm, selectedDate]);
    
    const clearFilters = () => {
        setSearchTerm('');
        setSelectedDate(null);
    }
    
    // Sub-componente do Calendário movido para dentro para encapsulamento
    const Calendar = ({ onDateSelect, publications }) => {
        const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
        const publicationDates = useMemo(() => new Set(publications.map(p => new Date(p.data_publicacao).toISOString().split('T')[0])), [publications]);
        const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const daysInMonth = Array.from({ length: endOfMonth.getDate() }, (_, i) => i + 1);
        const startingDayOfWeek = startOfMonth.getDay();
        const changeMonth = (offset) => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
        const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

        return (
            <div className="bg-white p-4 rounded-xl shadow-sm border">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeft size={20}/></button>
                    <h3 className="font-bold text-gray-800 text-sm">{currentMonth.toLocaleString('pt-BR', { month: 'long', year: 'numeric' }).toUpperCase()}</h3>
                    <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-100"><ChevronRight size={20}/></button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
                    {weekDays.map((day, i) => <div key={i} className="font-medium">{day}</div>)}
                    {Array.from({ length: startingDayOfWeek }).map((_, i) => <div key={`e-${i}`}></div>)}
                    {daysInMonth.map(day => {
                        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                        const dateString = date.toISOString().split('T')[0];
                        const isSelected = selectedDate && dateString === selectedDate.toISOString().split('T')[0];
                        const hasPublication = publicationDates.has(dateString);
                        return (
                            <button key={day} onClick={() => onDateSelect(date)} className={`relative w-9 h-9 rounded-full transition-colors ${isSelected ? 'bg-emerald-600 text-white font-bold' : 'hover:bg-gray-100'}`}>
                                {day}
                                {hasPublication && !isSelected && <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <label htmlFor="search-do" className="block text-sm font-medium text-gray-800">Pesquisa no Diário Oficial</label>
                <input id="search-do" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Busque por edição ou conteúdo..." className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"/>
                <div className="flex justify-end items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                    <button onClick={clearFilters} className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"><FilterX size={16}/> Limpar Filtros</button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1"><Calendar onDateSelect={setSelectedDate} publications={items}/></div>
                <div className="lg:col-span-3 space-y-6">
                    {filteredItems.length > 0 ? (
                        filteredItems.map(item => (
                            <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border">
                                <div className="flex justify-between items-start gap-4">
                                    <h3 className="text-lg font-bold text-gray-800">Edição {item.edicao_numero}, {new Date(item.data_publicacao).toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                                    <a href={item.caminho_arquivo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 whitespace-nowrap"><Lock size={16}/> Versão Assinada</a>
                                </div>
                                {item.descricao && <p className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-700">{item.descricao}</p>}
                            </div>
                        ))
                    ) : <EmptyState message="Nenhuma edição encontrada para os filtros aplicados."/>}
                </div>
            </div>
        </div>
    );
};


// ===================================================================
// SEÇÃO 3: COMPONENTE PRINCIPAL DA PÁGINA
// Este componente busca os dados e decide qual "View" renderizar.
// ===================================================================

const PublicacoesListPage = () => {
    const params = useParams();
    const router = useRouter(); // Adicionado para lidar com erro
    const tipo = params.tipo;

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Mapeamento dos tipos de URL para os componentes de visualização
    // Idealmente, viria de um arquivo de configuração como o seu `publicacoesData.js`
    const viewMapping = {
        'leis': 'LeisEAtosView',
        'decretos': 'LeisEAtosView',
        'portarias': 'LeisEAtosView',
        'resolucoes': 'LeisEAtosView',
        'licitacoes': 'LicitacoesView',
        'compras-diretas': 'LicitacoesView',
        'concursos-e-processos-seletivos': 'ConcursosView',
        'diario-oficial': 'DiarioOficialView'
    };
    
    const viewComponentKey = viewMapping[tipo] || null;

    useEffect(() => {
        if (!tipo || !viewComponentKey) {
            // Se o tipo for inválido, podemos redirecionar ou mostrar erro
            console.error("Tipo de publicação inválido:", tipo);
            setIsLoading(false);
            return;
        }

        async function fetchData() {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/publicacoes/${tipo}`); // A API deve retornar os dados corretos
                if (!response.ok) {
                    throw new Error(`Erro na API: ${response.statusText}`);
                }
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error("Falha ao buscar dados:", error);
                setError(error.message);
                setItems([]);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [tipo, viewComponentKey]); // Dependência adicionada para robustez
    
    const pageTitle = tipo ? tipo.toString().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Publicações";
    
    const renderContent = () => {
        if (isLoading) return <LoadingSkeleton />;
        if (error) return <EmptyState message={`Ocorreu um erro: ${error}`} />;
        if (!viewComponentKey) return <EmptyState message="Categoria de publicação não encontrada." />;

        switch(viewComponentKey) {
            case 'LeisEAtosView': return <LeisEAtosView items={items} />;
            case 'LicitacoesView': return <LicitacoesView items={items} />;
            case 'ConcursosView': return <ConcursosView items={items} />;
            case 'DiarioOficialView': return <DiarioOficialView items={items} />;
            default: return <EmptyState />;
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header/> 
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 tracking-tight">{pageTitle}</h1>
                </div>
                {renderContent()}
            </main>
            <Footer />
        </div>
    );
};

export default PublicacoesListPage;