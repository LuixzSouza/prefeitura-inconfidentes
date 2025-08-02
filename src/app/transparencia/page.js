// app/transparencia/page.js

"use client"; // Necessário para a interatividade da busca

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';
import { 
  DollarSign, Scale, Gavel, FileText, Users, Home, Search, BarChart2,
  FileBadge, Shield, Briefcase, Building, HardHat, Car, BookOpen, HandHeart,
  HeartPulse, GraduationCap
} from 'lucide-react';

// --- DADOS DO PORTAL ---
// Todos os links organizados em categorias para fácil manutenção
const portalData = [
  {
    categoria: 'Receitas e Despesas',
    icone: <DollarSign />,
    links: [
      { titulo: 'Receitas Arrecadadas', url: '#' },
      { titulo: 'Despesas (empenhos, liquidações e pagamentos)', url: '#' },
      { titulo: 'Balancete Financeiro', url: '#' },
      { titulo: 'Balanços e Relatórios Anuais', url: '#' },
      { titulo: 'Ordem Cronológica dos Pagamentos', url: '#' },
      { titulo: 'Despesas com Diárias e Passagens', url: '#' },
      { titulo: 'Despesas com Pessoal / Folhas de Pagamento', url: '#' },
      { titulo: 'Gastos com Cartão de Crédito', url: '#' },
      { titulo: 'Lista dos Inscritos em Dívida Ativa', url: '#' },
      { titulo: 'Renúncias de Receita / Renúncias Fiscais', url: '#' },
    ]
  },
  {
    categoria: 'Licitações e Contratos',
    icone: <Gavel />,
    links: [
      { titulo: 'Licitações / Contratos', url: '#' },
      { titulo: 'Compras Diretas (Lei 14.133/21)', url: '#' },
      { titulo: 'Plano de contratações anual', url: '#' },
      { titulo: 'Fiscal de Contrato', url: '#' },
      { titulo: 'Relação dos licitantes/contratados sancionados', url: '#' },
    ]
  },
  {
    categoria: 'Leis e Documentos',
    icone: <FileText />,
    links: [
      { titulo: 'Decretos Municipais', url: '#' },
      { titulo: 'Leis Municipais Vigentes', url: '#' },
      { titulo: 'Lei Orgânica Municipal', url: '#' },
      { titulo: 'Legislação de Pessoal do Município', url: '#' },
      { titulo: 'Documentos e Informações sigilosas', url: '#' },
      { titulo: 'Regulamentação da Concessão de Diárias', url: '#' },
      { titulo: 'Regulamentação da Ouvidoria', url: '#' },
      { titulo: 'Regulamentação da LAI', url: '#' },
    ]
  },
  {
    categoria: 'Planejamento e Gestão',
    icone: <BarChart2 />,
    links: [
      { titulo: 'Planejamento de Contas (LDO, LOA e PPA)', url: '#' },
      { titulo: 'Estrutura Organizacional', url: '#' },
      { titulo: 'Programas e Ações', url: '#' },
      { titulo: 'Plano Estratégico', url: '#' },
      { titulo: 'Projetos e execução de obras públicas', url: '#' },
      { titulo: 'Parecer Prévio / Julgamento de Contas', url: '#' },
      { titulo: 'Relatório Resumido da Execução Orçamentária (RREO)', url: '#' },
      { titulo: 'Relatório de Gestão Fiscal (RGF)', url: '#' },
      { titulo: 'Relatório de Gestão e Atividades', url: '#' },
      { titulo: 'Relatório Circunstanciado', url: '#' },
    ]
  },
  {
    categoria: 'Participação Cidadã',
    icone: <Users />,
    links: [
      { titulo: 'Ouvidoria (Solicitações, denúncias, etc.)', url: '#' },
      { titulo: 'Serviço de Informação ao Cidadão (SIC)', url: '#' },
      { titulo: 'Agenda do Prefeito', url: '#' },
      { titulo: 'Carta de Serviços ao Usuário', url: '#' },
      { titulo: 'Perguntas Frequentes', url: '#' },
      { titulo: 'Pesquisas de Satisfação dos Serviços', url: '#' },
      { titulo: 'Relatório do e-SIC/Ouvidoria e Fale Conosco', url: '#' },
    ]
  },
  {
    categoria: 'Patrimônio Público',
    icone: <Building />,
    links: [
      { titulo: 'Relação do Patrimônio Público (IMÓVEIS)', url: '#' },
      { titulo: 'Relação do Patrimônio Público (MÓVEIS)', url: '#' },
      { titulo: 'Veículos', url: '#' },
    ]
  },
  {
    categoria: 'Legislação Específica',
    icone: <FileBadge />,
    links: [
      { titulo: 'COVID-19 (Ações para enfrentamento)', url: '#' },
      { titulo: 'LGPD (Lei Geral de Proteção de Dados)', url: '#' },
      { titulo: 'Dados Abertos', url: '#' },
      { titulo: 'Radar Nacional de Transparência Pública', url: '#' },
    ]
  },
  {
    categoria: 'Consultas e Áreas',
    icone: <Briefcase />,
    links: [
      { titulo: 'Convênios', url: '#' },
      { titulo: 'Emendas Parlamentares', url: '#' },
      { titulo: 'Consulta – SIF', url: '#' },
      { titulo: 'Consulta – SICOM', url: '#' },
      { titulo: 'Saúde', url: '#' },
      { titulo: 'Educação', url: '#' },
      { titulo: 'Serviços Online', url: '#' },
    ]
  }
];


const TransparenciaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return portalData;
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    
    return portalData.map(category => {
      const filteredLinks = category.links.filter(link => 
        link.titulo.toLowerCase().includes(lowercasedTerm)
      );
      
      // Se a categoria tiver links filtrados, retorna a categoria com esses links
      if (filteredLinks.length > 0) {
        return { ...category, links: filteredLinks };
      }
      // Se o nome da categoria corresponder ao termo de busca, retorna a categoria com todos os links
      if (category.categoria.toLowerCase().includes(lowercasedTerm)) {
          return category;
      }
      
      return null;
    }).filter(Boolean); // Remove categorias que ficaram nulas (sem correspondência)
  }, [searchTerm]);

  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Título e Barra de Busca */}
        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-emerald-600">Acesso à Informação</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
            Portal da Transparência
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Consulte dados, documentos e informações da gestão pública de forma clara e acessível.
          </p>
          <div className="mt-8 max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="O que você procura? Ex: Despesas, Leis, Contratos..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-full shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Grid de Categorias */}
        {filteredData.length > 0 ? (
          <div className="space-y-10">
            {filteredData.map((category) => (
              <CategoryCard key={category.categoria} category={category} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl font-semibold text-gray-700">Nenhum resultado encontrado.</p>
            <p className="text-gray-500 mt-2">Tente um termo de busca diferente.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

// --- Componente do Card de Categoria ---
const CategoryCard = ({ category }) => (
  <section className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
    <header className="flex items-center gap-4 p-4 bg-gray-50 border-b border-gray-200">
      <div className="text-emerald-600">
        {React.cloneElement(category.icone, { size: 24 })}
      </div>
      <h2 className="text-xl font-bold text-gray-800">{category.categoria}</h2>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
      {category.links.map((link) => (
        <a 
          key={link.titulo} 
          href={link.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-4 bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 transition-colors flex items-center"
        >
          {link.titulo}
        </a>
      ))}
    </div>
  </section>
);


export default TransparenciaPage;