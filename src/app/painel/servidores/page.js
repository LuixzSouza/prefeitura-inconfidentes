"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircle, Edit, Trash2, ShieldOff } from 'lucide-react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { HeaderPainel } from '@/components/NavBar/HeaderPainel';

const GerenciarServidoresPage = () => {
    const { data: session, status } = useSession();
    const [servidores, setServidores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'authenticated') {
            const fetchData = async () => {
                try {
                    const response = await fetch('/api/servidores');
                    const data = await response.json();
                    setServidores(data);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [status]);

    const handleDelete = async (id) => {
        if (!confirm('Tem certeza que deseja excluir este servidor?')) return;
        
        const promise = fetch(`/api/servidores/${id}`, { method: 'DELETE' });
        
        toast.promise(promise, {
            loading: 'Excluindo servidor...',
            success: () => {
                setServidores(servidores.filter(s => s.id !== id));
                return 'Servidor excluído com sucesso!';
            },
            error: 'Falha ao excluir.',
        });
    };

    if (status === 'loading' || loading) return <div>Carregando...</div>;
    
    const podeGerenciar = session?.user?.role === 'admin';
    
    if (!podeGerenciar && status === 'authenticated') {
        return (
            <>
        <HeaderPainel/>
            <div className="p-8 text-center">
                <ShieldOff className="mx-auto h-12 w-12 text-red-500" />
                <h1 className="mt-4 text-2xl font-bold text-gray-800">Acesso Negado</h1>
                <p className="mt-2 text-gray-600">Apenas administradores podem gerenciar servidores.</p>
            </div>
    </>
        );
    }

    return (
        <>
                <HeaderPainel/>
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Gerenciar Servidores</h1>
                <Link href="/painel/servidores/novo" className="flex items-center gap-2 bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700">
                    <PlusCircle size={20} /> Novo Servidor
                </Link>
            </div>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                        <tr>
                            <th className="p-4 text-left font-semibold">Nome</th>
                            <th className="p-4 text-left font-semibold">Cargo</th>
                            <th className="p-4 text-left font-semibold">Secretaria</th>
                            <th className="p-4 text-center font-semibold">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servidores.map(item => (
                            <tr key={item.id} className="border-t hover:bg-slate-50">
                                <td className="p-4 font-medium text-gray-800">{item.nome}</td>
                                <td className="p-4 text-gray-700">{item.cargo}</td>
                                <td className="p-4 text-gray-600">{item.secretaria.nome}</td>
                                <td className="p-4 flex justify-center items-center gap-2">
                                    <Link href={`/painel/servidores/editar/${item.id}`} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full" title="Editar"><Edit size={16} /></Link>
                                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full" title="Excluir"><Trash2 size={16} /></button>
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

export default GerenciarServidoresPage;