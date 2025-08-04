"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DiarioOficialForm from '../../DiarioOficialForm';
import { HeaderPainel } from '@/components/NavBar/HeaderPainel';

const EditarEdicaoPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        if (id) {
            fetch('/api/diario-oficial')
                .then(res => res.json())
                .then(data => setItem(data.find(d => d.id === parseInt(id))));
        }
    }, [id]);

    if (!item) return <div>Carregando edição...</div>;

    return (
        <>
            <HeaderPainel/>
            <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Edição do Diário Oficial</h1>
                <div className="bg-white p-8 rounded-xl shadow-sm border"><DiarioOficialForm edicaoInicial={item} /></div>
            </div>
        </>
    );
};
export default EditarEdicaoPage;