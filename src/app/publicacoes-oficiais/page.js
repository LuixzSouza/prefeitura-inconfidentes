// app/publicacoes-oficiais/page.js

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';
import { FileText, Gavel, Award, FileBadge } from 'lucide-react';

const tiposDePublicacao = [
  { slug: 'decretos', nome: 'Decretos', descricao: 'Atos administrativos de competência do Prefeito.', icone: <FileText /> },
  { slug: 'leis', nome: 'Leis Municipais', descricao: 'Consulte a legislação sancionada e vigente.', icone: <FileBadge /> },
  { slug: 'licitacoes', nome: 'Licitações', descricao: 'Acompanhe os processos de compras e contratações.', icone: <Gavel /> },
  { slug: 'portarias', nome: 'Portarias', descricao: 'Atos administrativos para disciplinar o funcionamento da administração.', icone: <FileText /> },
  { slug: 'concursos-e-processos-seletivos', nome: 'Concursos e Processos Seletivos', descricao: 'Editais e informações sobre seleção de pessoal.', icone: <Award /> },
  // Adicione outros tipos aqui conforme necessário
];

const PublicacoesHubPage = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-emerald-600">Documentos Públicos</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
            Publicações Oficiais
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Acesse os documentos oficiais da Prefeitura de Inconfidentes. Selecione uma categoria abaixo para iniciar sua consulta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiposDePublicacao.map((tipo) => (
            <Link key={tipo.slug} href={`/publicacoes-oficiais/${tipo.slug}`} className="block bg-white p-6 rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-t-4 border-emerald-500">
              <div className="flex items-center gap-4 mb-2">
                <div className="text-emerald-600">{React.cloneElement(tipo.icone, { size: 32 })}</div>
                <h2 className="text-2xl font-bold text-gray-800">{tipo.nome}</h2>
              </div>
              <p className="text-gray-600">{tipo.descricao}</p>
            </Link>
          ))}
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default PublicacoesHubPage;