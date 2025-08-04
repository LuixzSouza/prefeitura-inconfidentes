"use client";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const concursoSchema = z.object({
  titulo: z.string().min(5, "O título é obrigatório."),
  numero: z.string().min(1, "O número é obrigatório."),
  ano: z.coerce.number().min(1900).max(new Date().getFullYear() + 1),
  descricao: z.string().optional(),
  data_abertura: z.string().min(1, "A data de abertura é obrigatória."),
  status: z.enum(['aberto', 'em_andamento', 'finalizado', 'cancelado']),
  caminho_edital: z.string().min(1, "O link para o edital é obrigatório."),
});

const ConcursoForm = ({ itemInicial }) => {
    const router = useRouter();
    
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(concursoSchema),
        defaultValues: {
            ...itemInicial,
            data_abertura: itemInicial ? new Date(itemInicial.data_abertura).toISOString().slice(0, 16) : '',
        }
    });

    const onSubmit = async (data) => {
        const url = itemInicial ? `/api/concursos/${itemInicial.id}` : '/api/concursos';
        const method = itemInicial ? 'PUT' : 'POST';

        await toast.promise(
            fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
                .then(res => { if (!res.ok) throw new Error('Falha ao salvar.'); return res.json(); }),
            {
                loading: 'Salvando...',
                success: () => {
                    router.push('/painel/concursos');
                    router.refresh();
                    return 'Item salvo com sucesso!';
                },
                error: (err) => err.message,
            }
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label>Título</label>
                <input {...register('titulo')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                {errors.titulo && <p className="text-sm text-red-600">{errors.titulo.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label>Número</label>
                    <input {...register('numero')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    {errors.numero && <p className="text-sm text-red-600">{errors.numero.message}</p>}
                </div>
                <div>
                    <label>Ano</label>
                    <input type="number" {...register('ano')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    {errors.ano && <p className="text-sm text-red-600">{errors.ano.message}</p>}
                </div>
            </div>
            <div>
                <label>Descrição</label>
                <textarea {...register('descricao')} rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label>Data de Abertura</label>
                    <input type="datetime-local" {...register('data_abertura')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    {errors.data_abertura && <p className="text-sm text-red-600">{errors.data_abertura.message}</p>}
                </div>
                <div>
                    <label>Status</label>
                    <select {...register('status')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        <option value="aberto">Aberto</option>
                        <option value="em_andamento">Em Andamento</option>
                        <option value="finalizado">Finalizado</option>
                        <option value="cancelado">Cancelado</option>
                    </select>
                </div>
            </div>
            <div>
                <label>Link do Edital (PDF)</label>
                <input {...register('caminho_edital')} placeholder="/arquivos/editais/concurso-001.pdf" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                {errors.caminho_edital && <p className="text-sm text-red-600">{errors.caminho_edital.message}</p>}
            </div>
            <div className="flex justify-end">
                <button type="submit" disabled={isSubmitting} className="bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50">
                    {isSubmitting ? 'Salvando...' : 'Salvar'}
                </button>
            </div>
        </form>
    );
};
export default ConcursoForm;