// app/painel/page.js

import React from 'react';
import Link from 'next/link';
import { 
    LayoutDashboard, Users, FileText, Megaphone, Settings, LogOut, 
    FilePlus, PenSquare, ChevronRight, Newspaper, Building, Briefcase 
} from 'lucide-react';

// Dados simulados para o painel
const stats = [
    { label: 'Publicações Oficiais', value: '58', icon: <Newspaper /> },
    { label: 'Departamentos', value: '12', icon: <Building /> },
    { label: 'Secretarias', value: '3', icon: <Briefcase /> },
    { label: 'Mensagens (Ouvidoria)', value: '7', icon: <Megaphone /> },
];

const managementLinks = {
    municipio: [
        { href: '/municipio/sobre-o-municipio', text: 'Sobre o Município' },
        { href: '/municipio/historia', text: 'História' },
        { href: '/municipio/economia', text: 'Economia' },
        { href: '/municipio/turismo-e-lazer', text: 'Turismo e Lazer' },
    ],
    governo: [
        { href: '/governo/prefeito', text: 'Prefeito' },
        { href: '/governo/vice-prefeito', text: 'Vice-Prefeito' },
        { href: '/governo/secretarias', text: 'Secretarias' },
        { href: '/governo/galeria-prefeitos', text: 'Galeria de Prefeitos' },
    ],
    servicos: [
        { href: '/telefones-uteis', text: 'Telefones Úteis' },
        { href: '/ouvidoria', text: 'Ouvidoria' },
        { href: '/transparencia', text: 'Portal da Transparência' },
    ]
};

const recentActivities = [
    { text: 'Novo Decreto Municipal publicado.', time: 'há 2 horas' },
    { text: 'Página "Economia" foi atualizada.', time: 'há 5 horas' },
    { text: 'Nova licitação adicionada.', time: 'ontem' },
    { text: 'Respondida manifestação da Ouvidoria.', time: 'ontem' },
];

// --- COMPONENTE DA PÁGINA ---
const PainelControlePage = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Topo do Painel */}
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3">
                <div className="flex items-center gap-3">
                    <LayoutDashboard className="text-emerald-600" />
                    <h1 className="text-xl font-bold text-gray-800">Painel Administrativo</h1>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 hidden sm:block">Bem-vindo, **Administrador**</span>
                    <Link href="/" className="p-2 rounded-full hover:bg-gray-200" title="Sair do Painel">
                        <LogOut size={20} className="text-gray-600" />
                    </Link>
                </div>
            </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Seção de Estatísticas */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map(stat => <StatCard key={stat.label} {...stat} />)}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Principal */}
            <div className="lg:col-span-2 space-y-8">
                <ManagementCard title="Gerenciar O Município" links={managementLinks.municipio} />
                <ManagementCard title="Gerenciar O Governo" links={managementLinks.governo} />
                <ManagementCard title="Gerenciar Serviços" links={managementLinks.servicos} />
            </div>

            {/* Coluna Lateral */}
            <aside className="space-y-8">
                {/* Ações Rápidas */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Ações Rápidas</h2>
                    <div className="space-y-3">
                        <QuickAction href="/publicacoes-oficiais" text="Nova Publicação" icon={<FilePlus />} />
                        <QuickAction href="/ouvidoria" text="Ver Mensagens" icon={<Megaphone />} />
                        <QuickAction href="#" text="Gerenciar Usuários" icon={<Users />} />
                    </div>
                </div>
                {/* Atividade Recente */}
                <div className="bg-white p-6 rounded-xl shadow-sm border">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Atividade Recente</h2>
                    <ul className="space-y-3">
                        {recentActivities.map(activity => (
                            <li key={activity.text} className="flex justify-between items-center text-sm">
                                <span className="text-gray-700">{activity.text}</span>
                                <span className="text-gray-400">{activity.time}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </div>
      </main>
    </div>
  );
};

// --- Sub-componentes do Painel ---
const StatCard = ({ icon, label, value }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm border flex items-center gap-4">
        <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full">
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <div>
            <div className="text-3xl font-bold text-gray-800">{value}</div>
            <div className="text-sm text-gray-500">{label}</div>
        </div>
    </div>
);

const ManagementCard = ({ title, links }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h2 className="text-lg font-bold text-gray-800 mb-4">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {links.map(link => (
                <Link key={link.href} href={link.href} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-medium text-gray-700">{link.text}</span>
                    <ChevronRight size={18} className="text-gray-400" />
                </Link>
            ))}
        </div>
    </div>
);

const QuickAction = ({ href, text, icon }) => (
    <Link href={href} className="w-full flex items-center gap-3 p-3 text-white font-semibold bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors">
        {React.cloneElement(icon, { size: 20 })}
        {text}
    </Link>
);


export default PainelControlePage;