"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { HeaderPainel } from '@/components/NavBar/HeaderPainel';

const GerenciarLegislacaoPage = () => {
    const { data: session } = useSession();
    const [legislacao, setLegislacao] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/legislacao');
                const data = await response.json();
                setLegislacao(data);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja excluir este item?')) return;
        
        const promise = fetch(`/api/legislacao/${id}`, { method: 'DELETE' });
        
        toast.promise(promise, {
            loading: 'Excluindo item...',
            success: () => {
                setLegislacao(legislacao.filter(l => l.id !== id));
                return 'Item excluído com sucesso!';
            },
            error: 'Falha ao excluir.',
        });
    };

    if (loading) return <div>Carregando...</div>;

    const podeGerenciar = session?.user?.role === 'admin' || session?.user?.role === 'editor';

    return (
                <>
                    <HeaderPainel/>
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Gerenciar Leis e Atos</h1>
                {podeGerenciar && (
                    <Link href="/painel/legislacao/novo" className="flex items-center gap-2 bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700">
                        <PlusCircle size={20} /> Novo Item
                    </Link>
                )}
            </div>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                        <tr>
                            <th className="p-4 text-left font-semibold">Tipo</th>
                            <th className="p-4 text-left font-semibold">Número/Ano</th>
                            <th className="p-4 text-left font-semibold">Ementa</th>
                            <th className="p-4 text-center font-semibold">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {legislacao.map(item => (
                            <tr key={item.id} className="border-t hover:bg-slate-50">
                                <td className="p-4 font-medium capitalize">{item.tipo}</td>
                                <td className="p-4 text-gray-700">{item.numero}/{item.ano}</td>
                                <td className="p-4 text-gray-700 truncate max-w-md">{item.ementa}</td>
                                <td className="p-4 flex justify-center items-center gap-2">
                                    <Link href={`/painel/legislacao/editar/${item.id}`} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full" title="Editar"><Edit size={16} /></Link>
                                    {podeGerenciar && (
                                        <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full" title="Excluir"><Trash2 size={16} /></button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
                </>
    );
};

export default GerenciarLegislacaoPage;