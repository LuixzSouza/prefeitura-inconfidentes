"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ServidorForm from '../../ServidorForm';
import { HeaderPainel } from '@/components/NavBar/HeaderPainel';

const EditarServidorPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/servidores/${id}`)
                .then(res => res.json())
                .then(data => setItem(data));
        }
    }, [id]);

    if (!item) return <div>Carregando servidor...</div>;

    return (
        <>
                <HeaderPainel/>
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Servidor</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border"><ServidorForm itemInicial={item} /></div>
        </div>
            </>
    );
};
export default EditarServidorPage;