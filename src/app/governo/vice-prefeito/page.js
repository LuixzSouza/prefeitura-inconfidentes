import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';

// Ícones para ilustrar as seções e competências
import { 
  UserSquare,
  Scale,
  BedDouble,
  Briefcase,
  Building2,
  Quote
} from 'lucide-react';

// --- DADOS DO VICE-PREFEITO ---
// Insira o caminho para a foto do vice-prefeito aqui.
// A foto deve estar na pasta /public do seu projeto. Ex: /fotos/vice-prefeito.jpg
const fotoVicePrefeitoUrl = 'https://inconfidentes.mg.gov.br/wp-content/uploads/2025/01/CNV2024INC00224-683x1024.jpg'; // '/fotos/decio-bonamichi-junior.jpg'

const VicePrefeitoPage = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* Card Principal do Vice-Prefeito */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Coluna da Foto */}
            <div className="md:col-span-4 bg-slate-100 p-8 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 md:w-56 md:h-56">
                {fotoVicePrefeitoUrl ? (
                  <Image
                    src={fotoVicePrefeitoUrl}
                    alt="Foto do Vice-Prefeito Décio Bonamichi Júnior"
                    fill
                    className="rounded-full object-cover ring-4 ring-white shadow-lg"
                    sizes="(max-width: 768px) 192px, 224px"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center ring-4 ring-gray-400/50">
                    <UserSquare size={120} className="text-gray-500" />
                  </div>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mt-6 text-center">Décio Bonamichi Júnior</h1>
              <p className="text-emerald-600 font-semibold text-lg">Vice-Prefeito Municipal</p>
            </div>

            {/* Coluna de Informações */}
            <div className="md:col-span-8 p-8 md:p-10 space-y-8">
              
              {/* Citação / Missão */}
              <blockquote className="border-l-4 border-emerald-500 pl-4">
                <p className="text-lg italic text-gray-700">
                  `&quot;`Comprometido com o progresso, trago uma visão inovadora e prática, unindo expertise jurídica e empresarial para impulsionar Inconfidentes rumo a um futuro próspero.`&quot;`
                </p>
              </blockquote>

              {/* Formação e Trajetória */}
              <section>
                <h2 className="text-2xl font-bold text-emerald-700 mb-3">Formação e Trajetória</h2>
                <div className="space-y-4">
                  <InfoItem 
                    icon={<Scale />} 
                    title="Experiência Jurídica" 
                    text="Formado em Direito pela Unifenas, atuou no Fórum de Alfenas e em renomado escritório de advocacia, onde desenvolveu sólida experiência na área." 
                  />
                  <InfoItem 
                    icon={<BedDouble />} 
                    title="Empreendedorismo e Turismo" 
                    text="Desde 2021, é proprietário da Pousada do Juninho, localizada no Caminho da Fé, fortalecendo a hospitalidade e o turismo na cidade." 
                  />
                </div>
              </section>

              {/* Atuação na Gestão */}
              <section>
                <h2 className="text-2xl font-bold text-emerald-700 mb-3">Atuação na Gestão Pública</h2>
                <div className="bg-emerald-50/70 border-l-4 border-emerald-400 p-4 rounded-r-lg">
                  <p className="text-gray-800">
                    Atualmente, acumula a função de <strong className="text-emerald-800">Vice-Prefeito</strong> com o cargo de <strong className="text-emerald-800">Chefe do Departamento Municipal de Indústria, Comércio, Cultura e Turismo</strong>, trabalhando diretamente para fomentar o desenvolvimento econômico e valorizar a identidade cultural de Inconfidentes.
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};


// --- Componente Auxiliar para Itens de Informação ---
const InfoItem = ({ icon, title, text }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 text-emerald-600 mt-1">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <h3 className="font-bold text-lg text-gray-800">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{text}</p>
    </div>
  </div>
);


export default VicePrefeitoPage;