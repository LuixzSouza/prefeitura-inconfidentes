"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { PlusCircle, Edit, Trash2, ShieldOff } from 'lucide-react';

const GerenciarUsuariosPage = () => {
    const { data: session, status } = useSession();
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // A busca de dados só acontece se o usuário for um admin
        if (status === 'authenticated' && session.user.role === 'admin') {
            const fetchUsuarios = async () => {
                try {
                    const response = await fetch('/api/usuarios');
                    const data = await response.json();
                    setUsuarios(data);
                } catch (error) {
                    console.error("Erro ao buscar usuários:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchUsuarios();
        } else if (status === 'authenticated') {
            setLoading(false); // Se não for admin, para de carregar
        }
    }, [session, status]);

    const handleDelete = async (id) => {
        if (confirm('Tem certeza que deseja excluir este usuário?')) {
            await fetch(`/api/usuarios/${id}`, { method: 'DELETE' });
            setUsuarios(usuarios.filter(u => u.id !== id));
        }
    };

    if (status === 'loading' || loading) return <div className="p-8">Carregando...</div>;
    
    // Proteção da Página: Se não for admin, mostra mensagem de acesso negado
    if (session?.user?.role !== 'admin') {
        return (
            <div className="p-8 text-center">
                <ShieldOff className="mx-auto h-12 w-12 text-red-500" />
                <h1 className="mt-4 text-2xl font-bold text-gray-800">Acesso Negado</h1>
                <p className="mt-2 text-gray-600">Você não tem permissão para acessar esta página.</p>
                <Link href="/painel" className="mt-6 inline-block bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg">
                    Voltar ao Painel
                </Link>
            </div>
        );
    }
    
    // Renderização normal para o admin
    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Gerenciar Usuários</h1>
                <Link href="/painel/usuarios/novo" className="flex items-center gap-2 bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700">
                    <PlusCircle size={20} />
                    Novo Usuário
                </Link>
            </div>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600 uppercase text-xs">
                        <tr>
                            <th className="p-4 text-left font-semibold">Nome</th>
                            <th className="p-4 text-left font-semibold">Email</th>
                            <th className="p-4 text-left font-semibold">Nível de Acesso</th>
                            <th className="p-4 text-center font-semibold">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario.id} className="border-t hover:bg-slate-50">
                                <td className="p-4 font-medium text-gray-800">{usuario.nome}</td>
                                <td className="p-4 text-gray-600">{usuario.email}</td>
                                <td className="p-4 text-gray-600 capitalize">{usuario.nivel_acesso}</td>
                                <td className="p-4 flex justify-center items-center gap-2">
                                    <Link href={`/painel/usuarios/editar/${usuario.id}`} className="p-2 text-blue-600 hover:bg-blue-100 rounded-full" title="Editar"><Edit size={16} /></Link>
                                    <button onClick={() => handleDelete(usuario.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full" title="Excluir"><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GerenciarUsuariosPage;