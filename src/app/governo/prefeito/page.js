import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';

// Ícones para ilustrar as seções e objetivos
import { 
  UserSquare,
  Quote,
  HeartPulse,
  School,
  HandHeart,
  Tractor,
  Palette,
  Factory,
  CheckCircle
} from 'lucide-react';

// --- DADOS DO PREFEITO ---
// Insira o caminho para a foto do prefeito aqui.
// A foto deve estar na pasta /public do seu projeto. Ex: /fotos/prefeito.jpg
const fotoPrefeitoUrl = 'https://inconfidentes.mg.gov.br/wp-content/uploads/2025/01/CNV2024INC00160-1-683x1024.jpg'; // '/fotos/claudinei-tunes-pereira.jpg'

const PrefeitoPage = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* Card Principal do Prefeito */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Coluna da Foto */}
            <div className="md:col-span-4 bg-slate-100 p-8 flex flex-col items-center justify-center">
              <div className="relative w-48 h-48 md:w-56 md:h-56">
                {fotoPrefeitoUrl ? (
                  <Image
                    src={fotoPrefeitoUrl}
                    alt="Foto do Prefeito Claudinei Tunes Pereira"
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
              <h1 className="text-3xl font-bold text-gray-800 mt-6 text-center">Claudinei Tunes Pereira</h1>
              <p className="text-emerald-600 font-semibold text-lg">Prefeito Municipal</p>
            </div>

            {/* Coluna de Informações */}
            <div className="md:col-span-8 p-8 md:p-10 space-y-8">
              
              {/* Citação / Missão */}
              <blockquote className="border-l-4 border-emerald-500 pl-4">
                <p className="text-lg italic text-gray-700">
                  "Compromisso com uma gestão transparente, honesta e planejada, respeitando o orçamento público e garantindo o uso responsável dos recursos para transformar Inconfidentes."
                </p>
              </blockquote>

              {/* Trajetória */}
              <section>
                <h2 className="text-2xl font-bold text-emerald-700 mb-2">Trajetória e Compromisso</h2>
                <p className="text-gray-700 leading-relaxed">
                  Homem trabalhador e dedicado, Claudinei construiu sua trajetória com perseverança. Começou como aprendiz de mecânico e, há 20 anos, comanda sua própria oficina, sendo um exemplo de empreendedorismo. Em 2023, concluiu o Ensino Médio, mostrando que o aprendizado é um processo contínuo. Sua experiência como funcionário público permitiu que entendesse de perto os desafios e as necessidades da administração.
                </p>
              </section>

              {/* Jornada Política */}
               <section>
                <h2 className="text-2xl font-bold text-emerald-700 mb-2">Jornada Política</h2>
                <p className="text-gray-700 leading-relaxed">
                  Sua jornada política começou em 2016, em campanhas com deputados, o que despertou o desejo de fazer mais pela sua comunidade. Após se candidatar em 2020, ele agora reafirma seu compromisso com a população de Inconfidentes, focado em promover uma gestão que fará a diferença na vida de todos.
                </p>
              </section>

              {/* Plano de Gestão */}
              <section>
                <h2 className="text-2xl font-bold text-emerald-700 mb-4">Objetivos da Gestão</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ObjectiveItem icon={<HeartPulse />} text="Saúde pública exemplar" />
                  <ObjectiveItem icon={<School />} text="Educação de qualidade" />
                  <ObjectiveItem icon={<HandHeart />} text="Assistência social justa" />
                  <ObjectiveItem icon={<Tractor />} text="Ampliar a atenção à zona rural" />
                  <ObjectiveItem icon={<Palette />} text="Fomentar cultura, turismo e esporte" />
                  <ObjectiveItem icon={<Factory />} text="Incentivos para indústria e comércio" />
                </ul>
              </section>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};


// --- Componente Auxiliar para Itens de Objetivo ---
const ObjectiveItem = ({ icon, text }) => (
  <li className="flex items-center gap-3">
    <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <span className="text-gray-700 font-medium">{text}</span>
  </li>
);


export default PrefeitoPage;