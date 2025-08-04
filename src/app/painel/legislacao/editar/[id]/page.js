"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import LegislacaoForm from '../../LegislacaoForm';
import { HeaderPainel } from '@/components/NavBar/HeaderPainel';

const EditarLegislacaoPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        if (id) {
            fetch('/api/legislacao')
                .then(res => res.json())
                .then(data => setItem(data.find(l => l.id === parseInt(id))));
        }
    }, [id]);

    if (!item) return <div>Carregando...</div>;

    return (
                <>
                    <HeaderPainel/>
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Item de Legislação</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border"><LegislacaoForm itemInicial={item} /></div>
        </div>
                </>
    );
};
export default EditarLegislacaoPage;