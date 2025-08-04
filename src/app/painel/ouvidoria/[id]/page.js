"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import { HeaderPainel } from '@/components/NavBar/HeaderPainel';

const DetalheSolicitacaoPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const [solicitacao, setSolicitacao] = useState(null);
    const [novoStatus, setNovoStatus] = useState('');

    useEffect(() => {
        if (id) {
            fetch(`/api/ouvidoria/${id}`)
                .then(res => res.json())
                .then(data => {
                    setSolicitacao(data);
                    setNovoStatus(data.status);
                });
        }
    }, [id]);

    const handleStatusChange = async () => {
        const promise = fetch(`/api/ouvidoria/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: novoStatus }),
        }).then(res => {
            if (!res.ok) throw new Error('Falha ao atualizar status.');
            return res.json();
        });

        toast.promise(promise, {
            loading: 'Atualizando status...',
            success: (updated) => {
                setSolicitacao(updated);
                return 'Status atualizado com sucesso!';
            },
            error: (err) => err.message,
        });
    };

    if (!solicitacao) return <div>Carregando solicitação...</div>;

    return (
        <>
                <HeaderPainel/>
        <div className="p-8">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
                <ArrowLeft size={16} /> Voltar para a lista
            </button>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border">
                <div className="border-b pb-4 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">{solicitacao.assunto}</h1>
                    <p className="text-sm text-gray-500">Protocolo: {solicitacao.protocolo}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div>
                        <strong className="block text-gray-500">Cidadão:</strong>
                        <p>{solicitacao.nome_cidadao}</p>
                    </div>
                    <div>
                        <strong className="block text-gray-500">Email:</strong>
                        <p>{solicitacao.email_cidadao}</p>
                    </div>
                    <div>
                        <strong className="block text-gray-500">Tipo:</strong>
                        <p className="capitalize">{solicitacao.tipo_manifestacao}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <strong className="block text-gray-500 text-sm">Mensagem:</strong>
                    <p className="mt-2 p-4 bg-gray-50 rounded-lg border">{solicitacao.mensagem}</p>
                </div>

                <div className="mt-8 pt-6 border-t">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Gerenciar Solicitação</h2>
                    <div className="flex items-center gap-4">
                        <select 
                            value={novoStatus} 
                            onChange={(e) => setNovoStatus(e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="aberto">Aberto</option>
                            <option value="em_analise">Em Análise</option>
                            <option value="respondido">Respondido</option>
                            <option value="fechado">Fechado</option>
                        </select>
                        <button 
                            onClick={handleStatusChange} 
                            disabled={novoStatus === solicitacao.status}
                            className="bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50"
                        >
                            Atualizar Status
                        </button>
                    </div>
                </div>
            </div>
        </div>
            </>
    );
};
export default DetalheSolicitacaoPage;