"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
    LayoutDashboard, Users, Newspaper, Building, Briefcase, Megaphone, LogOut,
    FilePlus, ChevronRight, PenSquare, Wrench,
    Gavel,
    FileBadge,
    FileBadge2,
    BookOpen,
    Award,
    UserSquare,
    Camera
} from 'lucide-react';
import { Header } from '@/components/NavBar/Header';
import { HeaderPainel } from '@/components/NavBar/HeaderPainel';
import { FullPageLoader } from '@/components/ui/FullPageLoader';

// --- FUNÇÃO AUXILIAR PARA FORMATAR DATAS ---
// Transforma datas em texto relativo como "hoje", "ontem", "há 2 dias"
const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInDays = Math.floor(diffInSeconds / 86400);

    if (diffInDays === 0) return 'hoje';
    if (diffInDays === 1) return 'ontem';
    if (diffInDays < 7) return `há ${diffInDays} dias`;
    
    return date.toLocaleDateString('pt-BR');
};

// --- DADOS PARA OS CARDS DE GERENCIAMENTO ---
const managementLinks = {
    conteudo: [
        { href: '/painel/noticias', text: 'Gerenciar Notícias', icon: <Newspaper/> },
        { href: '/painel/eventos', text: 'Gerenciar Eventos', icon: <Megaphone/> },
        { href: '/painel/paginas', text: 'Gerenciar Páginas', icon: <FilePlus/> },
    ],
        publicacoes: [ 
        { href: '/painel/licitacoes', text: 'Gerenciar Licitações', icon: <Gavel/> },
        { href: '/painel/legislacao', text: 'Gerenciar Leis e Atos', icon: <FileBadge2/> },
        { href: '/painel/diario-oficial', text: 'Gerenciar Diário Oficial', icon: <BookOpen/> },
        { href: '/painel/concursos', text: 'Gerenciar Concursos', icon: <Award/> },
    ],
    governo: [
        { href: '/painel/secretarias', text: 'Secretarias', icon: <Building/> },
        { href: '/painel/servidores', text: 'Servidores', icon: <UserSquare/> },
        { href: '#', text: 'Prefeito e Vice' },
        { href: '#', text: 'Galeria de Prefeitos' },
    ],
    servicos: [
        { href: '/painel/galerias', text: 'Galerias de Fotos', icon: <Camera/> },
        { href: '/painel/ouvidoria', text: 'Ouvidoria', icon: <Megaphone/> },
        { href: '#', text: 'Telefones Úteis' },
        { href: '#', text: 'Portal da Transparência' },
    ]
};

// ======================================================
// --- COMPONENTE PRINCIPAL DA PÁGINA ---
// ======================================================
const PainelControlePage = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    
    const [stats, setStats] = useState(null);
    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.replace('/webmail');
        }
        
        if (status === 'authenticated') {
            const fetchData = async () => {
                try {
                    const response = await fetch('/api/painel/stats');
                    if (!response.ok) throw new Error('Falha ao buscar dados');
                    const data = await response.json();
                    
                    setStats(data.stats);
                    setRecentActivities(data.recentesNoticias);
                } catch (error) {
                    console.error("Erro ao carregar dados do painel:", error);
                }
            };
            fetchData();
        }
    }, [status, router]);

    if (status === 'loading' || !stats) {
        return <FullPageLoader />;
    }
    
    if (status !== 'authenticated') {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-100">
            <HeaderPainel/>
            
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard icon={<Newspaper/>} label="Notícias Publicadas" value={stats.noticias} />
                    <StatCard icon={<Briefcase/>} label="Licitações Abertas" value={stats.licitacoes} />
                    <StatCard icon={<Building/>} label="Secretarias" value={stats.secretarias} />
                    <StatCard icon={<Megaphone/>} label="Chamados Abertos" value={stats.ouvidoria} />
                </section>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Cards de Gerenciamento Reintegrados */}
                        <ManagementCard title="Gerenciar Conteúdo" links={managementLinks.conteudo} />
                        <ManagementCard title="Gerenciar Publicações Oficiais" links={managementLinks.publicacoes} />
                        <ManagementCard title="Gerenciar Estrutura do Governo" links={managementLinks.governo} />
                        <ManagementCard title="Gerenciar Serviços e Transparência" links={managementLinks.servicos} />
                    </div>

                    <aside className="space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Ações Rápidas</h2>
                            <div className="space-y-3">
                                <QuickAction href="/painel/noticias/novo" text="Escrever Nova Notícia" icon={<PenSquare />} />
                                <QuickAction href="/publicacoes-oficiais" text="Nova Publicação Oficial" icon={<FilePlus />} />
                                {session?.user?.role === 'admin' && (
                                    <QuickAction href="/painel/usuarios" text="Gerenciar Usuários" icon={<Users />} />
                                )}
                            </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-sm border">
                            <h2 className="text-lg font-bold text-gray-800 mb-4">Atividade Recente</h2>
                            <ul className="space-y-4">
                                {recentActivities.map(activity => (
                                    <li key={activity.id} className="flex justify-between items-center text-sm">
                                        <span className="text-gray-700 truncate pr-4">{activity.titulo}</span>
                                        <span className="text-gray-500 flex-shrink-0 font-medium">
                                            {formatRelativeTime(activity.data_publicacao)}
                                        </span>
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


// ======================================================
// --- SUB-COMPONENTES DO PAINEL ---
// ======================================================
const StatCard = ({ icon, label, value }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm border flex items-center gap-4 hover:shadow-md transition-shadow">
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
                // A correção é nesta linha 👇
                <Link key={link.text} href={link.href} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group">
                    <div className="flex items-center gap-3">
                        {link.icon && React.cloneElement(link.icon, { size: 18, className: "text-gray-500 group-hover:text-emerald-600" })}
                        <span className="font-medium text-gray-700">{link.text}</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-400 group-hover:text-emerald-600" />
                </Link>
            ))}
        </div>
    </div>
);

const QuickAction = ({ href, text, icon }) => (
    <Link href={href} className="w-full flex items-center gap-3 p-3 text-white font-semibold bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-sm hover:shadow-md">
        {React.cloneElement(icon, { size: 20 })}
        {text}
    </Link>
);


export default PainelControlePage;