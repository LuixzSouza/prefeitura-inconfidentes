"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const servidorSchema = z.object({
  nome: z.string().min(3, "O nome é obrigatório."),
  cargo: z.string().min(3, "O cargo é obrigatório."),
  tipo_vinculo: z.enum(['efetivo', 'comissionado', 'contratado']),
  secretaria_id: z.coerce.number().min(1, "Selecione uma secretaria."),
  data_admissao: z.string().min(1, "A data de admissão é obrigatória."),
});

const ServidorForm = ({ itemInicial }) => {
    const router = useRouter();
    const [secretarias, setSecretarias] = useState([]);
    
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(servidorSchema),
        defaultValues: {
            ...itemInicial,
            data_admissao: itemInicial ? new Date(itemInicial.data_admissao).toISOString().split('T')[0] : '',
        }
    });

    useEffect(() => {
        fetch('/api/secretarias').then(res => res.json()).then(setSecretarias);
    }, []);

    const onSubmit = async (data) => {
        const url = itemInicial ? `/api/servidores/${itemInicial.id}` : '/api/servidores';
        const method = itemInicial ? 'PUT' : 'POST';

        await toast.promise(
            fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
                .then(res => { if (!res.ok) throw new Error('Falha ao salvar.'); return res.json(); }),
            {
                loading: 'Salvando...',
                success: (saved) => {
                    router.push('/painel/servidores');
                    router.refresh();
                    return `Servidor "${saved.nome}" salvo com sucesso!`;
                },
                error: (err) => err.message,
            }
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label>Nome Completo do Servidor</label>
                <input {...register('nome')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                {errors.nome && <p className="text-sm text-red-600">{errors.nome.message}</p>}
            </div>
            <div>
                <label>Cargo</label>
                <input {...register('cargo')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                {errors.cargo && <p className="text-sm text-red-600">{errors.cargo.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label>Tipo de Vínculo</label>
                    <select {...register('tipo_vinculo')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        <option value="efetivo">Efetivo</option>
                        <option value="comissionado">Comissionado</option>
                        <option value="contratado">Contratado</option>
                    </select>
                </div>
                <div>
                    <label>Secretaria</label>
                    <select {...register('secretaria_id')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                        <option value="">Selecione...</option>
                        {secretarias.map(s => <option key={s.id} value={s.id}>{s.nome}</option>)}
                    </select>
                    {errors.secretaria_id && <p className="text-sm text-red-600">{errors.secretaria_id.message}</p>}
                </div>
                <div>
                    <label>Data de Admissão</label>
                    <input type="date" {...register('data_admissao')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    {errors.data_admissao && <p className="text-sm text-red-600">{errors.data_admissao.message}</p>}
                </div>
            </div>
            <div className="flex justify-end">
                <button type="submit" disabled={isSubmitting} className="bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50">
                    {isSubmitting ? 'Salvando...' : 'Salvar Servidor'}
                </button>
            </div>
        </form>
    );
};
export default ServidorForm;