import prisma from '@/lib/prisma';
import { noticiasDemo } from '@/data/noticiasDemo';

const camposPublicos = {
  slug: true,
  titulo: true,
  subtitulo: true,
  conteudo: true,
  imagem_destaque: true,
  data_publicacao: true,
};

const filtroPublicadas = () => ({
  status: 'publicado',
  data_publicacao: { lte: new Date() },
});

// Lista notícias publicadas. Se o banco estiver vazio ou indisponível,
// usa as notícias de demonstração para o portal nunca ficar em branco.
export async function getNoticiasPublicadas(limite) {
  try {
    const noticias = await prisma.noticias.findMany({
      where: filtroPublicadas(),
      orderBy: { data_publicacao: 'desc' },
      select: camposPublicos,
      ...(limite ? { take: limite } : {}),
    });
    if (noticias.length > 0) return noticias;
  } catch (error) {
    console.error('[NOTICIAS] Banco indisponível, usando dados de demonstração.', error.message);
  }
  return limite ? noticiasDemo.slice(0, limite) : noticiasDemo;
}

export async function getNoticiaPorSlug(slug) {
  try {
    const noticia = await prisma.noticias.findFirst({
      where: { slug, ...filtroPublicadas() },
      select: camposPublicos,
    });
    if (noticia) return noticia;
  } catch (error) {
    console.error('[NOTICIAS] Banco indisponível, usando dados de demonstração.', error.message);
  }
  return noticiasDemo.find((n) => n.slug === slug) ?? null;
}

export const formatarData = (data) =>
  new Date(data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

export const resumo = (noticia, tamanho = 140) => {
  const texto = noticia.subtitulo || noticia.conteudo || '';
  return texto.length > tamanho ? `${texto.slice(0, tamanho).trimEnd()}...` : texto;
};
