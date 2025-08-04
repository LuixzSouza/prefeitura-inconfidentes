"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ConcursoForm from '../../ConcursoForm';
import { HeaderPainel } from '@/components/NavBar/HeaderPainel';

const EditarConcursoPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        if (id) {
            fetch('/api/concursos')
                .then(res => res.json())
                .then(data => setItem(data.find(c => c.id === parseInt(id))));
        }
    }, [id]);

    if (!item) return <div>Carregando...</div>;

    return (
        <>
            <HeaderPainel/>
            <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Concurso / Processo Seletivo</h1>
                <div className="bg-white p-8 rounded-xl shadow-sm border"><ConcursoForm itemInicial={item} /></div>
            </div>
        </>
    );
};
export default EditarConcursoPage;