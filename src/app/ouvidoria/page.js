// app/ouvidoria/page.js

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/NavBar/Header';
import { Footer } from '@/components/sections/Footer';
import { 
  Megaphone, 
  PlusCircle, 
  FileSearch, 
  User, 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  FileText 
} from 'lucide-react';

const relatedLinks = [
    { text: 'Lei nº 1.571/2025 - Institui a Ouvidoria Geral do Município', url: '#' },
    { text: 'Decreto Nº 2.232, de 10 de julho DE 2025 - Aprova o Regimento Interno da Ouvidoria', url: '#' },
    { text: 'Acompanhar pedido já realizado até 2024', url: '#' },
    { text: 'Acompanhar pedido já realizado até 2023', url: '#' },
];

const OuvidoriaPage = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Cabeçalho da Página */}
        <div className="text-center mb-12">
          <Megaphone size={48} className="mx-auto text-emerald-600 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-800">
            Ouvidoria Municipal
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Para solicitações, denúncias, sugestões, reclamações e elogios, entre em contato conosco ou utilize os canais abaixo.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Coluna Principal de Ações */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">Como podemos ajudar?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card para Abrir Manifestação */}
              <ActionCard 
                href="#" // Substituir pelo link real do sistema de ouvidoria
                icon={<PlusCircle />}
                title="Abrir Manifestação"
                description="Registre uma nova solicitação, denúncia, sugestão, reclamação ou elogio."
              />
              {/* Card para Consultar Manifestação */}
              <ActionCard 
                href="#" // Substituir pelo link real do sistema de ouvidoria
                icon={<FileSearch />}
                title="Consultar Manifestação"
                description="Acompanhe o andamento de um pedido já realizado utilizando seu protocolo."
              />
            </div>
          </div>

          {/* Coluna Lateral de Informações */}
          <aside className="space-y-6">
            {/* Box de Contato */}
            <InfoBox title="Contato da Ouvidoria">
                <InfoItem icon={<User />} label="Responsável" value="Juliana Mariana Cézar de Góes" />
                <InfoItem icon={<MapPin />} label="Endereço" value="Rua Engenheiro Álvares Maciel, 190 – Centro." />
                <InfoItem icon={<Mail />} label="E-mail" value="ouvidoria@inconfidentes.mg.gov.br" href="mailto:ouvidoria@inconfidentes.mg.gov.br" />
                <InfoItem icon={<Phone />} label="Telefone" value="(35) 99848-7025" href="tel:35998487025" />
                <InfoItem icon={<Clock />} label="Horário de Atendimento" value="12:00h às 16:00h" />
            </InfoBox>

            {/* Box de Links Relacionados */}
            <InfoBox title="Links Relacionados">
                {relatedLinks.map(link => (
                    <a key={link.text} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-emerald-700 hover:underline text-sm">
                        <FileText size={16} className="flex-shrink-0 mt-0.5" />
                        <span>{link.text}</span>
                    </a>
                ))}
            </InfoBox>
          </aside>
        </div>

      </main>
      <Footer />
    </div>
  );
};

// --- Sub-componentes para organizar a página ---

const ActionCard = ({ href, icon, title, description }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block bg-white p-6 rounded-xl shadow-md border-t-4 border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="text-emerald-600 mb-3">
            {React.cloneElement(icon, { size: 36 })}
        </div>
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
    </a>
);

const InfoBox = ({ title, children }) => (
    <div className="bg-white p-5 rounded-lg shadow-sm border">
        <h3 className="text-lg font-bold text-gray-800 pb-2 mb-3 border-b">{title}</h3>
        <div className="space-y-3">
            {children}
        </div>
    </div>
);

const InfoItem = ({ icon, label, value, href }) => (
    <div className="flex items-start gap-3 text-sm">
        <div className="text-gray-400 mt-0.5">{React.cloneElement(icon, { size: 16 })}</div>
        <div>
            <p className="font-semibold text-gray-500">{label}</p>
            {href ? (
                <a href={href} className="text-gray-800 hover:text-emerald-600">{value}</a>
            ) : (
                <p className="text-gray-800">{value}</p>
            )}
        </div>
    </div>
);

export default OuvidoriaPage;