"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UsuarioForm = ({ usuarioInicial }) => {
    const [formData, setFormData] = useState({
        nome: '', email: '', senha: '', nivel_acesso: 'publicador', status: 'ativo'
    });
    const router = useRouter();

    useEffect(() => {
        if (usuarioInicial) setFormData({ ...usuarioInicial, senha: '' }); // Limpa a senha no form de edição
    }, [usuarioInicial]);
    
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = usuarioInicial ? `/api/usuarios/${usuarioInicial.id}` : '/api/usuarios';
        const method = usuarioInicial ? 'PUT' : 'POST';

        const body = { ...formData };
        if (usuarioInicial && !body.senha) {
            delete body.senha; // Não envia a senha se estiver vazia na edição
        }

        const response = await fetch(url, {
            method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
        });

        if (response.ok) {
            alert(`Usuário ${usuarioInicial ? 'atualizado' : 'criado'}!`);
            router.push('/painel/usuarios');
            router.refresh();
        } else {
            const error = await response.json();
            alert(`Erro: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">{usuarioInicial ? 'Nova Senha (deixe em branco para não alterar)' : 'Senha'}</label>
                <input type="password" name="senha" value={formData.senha} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required={!usuarioInicial} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Nível de Acesso</label>
                <select name="nivel_acesso" value={formData.nivel_acesso} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    <option value="publicador">Publicador</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div className="flex justify-end"><button type="submit" className="bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-emerald-700">Salvar</button></div>
        </form>
    );
};
export default UsuarioForm;