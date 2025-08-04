"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { HeaderPainel } from '@/components/NavBar/HeaderPainel';

const GerenciarEventosPage = () => {
    const { data: session } = useSession();
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/eventos');
                const data = await response.json();
                setEventos(data);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja excluir este evento?')) return;
        
        const promise = fetch(`/api/eventos/${id}`, { method: 'DELETE' });
        
        toast.promise(promise, {
            loading: 'Excluindo evento...',
            success: () => {
                setEventos(eventos.filter(e => e.id !== id));
                return 'Evento excluído com sucesso!';
            },
            error: 'Você não tem permissão para excluir eventos.',
        });
    };

    if (loading) return <div>Carregando...</div>;

    const podeCriar = session?.user?.role === 'admin' || session?.user?.role === 'editor';
    const podeDeletar = session?.user?.role === 'admin';

    return (
                <>
                    <HeaderPainel/>
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Gerenciar Eventos</h1>
                {podeCriar && (
                    <Link href="/painel/eventos/novo" className="flex items-center gap-2 bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700">
                        <PlusCircle size={20} /> Novo Evento
                    </Link>
                )}
            </div>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                        <tr>
                            <th className="p-4 text-left font-semibold">Título do Evento</th>
                            <th className="p-4 text-left font-semibold">Local</th>
                            <th className="p-4 text-left font-semibold">Data de Início</th>
                            <th className="p-4 text-center font-semibold">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventos.map(item => (
                            <tr key={item.id} className="border-t hover:bg-slate-50">
                                <td className="p-4 font-medium text-gray-800">{item.titulo}</td>
                                <td className="p-4 text-gray-700">{item.local}</td>
                                <td className="p-4 text-gray-600">{new Date(item.data_inicio).toLocaleString('pt-BR')}</td>
                                <td className="p-4 flex justify-center items-center gap-2">
                                    <Link href={`/painel/eventos/editar/${item.id}`} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full" title="Editar"><Edit size={16} /></Link>
                                    {podeDeletar && (
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

export default GerenciarEventosPage;