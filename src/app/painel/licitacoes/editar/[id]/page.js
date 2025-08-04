"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import LicitacaoForm from '../../LicitacaoForm';
import { HeaderPainel } from '@/components/NavBar/HeaderPainel';

const EditarLicitacaoPage = () => {
    const { id } = useParams();
    const [licitacao, setLicitacao] = useState(null);

    useEffect(() => {
        if (id) {
            fetch('/api/licitacoes') // Em um app maior, crie uma rota GET /api/licitacoes/[id]
                .then(res => res.json())
                .then(data => setLicitacao(data.find(l => l.id === parseInt(id))));
        }
    }, [id]);

    if (!licitacao) return <div>Carregando licitação...</div>;

    return (
                <>
                    <HeaderPainel/>
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Licitação</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border"><LicitacaoForm licitacaoInicial={licitacao} /></div>
        </div>
                </>
    );
};
export default EditarLicitacaoPage;