// app/municipio/page.js

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';
import { 
  Info, 
  Briefcase, 
  Users, 
  Landmark, 
  Map, 
  Phone 
} from 'lucide-react';

// Dados para os cards de navegação da seção
const municipioSections = [
  {
    title: 'Sobre o Município',
    description: 'Conheça os dados gerais, geografia, relevo e a caracterização física da nossa cidade.',
    href: '/municipio/sobre-o-municipio',
    icon: <Info />
  },
  {
    title: 'Economia',
    description: 'Explore os pilares econômicos, a indústria, o comércio e o agronegócio que movem Inconfidentes.',
    href: '/municipio/economia',
    icon: <Briefcase />
  },
  {
    title: 'Galeria de Prefeitos',
    description: 'Honre a história de liderança do município e conheça os prefeitos que passaram pela nossa cidade.',
    href: '/municipio/galeria-prefeitos',
    icon: <Users />
  },
  {
    title: 'História',
    description: 'Viaje no tempo com a linha do tempo interativa dos principais marcos históricos de Inconfidentes.',
    href: '/municipio/historia',
    icon: <Landmark />
  },
  {
    title: 'Turismo e Lazer',
    description: 'Descubra os pontos turísticos, a gastronomia e os famosos caminhos de peregrinação.',
    href: '/municipio/turismo-e-lazer',
    icon: <Map />
  },
  {
    title: 'Telefones Úteis',
    description: 'Acesse uma lista completa de contatos de emergência, saúde e serviços municipais.',
    href: '/municipio/telefones-uteis',
    icon: <Phone />
  }
];

const MunicipioHubPage = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-emerald-600">Conheça Inconfidentes</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
            O Município
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Navegue pelas seções abaixo para descobrir tudo sobre nossa história, cultura, economia e os serviços disponíveis para você.
          </p>
        </div>

        {/* Grid de Navegação */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {municipioSections.map((section) => (
            <Link 
              key={section.title} 
              href={section.href}
              className="group block bg-white p-6 rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-emerald-500"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="text-emerald-600 bg-emerald-100 p-3 rounded-full group-hover:scale-110 transition-transform">
                  {React.cloneElement(section.icon, { size: 28 })}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
              </div>
              <p className="text-gray-600">{section.description}</p>
            </Link>
          ))}
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default MunicipioHubPage;