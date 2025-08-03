"use client";

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form'; // 1. Importa o hook principal
import { zodResolver } from '@hookform/resolvers/zod'; // 2. Importa o resolvedor do Zod
import { z } from 'zod'; // 3. Importa o Zod
import toast from 'react-hot-toast'; // 4. Importa o toast

// 5. Define o schema de validação com Zod
const noticiaSchema = z.object({
  titulo: z.string().min(5, { message: "O título deve ter no mínimo 5 caracteres." }),
  subtitulo: z.string().optional(),
  conteudo: z.string().min(20, { message: "O conteúdo é muito curto." }),
  slug: z.string().min(3, { message: "O slug é obrigatório." }),
  status: z.enum(['rascunho', 'publicado']),
  data_publicacao: z.string(),
  // Adicione outros campos conforme necessário, como 'imagem_destaque'
});

// Função para gerar slug (mantida)
const gerarSlug = (texto) => texto.toString().toLowerCase().trim()
  .replace(/\s+/g, '-')
  .replace(/[^\w\-]+/g, '')
  .replace(/\-\-+/g, '-');

const NoticiaForm = ({ noticiaInicial }) => {
  const router = useRouter();

  // 6. Configura o useForm com o resolver do Zod e valores iniciais
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(noticiaSchema),
    defaultValues: {
      titulo: noticiaInicial?.titulo || '',
      subtitulo: noticiaInicial?.subtitulo || '',
      conteudo: noticiaInicial?.conteudo || '',
      slug: noticiaInicial?.slug || '',
      status: noticiaInicial?.status || 'rascunho',
      data_publicacao: noticiaInicial ? new Date(noticiaInicial.data_publicacao).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
    },
  });

  const onSubmit = async (data) => {
    const url = noticiaInicial ? `/api/noticias/${noticiaInicial.id}` : '/api/noticias';
    const method = noticiaInicial ? 'PUT' : 'POST';

    // 7. Usa toast.promise para feedback automático de carregamento, sucesso e erro
    await toast.promise(
      fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }).then(res => {
        if (!res.ok) throw new Error('Falha ao salvar a notícia.');
        return res.json();
      }),
      {
        loading: 'Salvando notícia...',
        success: (savedData) => {
          router.push('/painel/noticias');
          router.refresh(); // Importante para atualizar a lista na página anterior
          return `Notícia "${savedData.titulo}" salva com sucesso!`;
        },
        error: (err) => `Erro: ${err.message}`,
      }
    );
  };

  return (
    // 8. O formulário agora usa o handleSubmit do react-hook-form
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        {/* 9. Conecta os inputs ao form com `register` */}
        <input 
          type="text" 
          {...register('titulo')} 
          onChange={(e) => {
            setValue('titulo', e.target.value);
            setValue('slug', gerarSlug(e.target.value), { shouldValidate: true });
          }}
          className={`mt-1 block w-full rounded-md shadow-sm ${errors.titulo ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500'}`} 
        />
        {/* 10. Exibe a mensagem de erro, se houver */}
        {errors.titulo && <p className="mt-1 text-sm text-red-600">{errors.titulo.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Slug (URL amigável)</label>
        <input type="text" {...register('slug')} className={`mt-1 block w-full rounded-md shadow-sm bg-gray-100 ${errors.slug ? 'border-red-500' : 'border-gray-300'}`} readOnly />
        {errors.slug && <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Conteúdo</label>
        <textarea {...register('conteudo')} rows="10" className={`mt-1 block w-full rounded-md shadow-sm ${errors.conteudo ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-emerald-500 focus:ring-emerald-500'}`}></textarea>
        {errors.conteudo && <p className="mt-1 text-sm text-red-600">{errors.conteudo.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Data de Publicação</label>
          <input type="datetime-local" {...register('data_publicacao')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select {...register('status')} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            <option value="rascunho">Rascunho</option>
            <option value="publicado">Publicado</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        {/* 11. O botão é desabilitado e mostra "Salvando..." durante o envio */}
        <button type="submit" disabled={isSubmitting} className="bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed">
          {isSubmitting ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
};

export default NoticiaForm;