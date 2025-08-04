"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import SecretariaForm from '../../SecretariaForm';
import { HeaderPainel } from '@/components/NavBar/HeaderPainel';

const EditarSecretariaPage = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/secretarias/${id}`)
                .then(res => res.json())
                .then(data => setItem(data));
        }
    }, [id]);

    if (!item) return <div>Carregando secretaria...</div>;

    return (
        <>
                <HeaderPainel/>
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Secretaria</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border"><SecretariaForm itemInicial={item} /></div>
        </div>
            </>
    );
};
export default EditarSecretariaPage;