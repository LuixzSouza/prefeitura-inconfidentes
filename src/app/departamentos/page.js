// app/departamentos/page.js

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';
import { departamentosData } from '@/data/departamentosData'; // Atualize o caminho se necessário

const DepartamentosListPage = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-emerald-600">Nossa Estrutura</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
            Departamentos Municipais
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Conheça as áreas que compõem a administração e trabalham diariamente para atender à população de Inconfidentes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {departamentosData.map((depto) => (
            // A correção foi feita aqui: a propriedade legacyBehavior foi removida
            <Link key={depto.slug} href={`/departamentos/${depto.slug}`}>
              <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center text-center border-b-4 border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                <div className="text-emerald-600 mb-3">{React.cloneElement(depto.icone, { size: 40 })}</div>
                <h2 className="text-lg font-bold text-gray-800">{depto.nome}</h2>
              </div>
            </Link>
          ))}
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default DepartamentosListPage;