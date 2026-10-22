import Link from 'next/link';
import Image from 'next/image';
import { Newspaper, Calendar } from 'lucide-react';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';
import { getNoticiasPublicadas, formatarData, resumo } from '@/lib/noticias';

export const revalidate = 60;

export const metadata = {
  title: 'Notícias | Prefeitura de Inconfidentes',
  description: 'Acompanhe as últimas notícias da Prefeitura Municipal de Inconfidentes.',
};

const NoticiasPage = async () => {
  const noticias = await getNoticiasPublicadas();

  return (
    <div className="bg-gray-50">
      <Header />
      <main className="w-full max-w-grid mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12">
          <Newspaper size={48} className="mx-auto text-emerald-600 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800">Notícias</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Fique por dentro do que acontece em Inconfidentes.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {noticias.map((noticia) => (
            <Link
              key={noticia.slug}
              href={`/noticias/${noticia.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={noticia.imagem_destaque}
                  alt={noticia.titulo}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-grow flex-col p-5">
                <h2 className="mb-2 text-lg font-bold text-gray-800 group-hover:text-emerald-700">{noticia.titulo}</h2>
                <p className="mb-4 flex-grow text-sm text-gray-600">{resumo(noticia)}</p>
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={16} /> {formatarData(noticia.data_publicacao)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NoticiasPage;
