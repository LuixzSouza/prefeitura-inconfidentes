"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

// Schema de validação com Zod
const licitacaoSchema = z.object({
  numero: z.string().min(1, "O número é obrigatório."),
  modalidade: z.string().min(1, "A modalidade é obrigatória."),
  objeto: z.string().min(10, "O objeto deve ser mais detalhado."),
  data_abertura: z.string().min(1, "A data de abertura é obrigatória."),
  status: z.enum(['aberta', 'em_andamento', 'finalizada', 'suspensa', 'cancelada']),
  secretaria_id: z.coerce.number().min(1, "Selecione uma secretaria."),
});

const LicitacaoForm = ({ licitacaoInicial }) => {
    const router = useRouter();
    const [secretarias, setSecretarias] = useState([]);
    
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(licitacaoSchema),
        defaultValues: {
            ...licitacaoInicial,
            data_abertura: licitacaoInicial ? new Date(licitacaoInicial.data_abertura).toISOString().slice(0, 16) : '',
        }
    });

    // Busca a lista de secretarias para preencher o dropdown
    useEffect(() => {
        fetch('/api/secretarias').then(res => res.json()).then(setSecretarias);
    }, []);

    const onSubmit = async (data) => {
        const url = licitacaoInicial ? `/api/licitacoes/${licitacaoInicial.id}` : '/api/licitacoes';
        const method = licitacaoInicial ? 'PUT' : 'POST';

        await toast.promise(
            fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
                .then(res => { if (!res.ok) throw new Error('Falha ao salvar.'); return res.json(); }),
            {
                loading: 'Salvando...',
                success: () => {
                    router.push('/painel/licitacoes');
                    router.refresh();
                    return 'Licitação salva com sucesso!';
                },
                error: (err) => err.message,
            }
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label>Número</label>
                <input {...register('numero')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                {errors.numero && <p className="text-sm text-red-600">{errors.numero.message}</p>}
            </div>
            <div>
                <label>Modalidade</label>
                <input {...register('modalidade')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                {errors.modalidade && <p className="text-sm text-red-600">{errors.modalidade.message}</p>}
            </div>
            <div>
                <label>Objeto</label>
                <textarea {...register('objeto')} rows="5" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                {errors.objeto && <p className="text-sm text-red-600">{errors.objeto.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label>Data de Abertura</label>
                    <input type="datetime-local" {...register('data_abertura')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    {errors.data_abertura && <p className="text-sm text-red-600">{errors.data_abertura.message}</p>}
                </div>
                <div>
                    <label>Status</label>
                    <select {...register('status')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        <option value="aberta">Aberta</option>
                        <option value="em_andamento">Em Andamento</option>
                        <option value="finalizada">Finalizada</option>
                        <option value="suspensa">Suspensa</option>
                        <option value="cancelada">Cancelada</option>
                    </select>
                </div>
                <div>
                    <label>Secretaria Responsável</label>
                    <select {...register('secretaria_id')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        <option value="">Selecione...</option>
                        {secretarias.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
                    </select>
                    {errors.secretaria_id && <p className="text-sm text-red-600">{errors.secretaria_id.message}</p>}
                </div>
            </div>
            <div className="flex justify-end">
                <button type="submit" disabled={isSubmitting} className="bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50">
                    {isSubmitting ? 'Salvando...' : 'Salvar'}
                </button>
            </div>
        </form>
    );
};

export default LicitacaoForm;