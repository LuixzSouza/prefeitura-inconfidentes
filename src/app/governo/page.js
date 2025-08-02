// app/governo/page.js

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';
import { UserCircle, UserCheck, Building } from 'lucide-react';

// Dados para os cards de navegação da seção "O Governo"
const governoSections = [
  {
    title: 'Prefeito',
    description: 'Conheça o chefe do executivo municipal, sua biografia, propostas e informações de contato.',
    href: '/governo/prefeito',
    icon: <UserCircle />
  },
  {
    title: 'Vice-Prefeito',
    description: 'Veja as informações do vice-prefeito, suas atribuições e sua contribuição para a gestão.',
    href: '/governo/vice-prefeito',
    icon: <UserCheck />
  },
  {
    title: 'Secretarias',
    description: 'Navegue pela estrutura administrativa da prefeitura e conheça os secretários responsáveis por cada área.',
    href: '/governo/secretarias',
    icon: <Building />
  }
];

const GovernoHubPage = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-emerald-600">Estrutura do Poder Executivo</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
            O Governo
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Conheça os líderes e a estrutura administrativa que trabalham pelo progresso de Inconfidentes.
          </p>
        </div>

        {/* Grid de Navegação */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {governoSections.map((section) => (
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

export default GovernoHubPage;