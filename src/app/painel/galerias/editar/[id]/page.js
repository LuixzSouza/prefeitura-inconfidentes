"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import GaleriaForm from '../../GaleriaForm';
import { HeaderPainel } from '@/components/NavBar/HeaderPainel';

const EditarGaleriaPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/galerias/${id}`).then(res => res.json()).then(setItem);
        }
    }, [id]);

    if (!item) return <div>Carregando galeria...</div>;

    return (
                <>
                    <HeaderPainel/>
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Galeria</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border"><GaleriaForm itemInicial={item} /></div>
        </div>
                </>
    );
};
export default EditarGaleriaPage;