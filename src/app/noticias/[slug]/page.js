import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';
import { getNoticiaPorSlug, getNoticiasPublicadas, formatarData, resumo } from '@/lib/noticias';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const noticia = await getNoticiaPorSlug((await params).slug);
  if (!noticia) return { title: 'Notícia não encontrada' };
  return {
    title: `${noticia.titulo} | Prefeitura de Inconfidentes`,
    description: resumo(noticia, 160),
    openGraph: { images: [noticia.imagem_destaque] },
  };
}

const NoticiaPage = async ({ params }) => {
  const { slug } = await params;
  const noticia = await getNoticiaPorSlug(slug);
  if (!noticia) notFound();

  const outras = (await getNoticiasPublicadas(4)).filter((n) => n.slug !== slug).slice(0, 3);

  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <article className="mx-auto max-w-3xl">
          <Link href="/noticias" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline">
            <ArrowLeft size={16} /> Todas as notícias
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-800">{noticia.titulo}</h1>
          {noticia.subtitulo && <p className="mt-3 text-lg text-gray-600">{noticia.subtitulo}</p>}
          <p className="mt-4 flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={16} /> {formatarData(noticia.data_publicacao)}
          </p>

          <div className="relative my-8 aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
            <Image src={noticia.imagem_destaque} alt={noticia.titulo} fill priority sizes="(min-width: 768px) 768px, 100vw" className="object-cover" />
          </div>

          <div className="space-y-4 text-lg leading-relaxed text-gray-700">
            {noticia.conteudo.split(/\n{2,}/).map((paragrafo, i) => (
              <p key={i} className="whitespace-pre-line">{paragrafo}</p>
            ))}
          </div>
        </article>

        {outras.length > 0 && (
          <section className="mx-auto mt-16 max-w-5xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Leia também</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {outras.map((n) => (
                <Link key={n.slug} href={`/noticias/${n.slug}`} className="group overflow-hidden rounded-xl bg-white shadow-md transition hover:shadow-xl">
                  <div className="relative h-36 w-full overflow-hidden">
                    <Image src={n.imagem_destaque} alt={n.titulo} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="p-4 text-sm font-semibold text-gray-800 group-hover:text-emerald-700">{n.titulo}</h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default NoticiaPage;
