"use client";
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const paginaSchema = z.object({
  titulo: z.string().min(3, "O título é muito curto."),
  slug: z.string().min(3, "O slug (URL) é muito curto."),
  conteudo: z.string().min(10, "O conteúdo é obrigatório."),
});

const gerarSlug = (texto) => texto.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');

const PaginaForm = ({ paginaInicial }) => {
    const router = useRouter();
    
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(paginaSchema),
        defaultValues: paginaInicial || { titulo: '', slug: '', conteudo: '' }
    });

    const onSubmit = async (data) => {
        const url = paginaInicial ? `/api/paginas/${paginaInicial.id}` : '/api/paginas';
        const method = paginaInicial ? 'PUT' : 'POST';

        await toast.promise(
            fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
                .then(res => { if (!res.ok) throw new Error('Falha ao salvar.'); return res.json(); }),
            {
                loading: 'Salvando página...',
                success: (saved) => {
                    router.push('/painel/paginas');
                    router.refresh();
                    return `Página "${saved.titulo}" salva com sucesso!`;
                },
                error: (err) => err.message,
            }
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label>Título da Página</label>
                <input 
                    {...register('titulo')} 
                    onChange={(e) => {
                        setValue('titulo', e.target.value);
                        setValue('slug', gerarSlug(e.target.value), { shouldValidate: true });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" 
                />
                {errors.titulo && <p className="text-sm text-red-600">{errors.titulo.message}</p>}
            </div>
            <div>
                <label>URL Amigável (slug)</label>
                <input {...register('slug')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100" />
                {errors.slug && <p className="text-sm text-red-600">{errors.slug.message}</p>}
            </div>
            <div>
                <label>Conteúdo</label>
                <textarea {...register('conteudo')} rows="15" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                {errors.conteudo && <p className="text-sm text-red-600">{errors.conteudo.message}</p>}
                <p className="text-xs text-gray-500 mt-1">Dica: Você pode usar tags HTML básicas aqui, como `&lt;h1&gt;`, `&lt;p&gt;`, `&lt;b&gt;`.</p>
            </div>
            <div className="flex justify-end">
                <button type="submit" disabled={isSubmitting} className="bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:opacity-50">
                    {isSubmitting ? 'Salvando...' : 'Salvar Página'}
                </button>
            </div>
        </form>
    );
};
export default PaginaForm;