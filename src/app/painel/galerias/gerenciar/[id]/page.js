"use client";
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ArrowLeft, Trash2, ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { HeaderPainel } from '@/components/NavBar/HeaderPainel';

const GerenciarFotosPage = () => {
    const { id: galeriaId } = useParams();
    const router = useRouter();
    const [galeria, setGaleria] = useState(null);
    const { register, handleSubmit, reset } = useForm();

    const fetchGaleria = async () => {
        if (galeriaId) {
            const res = await fetch(`/api/galerias/${galeriaId}`);
            const data = await res.json();
            setGaleria(data);
        }
    };

    useEffect(() => {
        fetchGaleria();
    }, [galeriaId]);

    const handleAddFoto = async (data) => {
        const promise = fetch('/api/fotos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data, galeria_id: parseInt(galeriaId) }),
        }).then(res => { if (!res.ok) throw new Error("Falha ao adicionar foto."); return res.json(); });

        toast.promise(promise, {
            loading: 'Adicionando foto...',
            success: () => {
                reset(); // Limpa o formulário
                fetchGaleria(); // Recarrega a lista de fotos
                return "Foto adicionada com sucesso!";
            },
            error: (err) => err.message,
        });
    };
    
    const handleDeleteFoto = async (fotoId) => {
        if (!confirm("Tem certeza que deseja excluir esta foto?")) return;
        
        await toast.promise(fetch(`/api/fotos/${fotoId}`, { method: 'DELETE' }), {
            loading: 'Excluindo foto...',
            success: () => {
                fetchGaleria(); // Recarrega a lista
                return "Foto excluída!";
            },
            error: "Falha ao excluir."
        });
    };

    if (!galeria) return <div>Carregando galeria...</div>;

    return (
                <>
                    <HeaderPainel/>
        <div className="p-8">
            <button onClick={() => router.push('/painel/galerias')} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6">
                <ArrowLeft size={16} /> Voltar para Galerias
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Gerenciar Fotos: <span className="text-emerald-600">{galeria.titulo}</span></h1>
            
            {/* Formulário para Adicionar Nova Foto */}
            <div className="my-8 p-6 bg-white rounded-xl shadow-sm border">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><ImagePlus size={20}/> Adicionar Nova Foto</h2>
                <form onSubmit={handleSubmit(handleAddFoto)} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div className="md:col-span-2">
                        <label>URL da Imagem</label>
                        <input {...register('caminho_imagem', { required: true })} placeholder="/images/galerias/foto1.jpg" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div>
                        <label>Legenda (Opcional)</label>
                        <input {...register('legenda')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div className="md:col-span-3">
                        <button type="submit" className="bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700">Adicionar à Galeria</button>
                    </div>
                </form>
            </div>

            {/* Grid de Fotos Existentes */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galeria.fotos.map(foto => (
                    <div key={foto.id} className="relative group border rounded-lg overflow-hidden">
                        <Image width={192} height={192} src={foto.caminho_imagem} alt={foto.legenda || 'Foto da galeria'} className="w-full h-48 object-cover" />
                        <div className="absolute bottom-0 left-0 w-full p-2 bg-black bg-opacity-50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                            {foto.legenda}
                        </div>
                        <button onClick={() => handleDeleteFoto(foto.id)} className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-700 transition-all">
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
                </>
    );
};

export default GerenciarFotosPage;