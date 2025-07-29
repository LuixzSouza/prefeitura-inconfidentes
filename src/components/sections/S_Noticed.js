import { Heading_2 } from "../font/Heading_2";
import { ContainerGrid } from "../layout/ContainerGrid";
import { CardNoticedLarge } from "../ui/CardNoticedLarge";
import { CardNoticedMedium } from "../ui/CardNoticedMedium";
import { CardNoticedSmall } from "../ui/CardNoticedSmall";

// Dados das notícias para um código mais limpo e gerenciável
const mainNews = [
  {
    type: 'large',
    img: 'https://inconfidentes.mg.gov.br/wp-content/uploads/2025/06/NOTA-DE-ALERTA-14-pdf.jpg',
    title: 'Prefeitura de Inconfidentes abre vaga para Fonoaudiólogo(a)',
    text: 'A Prefeitura Municipal de Inconfidentes, por meio da Secretaria Municipal de Saúde, está em busca de profissionais...',
    date: '25 DE JUNHO, 2025',
    category: 'Saúde',
    href: '#'
  },
  {
    type: 'medium',
    img: 'https://inconfidentes.mg.gov.br/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-25-at-14.59.18.jpeg',
    title: 'Edital para concessão da Lanchonete da Rodoviária é publicado',
    text: 'A Prefeitura informa que está aberto o Edital de Concorrência Pública nº 001/2025, referente à concessão onerosa...',
    date: '25 DE JUNHO, 2025',
    category: 'Editais',
    href: '#'
  },
  {
    type: 'medium',
    img: 'https://inconfidentes.mg.gov.br/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-25-at-14.59.08.jpeg',
    title: 'Aberto edital para concessão da Lanchonete da Cancha de Bocha',
    text: 'A Prefeitura informa que está aberto o Edital de Concorrência Pública nº 002/2025, para a concessão onerosa...',
    date: '25 DE JUNHO, 2025',
    category: 'Editais',
    href: '#'
  }
];

const sidebarNews = [
  {
    img: '/images/noticeds/noticed-1.png',
    title: '1º Concurso de Cafés Especiais valoriza produtores e promove cultura local',
    href: '#'
  },
  {
    img: 'https://inconfidentes.mg.gov.br/wp-content/uploads/2025/06/NOTA-DE-ALERTA-12-pdf-1024x576.jpg',
    title: '1ª Tratorada de Inconfidentes é um sucesso e marca história no agronegócio local',
    href: '#'
  },
  {
    img: 'https://inconfidentes.mg.gov.br/wp-content/uploads/2025/06/NOTA-DE-ALERTA-pdf-1024x576.jpg',
    title: 'IPTU 2025 vence em 10 de julho! Contribua com o desenvolvimento de Inconfidentes',
    href: '#'
  },
  {
    img: 'https://inconfidentes.mg.gov.br/wp-content/uploads/2025/06/NOTA-DE-ALERTA-11-pdf-1024x576.jpg',
    title: 'Save the Date: 1º Seminário de Empreendedorismo e Inovação acontece em 1º de julho',
    href: '#'
  }
];

export function S_Noticed() {
  return (
    <section className="bg-gray-50 py-20 md:py-28">
      <ContainerGrid>
        <div className="flex justify-between items-center mb-12">
            <Heading_2 title={"Últimas Notícias"} />
            <a href="#" className="text-sm font-semibold text-green-700 hover:text-green-900 transition-colors">
                Ver todas &rarr;
            </a>
        </div>
        
        {/* Layout principal com Grid, responsivo por padrão */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Coluna Principal (2/3 da largura em telas grandes) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <CardNoticedLarge notice={mainNews[0]} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <CardNoticedMedium notice={mainNews[1]} />
              <CardNoticedMedium notice={mainNews[2]} />
            </div>
          </div>

          {/* Sidebar (1/3 da largura em telas grandes) */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-xl text-gray-800 mb-6 pb-4 border-b">Mais Lidas</h3>
            <div className="flex flex-col gap-6">
                {sidebarNews.map((notice, index) => (
                    <CardNoticedSmall key={index} notice={notice} />
                ))}
            </div>
          </div>
        </div>
      </ContainerGrid>
    </section>
  );
}