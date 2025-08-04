"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircle, Edit, Trash2, Building } from 'lucide-react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { HeaderPainel } from '@/components/NavBar/HeaderPainel';

const GerenciarSecretariasPage = () => {
    const { data: session } = useSession();
    const [secretarias, setSecretarias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/secretarias');
                const data = await response.json();
                setSecretarias(data);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja excluir esta secretaria?')) return;
        
        const promise = fetch(`/api/secretarias/${id}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => { throw new Error(err.message) });
                }
                return res;
            });
        
        toast.promise(promise, {
            loading: 'Excluindo secretaria...',
            success: () => {
                setSecretarias(secretarias.filter(s => s.id !== id));
                return 'Secretaria excluída com sucesso!';
            },
            error: (err) => err.message || 'Falha ao excluir.',
        });
    };

    if (loading) return <div>Carregando...</div>;

    const podeGerenciar = session?.user?.role === 'admin';

    return (
        <>
                <HeaderPainel/>
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Gerenciar Secretarias</h1>
                {podeGerenciar && (
                    <Link href="/painel/secretarias/novo" className="flex items-center gap-2 bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700">
                        <PlusCircle size={20} /> Nova Secretaria
                    </Link>
                )}
            </div>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                        <tr>
                            <th className="p-4 text-left font-semibold">Nome da Secretaria</th>
                            <th className="p-4 text-left font-semibold">Responsável</th>
                            <th className="p-4 text-center font-semibold">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {secretarias.map(item => (
                            <tr key={item.id} className="border-t hover:bg-slate-50">
                                <td className="p-4 font-medium text-gray-800">{item.nome}</td>
                                <td className="p-4 text-gray-700">{item.responsavel_nome}</td>
                                <td className="p-4 flex justify-center items-center gap-2">
                                    <Link href={`/painel/secretarias/editar/${item.id}`} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full" title="Editar"><Edit size={16} /></Link>
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

export default GerenciarSecretariasPage;