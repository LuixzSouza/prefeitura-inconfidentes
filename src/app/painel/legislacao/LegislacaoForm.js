"use client";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const legislacaoSchema = z.object({
  tipo: z.enum(['lei', 'decreto', 'portaria', 'resolucao']),
  numero: z.coerce.number().min(1, "O número é obrigatório."),
  ano: z.coerce.number().min(1900, "Ano inválido.").max(new Date().getFullYear() + 1, "Ano inválido."),
  data_sancao: z.string().min(1, "A data é obrigatória."),
  ementa: z.string().min(10, "A ementa é muito curta."),
  caminho_arquivo: z.string().min(1, "O link para o arquivo é obrigatório."),
  status: z.enum(['em_vigor', 'revogada']),
});

const LegislacaoForm = ({ itemInicial }) => {
    const router = useRouter();
    
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(legislacaoSchema),
        defaultValues: {
            ...itemInicial,
            data_sancao: itemInicial ? new Date(itemInicial.data_sancao).toISOString().split('T')[0] : '',
        }
    });

    const onSubmit = async (data) => {
        const url = itemInicial ? `/api/legislacao/${itemInicial.id}` : '/api/legislacao';
        const method = itemInicial ? 'PUT' : 'POST';

        await toast.promise(
            fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
                .then(res => { if (!res.ok) throw new Error('Falha ao salvar.'); return res.json(); }),
            {
                loading: 'Salvando...',
                success: () => {
                    router.push('/painel/legislacao');
                    router.refresh();
                    return 'Item salvo com sucesso!';
                },
                error: (err) => err.message,
            }
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label>Tipo</label>
                    <select {...register('tipo')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        <option value="lei">Lei</option>
                        <option value="decreto">Decreto</option>
                        <option value="portaria">Portaria</option>
                        <option value="resolucao">Resolução</option>
                    </select>
                </div>
                 <div>
                    <label>Número</label>
                    <input type="number" {...register('numero')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    {errors.numero && <p className="text-sm text-red-600">{errors.numero.message}</p>}
                </div>
                 <div>
                    <label>Ano</label>
                    <input type="number" {...register('ano')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    {errors.ano && <p className="text-sm text-red-600">{errors.ano.message}</p>}
                </div>
            </div>
            <div>
                <label>Ementa (Resumo)</label>
                <textarea {...register('ementa')} rows="5" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                {errors.ementa && <p className="text-sm text-red-600">{errors.ementa.message}</p>}
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label>Data de Sanção/Publicação</label>
                    <input type="date" {...register('data_sancao')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    {errors.data_sancao && <p className="text-sm text-red-600">{errors.data_sancao.message}</p>}
                </div>
                <div>
                    <label>Status</label>
                    <select {...register('status')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        <option value="em_vigor">Em Vigor</option>
                        <option value="revogada">Revogada</option>
                    </select>
                </div>
            </div>
            <div>
                <label>Link do Arquivo (PDF)</label>
                <input {...register('caminho_arquivo')} placeholder="/arquivos/leis/lei_1234.pdf" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                {errors.caminho_arquivo && <p className="text-sm text-red-600">{errors.caminho_arquivo.message}</p>}
            </div>
            <div className="flex justify-end">
                <button type="submit" disabled={isSubmitting} className="bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50">
                    {isSubmitting ? 'Salvando...' : 'Salvar'}
                </button>
            </div>
        </form>
    );
};
export default LegislacaoForm;