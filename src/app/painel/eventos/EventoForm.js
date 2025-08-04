"use client";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const eventoSchema = z.object({
  titulo: z.string().min(3, "O título é muito curto."),
  descricao: z.string().min(10, "A descrição é muito curta."),
  local: z.string().min(3, "O local é obrigatório."),
  data_inicio: z.string().min(1, "A data de início é obrigatória."),
  data_fim: z.string().optional(),
  imagem_divulgacao: z.string().optional(),
});

const EventoForm = ({ eventoInicial }) => {
    const router = useRouter();
    
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(eventoSchema),
        defaultValues: {
            ...eventoInicial,
            data_inicio: eventoInicial ? new Date(eventoInicial.data_inicio).toISOString().slice(0, 16) : '',
            data_fim: eventoInicial?.data_fim ? new Date(eventoInicial.data_fim).toISOString().slice(0, 16) : '',
        }
    });

    const onSubmit = async (data) => {
        // Converte as datas para o formato ISO antes de enviar
        const payload = {
            ...data,
            data_inicio: new Date(data.data_inicio).toISOString(),
            data_fim: data.data_fim ? new Date(data.data_fim).toISOString() : null,
        };

        const url = eventoInicial ? `/api/eventos/${eventoInicial.id}` : '/api/eventos';
        const method = eventoInicial ? 'PUT' : 'POST';

        await toast.promise(
            fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
                .then(res => { if (!res.ok) throw new Error('Falha ao salvar.'); return res.json(); }),
            {
                loading: 'Salvando evento...',
                success: (saved) => {
                    router.push('/painel/eventos');
                    router.refresh();
                    return `Evento "${saved.titulo}" salvo com sucesso!`;
                },
                error: (err) => err.message,
            }
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label>Título do Evento</label>
                <input {...register('titulo')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                {errors.titulo && <p className="text-sm text-red-600">{errors.titulo.message}</p>}
            </div>
            <div>
                <label>Descrição</label>
                <textarea {...register('descricao')} rows="5" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                {errors.descricao && <p className="text-sm text-red-600">{errors.descricao.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label>Data e Hora de Início</label>
                    <input type="datetime-local" {...register('data_inicio')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    {errors.data_inicio && <p className="text-sm text-red-600">{errors.data_inicio.message}</p>}
                </div>
                <div>
                    <label>Data e Hora de Fim (Opcional)</label>
                    <input type="datetime-local" {...register('data_fim')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
            </div>
            <div>
                <label>Local</label>
                <input {...register('local')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                {errors.local && <p className="text-sm text-red-600">{errors.local.message}</p>}
            </div>
            <div>
                <label>Link da Imagem de Divulgação (Opcional)</label>
                <input {...register('imagem_divulgacao')} placeholder="/images/eventos/festa.jpg" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div className="flex justify-end">
                <button type="submit" disabled={isSubmitting} className="bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50">
                    {isSubmitting ? 'Salvando...' : 'Salvar Evento'}
                </button>
            </div>
        </form>
    );
};
export default EventoForm;