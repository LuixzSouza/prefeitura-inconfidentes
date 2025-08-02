import React from 'react';
import Image from 'next/image'; // Importando o componente Image do Next.js
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';

// Ícone para usar como placeholder
import { UserSquare } from 'lucide-react';

// --- DADOS DOS PREFEITOS ---
// Para definir o prefeito atual, adicione 'atual: true'.
// Deixe apenas UM prefeito com essa marcação.
// Para fotos, use o 'fotoUrl'. Se for 'null', um placeholder será exibido.
const dadosPrefeitos = [
  {
    id: 8,
    nome: 'Claudinei Tunes Pereira',
    mandato: '2025 - 2028',
    partido: 'Partido Político', // Exemplo de campo adicional
    fotoUrl: 'https://inconfidentes.mg.gov.br/wp-content/uploads/2025/01/CNV2024INC00160-1-683x1024.jpg', // '/fotos/prefeito-atual.jpg'
    atual: true,
  },
  {
    id: 1,
    nome: 'Nome do Primeiro Prefeito',
    mandato: '19XX - 19XX',
    fotoUrl: null,
  },
  {
    id: 2,
    nome: 'Nome do Segundo Prefeito',
    mandato: '19XX - 19XX',
    fotoUrl: null,
  },
  {
    id: 3,
    nome: 'Nome do Terceiro Prefeito',
    mandato: '19XX - 19XX',
    fotoUrl: null,
  },
  {
    id: 4,
    nome: 'Nome do Quarto Prefeito',
    mandato: '2005 - 2008',
    fotoUrl: null,
  },
  {
    id: 5,
    nome: 'Nome do Quinto Prefeito',
    mandato: '2009 - 2012',
    fotoUrl: null,
  },
  {
    id: 6,
    nome: 'Nome do Sexto Prefeito',
    mandato: '2013 - 2016',
    fotoUrl: null,
  },
  {
    id: 7,
    nome: 'Nome do Sétimo Prefeito',
    mandato: '2017 - 2020',
    fotoUrl: null,
  },
];

// Separando os dados
const prefeitoAtual = dadosPrefeitos.find(p => p.atual);
const exPrefeitos = dadosPrefeitos.filter(p => !p.atual);


const GaleriaPrefeitosPage = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        {/* Título Principal */}
        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-emerald-600">Nossa História de Liderança</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
            Prefeitos de Inconfidentes
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Conheça os líderes que moldaram o progresso e a história de nossa cidade.
          </p>
        </div>

        {/* Seção de Destaque para o Prefeito Atual */}
        {prefeitoAtual && (
          <section className="mb-16 bg-white rounded-2xl shadow-xl p-8 border-t-4 border-emerald-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1 flex justify-center">
                <div className="relative w-48 h-48 md:w-56 md:h-56">
                  {prefeitoAtual.fotoUrl ? (
                    <Image
                      src={prefeitoAtual.fotoUrl}
                      alt={`Foto de ${prefeitoAtual.nome}`}
                      fill // 'fill' faz a imagem preencher o container
                      className="rounded-full object-cover ring-4 ring-emerald-400"
                      sizes="(max-width: 768px) 192px, 224px" // Ajuda o Next a escolher a melhor imagem
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center ring-4 ring-gray-300">
                      <UserSquare size={120} className="text-gray-400" />
                    </div>
                  )}
                </div>
              </div>
              <div className="md:col-span-2 text-center md:text-left">
                <p className="text-emerald-600 font-semibold">Prefeito em Exercício</p>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">{prefeitoAtual.nome}</h2>
                <p className="text-xl text-gray-600 mt-1">{`Mandato: ${prefeitoAtual.mandato}`}</p>
                {prefeitoAtual.partido && <p className="text-lg text-gray-500 mt-2">{`Partido: ${prefeitoAtual.partido}`}</p>}
              </div>
            </div>
          </section>
        )}

        {/* Divisor para a galeria de ex-prefeitos */}
        <div className="text-center my-12">
          <h2 className="text-3xl font-bold text-gray-800">Galeria de Ex-Prefeitos</h2>
          <div className="mt-2 w-24 h-1 bg-emerald-500 mx-auto rounded"></div>
        </div>

        {/* Grade da Galeria de Ex-Prefeitos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {exPrefeitos.map((prefeito) => (
            <PrefeitoCard
              key={prefeito.id}
              nome={prefeito.nome}
              mandato={prefeito.mandato}
              fotoUrl={prefeito.fotoUrl}
            />
          ))}
        </div>

      </main>
      <Footer />
    </div>
  );
};


// --- Componente Auxiliar para o Card do Prefeito (usando next/image) ---
const PrefeitoCard = ({ nome, mandato, fotoUrl }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div className="relative w-36 h-36 mx-auto">
        {fotoUrl ? (
          <Image
            src={fotoUrl}
            alt={`Foto de ${nome}`}
            width={144} // Largura obrigatória para next/image sem 'fill'
            height={144} // Altura obrigatória para next/image sem 'fill'
            className="w-full h-full rounded-full object-cover ring-4 ring-emerald-200"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center ring-4 ring-gray-300">
            <UserSquare size={80} className="text-gray-400" />
          </div>
        )}
      </div>
      <h3 className="mt-4 text-xl font-bold text-gray-800">{nome}</h3>
      <p className="text-emerald-700 font-semibold">{`Mandato: ${mandato}`}</p>
    </div>
  );
};


export default GaleriaPrefeitosPage;