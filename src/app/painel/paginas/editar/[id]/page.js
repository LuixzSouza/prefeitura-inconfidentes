"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import PaginaForm from '../../PaginaForm';
import { HeaderPainel } from '@/components/NavBar/HeaderPainel';

const EditarPaginaPage = () => {
    const { id } = useParams();
    const [pagina, setPagina] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/paginas/${id}`)
                .then(res => res.json())
                .then(data => setPagina(data));
        }
    }, [id]);

    if (!pagina) return <div>Carregando página...</div>;

    return (
        <>
                <HeaderPainel/>
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Página</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border"><PaginaForm paginaInicial={pagina} /></div>
        </div>
            </>
    );
};
export default EditarPaginaPage;