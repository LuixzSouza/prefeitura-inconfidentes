"use client";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const secretariaSchema = z.object({
  nome: z.string().min(5, "O nome da secretaria é obrigatório."),
  sigla: z.string().optional(),
  responsavel_nome: z.string().min(3, "O nome do responsável é obrigatório."),
  responsavel_cargo: z.string().min(3, "O cargo é obrigatório."),
  email: z.string().email("Email inválido.").optional().or(z.literal('')),
  telefone: z.string().optional(),
  endereco: z.string().optional(),
  atribuicoes: z.string().optional(),
});

const SecretariaForm = ({ itemInicial }) => {
    const router = useRouter();
    
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(secretariaSchema),
        defaultValues: itemInicial || { responsavel_cargo: 'Secretário(a) Municipal' }
    });

    const onSubmit = async (data) => {
        const url = itemInicial ? `/api/secretarias/${itemInicial.id}` : '/api/secretarias';
        const method = itemInicial ? 'PUT' : 'POST';

        await toast.promise(
            fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
                .then(res => { if (!res.ok) throw new Error('Falha ao salvar.'); return res.json(); }),
            {
                loading: 'Salvando...',
                success: (saved) => {
                    router.push('/painel/secretarias');
                    router.refresh();
                    return `Secretaria "${saved.nome}" salva com sucesso!`;
                },
                error: (err) => err.message,
            }
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label>Nome da Secretaria</label>
                <input {...register('nome')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                {errors.nome && <p className="text-sm text-red-600">{errors.nome.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label>Nome do Responsável</label>
                    <input {...register('responsavel_nome')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    {errors.responsavel_nome && <p className="text-sm text-red-600">{errors.responsavel_nome.message}</p>}
                </div>
                <div>
                    <label>Cargo do Responsável</label>
                    <input {...register('responsavel_cargo')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    {errors.responsavel_cargo && <p className="text-sm text-red-600">{errors.responsavel_cargo.message}</p>}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label>Email de Contato</label>
                    <input type="email" {...register('email')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                </div>
                <div>
                    <label>Telefone</label>
                    <input {...register('telefone')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
            </div>
            <div>
                <label>Endereço</label>
                <input {...register('endereco')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </div>
            <div>
                <label>Atribuições</label>
                <textarea {...register('atribuicoes')} rows="5" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
            </div>
            <div className="flex justify-end">
                <button type="submit" disabled={isSubmitting} className="bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50">
                    {isSubmitting ? 'Salvando...' : 'Salvar Secretaria'}
                </button>
            </div>
        </form>
    );
};
export default SecretariaForm;