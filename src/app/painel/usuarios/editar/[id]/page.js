"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import UsuarioForm from '../../UsuarioForm';

const EditarUsuarioPage = () => {
    const { id } = useParams();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchUsuario = async () => {
                const res = await fetch('/api/usuarios'); // Simples, busca todos e filtra
                const data = await res.json();
                setUsuario(data.find(u => u.id === parseInt(id)));
            };
            fetchUsuario();
        }
    }, [id]);

    if (!usuario) return <div>Carregando...</div>;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Editar Usuário</h1>
            <div className="bg-white p-8 rounded-xl shadow-sm border"><UsuarioForm usuarioInicial={usuario} /></div>
        </div>
    );
};
export default EditarUsuarioPage;