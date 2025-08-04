"use client";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const galeriaSchema = z.object({
  titulo: z.string().min(3, "O título é muito curto."),
  descricao: z.string().optional(),
  data_evento: z.string().min(1, "A data do evento é obrigatória."),
});

const GaleriaForm = ({ itemInicial }) => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(galeriaSchema),
        defaultValues: {
            ...itemInicial,
            data_evento: itemInicial ? new Date(itemInicial.data_evento).toISOString().split('T')[0] : '',
        }
    });

    const onSubmit = async (data) => {
        const url = itemInicial ? `/api/galerias/${itemInicial.id}` : '/api/galerias';
        const method = itemInicial ? 'PUT' : 'POST';
        await toast.promise(
            fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
                .then(res => { if (!res.ok) throw new Error('Falha ao salvar.'); return res.json(); }),
            {
                loading: 'Salvando galeria...',
                success: (saved) => {
                    router.push('/painel/galerias');
                    router.refresh();
                    return `Galeria "${saved.titulo}" salva com sucesso!`;
                },
                error: (err) => err.message,
            }
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label>Título da Galeria</label>
                <input {...register('titulo')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                {errors.titulo && <p className="text-sm text-red-600">{errors.titulo.message}</p>}
            </div>
            <div>
                <label>Data do Evento</label>
                <input type="date" {...register('data_evento')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                {errors.data_evento && <p className="text-sm text-red-600">{errors.data_evento.message}</p>}
            </div>
            <div>
                <label>Descrição (Opcional)</label>
                <textarea {...register('descricao')} rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
            </div>
            <div className="flex justify-end">
                <button type="submit" disabled={isSubmitting} className="bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50">
                    {isSubmitting ? 'Salvando...' : 'Salvar Galeria'}
                </button>
            </div>
        </form>
    );
};
export default GaleriaForm;