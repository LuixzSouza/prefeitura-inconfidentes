"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import NoticiaForm from '../../NoticiaForm'; // Reutilizando o mesmo formulário

const EditarNoticiaPage = () => {
    const { id } = useParams();
    const [noticia, setNoticia] = useState(null);

    useEffect(() => {
        if (id) {
            // Esta API para buscar uma notícia por ID não foi criada no passo 1,
            // mas seria ideal para popular o form. Por simplicidade, vamos buscar todas
            // e filtrar. Em um app real, crie a rota GET /api/noticias/[id].
            const fetchNoticia = async () => {
                const res = await fetch('/api/noticias');
                const data = await res.json();
                const noticiaParaEditar = data.find(n => n.id === parseInt(id));
                setNoticia(noticiaParaEditar);
            };
            fetchNoticia();
        }
    }, [id]);

    if (!noticia) return <div>Carregando...</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Notícia</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border">
                <NoticiaForm noticiaInicial={noticia} />
            </div>
        </div>
    );
};

export default EditarNoticiaPage;