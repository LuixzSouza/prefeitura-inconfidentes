"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import EventoForm from '../../EventoForm';
import { HeaderPainel } from '@/components/NavBar/HeaderPainel';

const EditarEventoPage = () => {
    const { id } = useParams();
    const [evento, setEvento] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/eventos/${id}`)
                .then(res => res.json())
                .then(data => setEvento(data));
        }
    }, [id]);

    if (!evento) return <div>Carregando evento...</div>;

    return (
        <>
            <HeaderPainel/>
            <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Evento</h1>
                <div className="bg-white p-8 rounded-xl shadow-sm border"><EventoForm eventoInicial={evento} /></div>
            </div>
        </>
    );
};
export default EditarEventoPage;