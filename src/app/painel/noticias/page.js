"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const GerenciarNoticiasPage = () => {
    const { data: session } = useSession();
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNoticias = async () => {
            try {
                const response = await fetch('/api/noticias');
                const data = await response.json();
                setNoticias(data);
            } catch (error) {
                console.error("Erro ao buscar notícias:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNoticias();
    }, []);

    const handleDelete = async (id) => {
        if (confirm('Tem certeza que deseja excluir esta notícia? Esta ação não pode ser desfeita.')) {
            try {
                await fetch(`/api/noticias/${id}`, { method: 'DELETE' });
                setNoticias(noticias.filter(n => n.id !== id)); // Remove da lista na UI
            } catch (error) {
                console.error('Erro ao deletar notícia:', error);
                alert('Falha ao excluir a notícia.');
            }
        }
    };

    if (loading) return <div>Carregando notícias...</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Gerenciar Notícias</h1>
                <Link href="/painel/noticias/novo" className="flex items-center gap-2 bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700">
                    <PlusCircle size={20} />
                    Nova Notícia
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                        <tr>
                            <th className="p-4 text-left font-semibold">Título</th>
                            <th className="p-4 text-left font-semibold">Status</th>
                            <th className="p-4 text-left font-semibold">Data de Publicação</th>
                            <th className="p-4 text-center font-semibold">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noticias.map(noticia => (
                            <tr key={noticia.id} className="border-t hover:bg-slate-50">
                                <td className="p-4 font-medium text-gray-800">{noticia.titulo}</td>
                                <td className="p-4"><span className={`px-2 py-1 text-xs font-bold rounded-full ${noticia.status === 'publicado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{noticia.status}</span></td>
                                <td className="p-4 text-gray-600">{new Date(noticia.data_publicacao).toLocaleDateString('pt-BR')}</td>
                                <td className="p-4 flex justify-center items-center gap-2">
                                    <Link href={`/painel/noticias/editar/${noticia.id}`} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full" title="Editar">
                                        <Edit size={16} />
                                    </Link>
                                    {session?.user?.role !== 'publicador' && (
                                        <button onClick={() => handleDelete(noticia.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full" title="Excluir">
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GerenciarNoticiasPage;