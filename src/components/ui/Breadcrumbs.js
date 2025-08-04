"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
// Ícones do Lucide React
import { ChevronRight, Home, ArrowLeft } from 'lucide-react';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const router = useRouter();
  if (!pathname || pathname === '/') return null; // Oculta na página inicial

  const segments = pathname.split('/').filter(Boolean);
  const crumbs = [{ label: 'Início', href: '/' }];

  segments.forEach((seg, idx) => {
    const href = '/' + segments.slice(0, idx + 1).join('/');
    const label = seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ');
    crumbs.push({ label, href });
  });

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Container principal com Flexbox para alinhar os itens */}
        <div className="flex items-center justify-between py-3">
          
          {/* Lado Esquerdo: Lista de Breadcrumbs */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              {crumbs.map((crumb, idx) => {
                const isLast = idx === crumbs.length - 1;
                return (
                  <li key={crumb.href} className="flex items-center text-sm">
                    <Link
                      href={crumb.href}
                      // Previne o clique no último item
                      onClick={(e) => {
                        if (isLast) e.preventDefault();
                      }}
                      className={
                        `flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors duration-200 ` +
                        (isLast
                          ? 'bg-emerald-600 text-white font-semibold cursor-default'
                          : 'bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-700')
                      }
                      aria-current={isLast ? 'page' : undefined}
                    >
                      {idx === 0 && <Home size={14} />}
                      <span className="leading-none">{crumb.label}</span>
                    </Link>
                    {!isLast && <ChevronRight size={18} className="ml-2 text-gray-400" />}
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Lado Direito: Botão Voltar */}
          <button
            onClick={() => router.back()}
            className="cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200"
            aria-label="Voltar para a página anterior"
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs;