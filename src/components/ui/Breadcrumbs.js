"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const router = useRouter();
  if (!pathname) return null;

  // Quebra o caminho em segmentos, ignorando vazios
  const segments = pathname.split('/').filter(Boolean);

  const baseCrumb = { label: 'Início', href: '/' };
  const crumbs = [baseCrumb];

  // Monta breadcrumbs dinamicamente
  segments.forEach((seg, idx) => {
    const href = '/' + segments.slice(0, idx + 1).join('/');
    const label = seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ');
    crumbs.push({ label, href });
  });

  // Handler robusto de navegação com fallback para evitar 404
  const handleClick = (href, isLast) => async (e) => {
    if (isLast) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    try {
      // Tenta navegação padrão
      await router.push(href);
    } catch {
      // Se falhar, redireciona para raiz
      router.replace('/');
    }
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <nav aria-label="Breadcrumb" className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 py-3">
          {crumbs.map((crumb, idx) => {
            const isLast = idx === crumbs.length - 1;
            return (
              <li key={crumb.href} className="flex items-center text-sm">
                <Link
                  href={crumb.href}
                  onClick={handleClick(crumb.href, isLast)}
                  className={
                    `flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors duration-200 ` +
                    (isLast
                      ? 'bg-emerald-600 text-white font-semibold cursor-default'
                      : 'bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-700')
                  }
                  aria-current={isLast ? 'page' : undefined}
                >
                  {idx === 0 ? <Home size={14} /> : null}
                  <span className="leading-none">{crumb.label}</span>
                </Link>
                {!isLast && <ChevronRight size={18} className="ml-2 text-gray-400" />}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;