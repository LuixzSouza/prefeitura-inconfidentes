// Adicione esta linha no topo do arquivo para torná-lo interativo
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation'; // 1. Importe o useRouter
import { Search, Grid, Building, Gavel, FileText, Phone } from 'lucide-react';

// Links que aparecerão no menu de Acesso Rápido. Você pode customizar!
const quickLinks = [
  { icon: <Building />, text: 'Portal da Transparência', href: '/transparencia' },
  { icon: <Gavel />, text: 'Licitações', href: '/publicacoes-oficiais/licitacoes' },
  { icon: <FileText />, text: 'Decretos e Leis', href: '/publicacoes-oficiais/leis' },
  { icon: <Phone />, text: 'Telefones Úteis', href: '/municipio/telefones-uteis' },
];

export function NavBarBotHome() {
 const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // 2. Estado para o termo de busca
  const menuRef = useRef(null);
  const router = useRouter(); // 3. Hook para navegação

  // Função para lidar com a submissão da busca
  const handleSearch = (e) => {
    e.preventDefault(); // Previne o recarregamento da página
    if (!searchTerm.trim()) return; // Não faz nada se a busca estiver vazia
    router.push(`/busca?q=${encodeURIComponent(searchTerm)}`); // Navega para a página de busca
  };

  // Efeito para fechar o menu ao clicar fora dele
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  return (
    <div className="absolute bottom-0 flex items-center justify-between w-full px-4 md:px-8 py-3 bg-gradient-to-t from-black/70 to-transparent z-10">
      
      {/* Logo */}
      <div className="hidden md:block">
        <Image width={200} height={67} alt="logo Inconfidentes" src="/images/logo_home.png" />
      </div>

      {/* Campo de busca aprimorado */}
<form onSubmit={handleSearch} className="relative flex-grow md:flex-grow-0 md:max-w-md lg:max-w-lg">
        <input
          type="text"
          id="search"
          className="w-full py-2.5 pl-10 pr-12 border-2 border-green-900/50 rounded-full bg-white/90 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-300"
          placeholder="O que você procura no site?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="absolute right-0 top-0 h-full px-4 text-gray-500 hover:text-emerald-600 transition-colors" aria-label="Pesquisar">
          <Search />
        </button>
      </form>

      {/* Novo Menu de Acesso Rápido */}
      <div className="relative" ref={menuRef}>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="ml-4 px-4 py-2.5 text-white bg-emerald-700 hover:bg-emerald-600 rounded-full text-sm font-semibold transition flex items-center gap-2 shadow-lg"
        >
          <Grid size={18} />
          Acesso Rápido
        </button>

        {/* O menu que aparece */}
        <div 
          className={`
            absolute bottom-full right-0 mb-2 w-72 bg-white rounded-lg shadow-2xl p-2
            transition-all duration-300 ease-in-out
            ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
          `}
        >
          <div className="font-bold text-gray-800 p-2">Serviços mais procurados:</div>
          <ul className="text-gray-700">
            {quickLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors">
                  <span className="text-emerald-600">{link.icon}</span>
                  <span>{link.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}