import Link from "next/link";
import { Heading_2 } from "../font/Heading_2";
import { ContainerGrid } from "../layout/ContainerGrid";
import { CardNoticedLarge } from "../ui/CardNoticedLarge";
import { CardNoticedMedium } from "../ui/CardNoticedMedium";
import { CardNoticedSmall } from "../ui/CardNoticedSmall";
import { getNoticiasPublicadas, formatarData, resumo } from "@/lib/noticias";

// Converte uma notícia do banco para o formato esperado pelos cards
const toCard = (noticia) => ({
  img: noticia.imagem_destaque,
  title: noticia.titulo,
  text: resumo(noticia),
  date: formatarData(noticia.data_publicacao).toUpperCase(),
  category: 'Notícias',
  href: `/noticias/${noticia.slug}`,
});

export async function S_Noticed() {
  const noticias = (await getNoticiasPublicadas(7)).map(toCard);
  const [destaque, ...demais] = noticias;
  const medias = demais.slice(0, 2);
  const laterais = demais.slice(2);

  if (!destaque) return null;

  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <ContainerGrid>
        <div className="flex justify-between items-center mb-12">
            <Heading_2 title={"Últimas Notícias"} />
            <Link href="/noticias" className="text-sm font-semibold text-green-700 hover:text-green-900 transition-colors">
                Ver todas &rarr;
            </Link>
        </div>

        {/* Layout principal com Grid, responsivo por padrão */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Coluna Principal (2/3 da largura em telas grandes) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <CardNoticedLarge notice={destaque} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {medias.map((notice) => (
                <CardNoticedMedium key={notice.href} notice={notice} />
              ))}
            </div>
          </div>

          {/* Sidebar (1/3 da largura em telas grandes) */}
          {laterais.length > 0 && (
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="font-bold text-xl text-gray-800 mb-6 pb-4 border-b">Mais Notícias</h3>
              <div className="flex flex-col gap-6">
                  {laterais.map((notice) => (
                      <CardNoticedSmall key={notice.href} notice={notice} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </ContainerGrid>
    </section>
  );
}
