"use client";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const diarioOficialSchema = z.object({
  edicao_numero: z.coerce.number().min(1, "O número da edição é obrigatório."),
  data_publicacao: z.string().min(1, "A data é obrigatória."),
  descricao: z.string().optional(),
  caminho_arquivo: z.string().min(1, "O link para o arquivo é obrigatório."),
});

const DiarioOficialForm = ({ edicaoInicial }) => {
    const router = useRouter();
    
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(diarioOficialSchema),
        defaultValues: {
            ...edicaoInicial,
            data_publicacao: edicaoInicial ? new Date(edicaoInicial.data_publicacao).toISOString().split('T')[0] : '',
        }
    });

    const onSubmit = async (data) => {
        const url = edicaoInicial ? `/api/diario-oficial/${edicaoInicial.id}` : '/api/diario-oficial';
        const method = edicaoInicial ? 'PUT' : 'POST';

        await toast.promise(
            fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
                .then(res => { if (!res.ok) throw new Error('Falha ao salvar.'); return res.json(); }),
            {
                loading: 'Salvando...',
                success: () => {
                    router.push('/painel/diario-oficial');
                    router.refresh();
                    return 'Edição salva com sucesso!';
                },
                error: (err) => err.message,
            }
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label>Número da Edição</label>
                    <input type="number" {...register('edicao_numero')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    {errors.edicao_numero && <p className="text-sm text-red-600">{errors.edicao_numero.message}</p>}
                </div>
                <div>
                    <label>Data de Publicação</label>
                    <input type="date" {...register('data_publicacao')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    {errors.data_publicacao && <p className="text-sm text-red-600">{errors.data_publicacao.message}</p>}
                </div>
            </div>
            <div>
                <label>Descrição (Breve resumo do conteúdo)</label>
                <textarea {...register('descricao')} rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
            </div>
            <div>
                <label>Link do Arquivo (PDF)</label>
                <input {...register('caminho_arquivo')} placeholder="/arquivos/diario/edicao-123.pdf" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
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
export default DiarioOficialForm;