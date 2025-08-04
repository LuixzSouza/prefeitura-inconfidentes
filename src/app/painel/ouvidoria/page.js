"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, ShieldOff } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { HeaderPainel } from '@/components/NavBar/HeaderPainel';

const StatusBadge = ({ status }) => {
    const styles = {
        aberto: 'bg-blue-100 text-blue-800',
        em_analise: 'bg-yellow-100 text-yellow-800',
        respondido: 'bg-green-100 text-green-800',
        fechado: 'bg-gray-100 text-gray-800',
    };
    return <span className={`px-2.5 py-1 text-xs font-bold rounded-full capitalize ${styles[status]}`}>{status.replace('_', ' ')}</span>;
};

const GerenciarOuvidoriaPage = () => {
    const { data: session, status: sessionStatus } = useSession();
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (sessionStatus === 'authenticated') {
            const fetchData = async () => {
                try {
                    const response = await fetch('/api/ouvidoria');
                    const data = await response.json();
                    setSolicitacoes(data);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [sessionStatus]);

    if (sessionStatus === 'loading' || loading) return <div>Carregando...</div>;
    
    const podeGerenciar = session?.user?.role === 'admin' || session?.user?.role === 'editor';
    
    if (!podeGerenciar) {
        return (
            <>
        <HeaderPainel/>
            <div className="p-8 text-center">
                <ShieldOff className="mx-auto h-12 w-12 text-red-500" />
                <h1 className="mt-4 text-2xl font-bold text-gray-800">Acesso Negado</h1>
                <p className="mt-2 text-gray-600">Você não tem permissão para gerenciar a ouvidoria.</p>
            </div>
    </>
        );
    }

    return (
        <>
                <HeaderPainel/>
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Caixa de Entrada da Ouvidoria</h1>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                        <tr>
                            <th className="p-4 text-left font-semibold">Protocolo</th>
                            <th className="p-4 text-left font-semibold">Assunto</th>
                            <th className="p-4 text-left font-semibold">Tipo</th>
                            <th className="p-4 text-left font-semibold">Status</th>
                            <th className="p-4 text-center font-semibold">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitacoes.map(item => (
                            <tr key={item.id} className="border-t hover:bg-slate-50">
                                <td className="p-4 font-mono text-xs text-gray-700">{item.protocolo}</td>
                                <td className="p-4 font-medium text-gray-800">{item.assunto}</td>
                                <td className="p-4 text-gray-600 capitalize">{item.tipo_manifestacao}</td>
                                <td className="p-4"><StatusBadge status={item.status} /></td>
                                <td className="p-4 text-center">
                                    <Link href={`/painel/ouvidoria/${item.id}`} className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700">
                                        <Eye size={14}/> Ver Detalhes
                                    </Link>
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

export default GerenciarOuvidoriaPage;