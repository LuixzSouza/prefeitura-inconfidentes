'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Building2,
  ChevronDown,
  Eye,
  FileText,
  Home,
  Landmark,
  Menu,
  Network,
  Newspaper,
  X,
} from "lucide-react";
import Breadcrumbs from "../ui/Breadcrumbs";
import { listNav } from "@/data/navigationData";

// Ícones vetoriais da barra principal (os SVGs em /icons são imagens
// coloridas e distorcem ao serem invertidos para o fundo verde)
const navIcons = {
  house: Home,
  caderno: Newspaper,
  municipio: Landmark,
  governo: Building2,
  departamento: Network,
  publicacao_oficial: FileText,
  transparencia: Eye,
};

const NavIcon = ({ name, size = 18 }) => {
  const Icon = navIcons[name] ?? FileText;
  return <Icon size={size} strokeWidth={2} aria-hidden="true" />;
};

const isRotaAtiva = (pathname, url) =>
  url !== "#" && (pathname === url || (url !== "/" && pathname.startsWith(url + "/")));

const itemClass = (ativo) => `
  flex h-full items-center gap-2 px-3 xl:px-4 text-sm font-semibold whitespace-nowrap
  border-b-[3px] transition-colors duration-200
  ${ativo ? "border-white text-white" : "border-transparent text-green-50/90 hover:text-white hover:bg-green-900/60"}
`;

export function Header() {
  const pathname = usePathname();
  const showBreadcrumbs = pathname !== '/';
  const [menuAberto, setMenuAberto] = useState(false);
  const [submenuAberto, setSubmenuAberto] = useState(null);

  // Fecha os menus ao trocar de página
  useEffect(() => {
    setMenuAberto(false);
    setSubmenuAberto(null);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 w-full bg-green-800 text-white z-50 shadow-md">
        {/* Navegação desktop */}
        <nav className="relative hidden lg:block" aria-label="Menu principal">
          <ul className="mx-auto flex h-14 w-full max-w-grid items-stretch justify-center px-4 sm:px-6 lg:px-8">
            {listNav.map((item) => {
              if (!item.dropdown) {
                return (
                  <li key={item.linkTxt}>
                    <Link href={item.linkUrl} className={itemClass(isRotaAtiva(pathname, item.linkUrl))}>
                      <NavIcon name={item.icon} />
                      {item.linkTxt}
                    </Link>
                  </li>
                );
              }

              const ativo =
                isRotaAtiva(pathname, item.linkUrl) ||
                item.dropdown.some((sub) => isRotaAtiva(pathname, sub.url));

              return (
                <li key={item.linkTxt} className="group">
                  <button
                    type="button"
                    aria-haspopup="true"
                    className={itemClass(ativo)}
                  >
                    <NavIcon name={item.icon} />
                    {item.linkTxt}
                    <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" />
                  </button>

                  {/* Painel do dropdown (abre com hover ou foco do teclado) */}
                  <div className="
                    invisible absolute left-0 top-full w-full opacity-0 -translate-y-1
                    transition-all duration-200 ease-out
                    group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                    group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0
                  ">
                    <div className="bg-white text-gray-800 shadow-2xl border-t-4 border-green-700">
                      <div className="mx-auto w-full max-w-grid px-4 sm:px-6 lg:px-8 py-8">
                        {item.linkUrl !== "#" && (
                          <Link href={item.linkUrl} className="mb-4 inline-flex items-center gap-1 text-sm font-bold text-green-800 hover:underline">
                            Ver tudo em {item.linkTxt} &rarr;
                          </Link>
                        )}
                        <ul className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                          {item.dropdown.map((sub) => {
                            const subAtivo = sub.url === pathname;
                            return (
                              <li key={sub.url}>
                                <Link
                                  href={sub.url}
                                  className={`
                                    flex h-full items-start gap-3 rounded-lg p-3 transition-colors duration-200
                                    hover:bg-green-50
                                    ${subAtivo ? 'bg-green-100 ring-1 ring-green-700' : ''}
                                  `}
                                >
                                  <span className="shrink-0 rounded-md bg-green-100 p-2">
                                    <Image width={24} height={24} alt="" src={`/icons/${sub.icon}.svg`} />
                                  </span>
                                  <span>
                                    <span className="block text-sm font-bold text-gray-900">{sub.title}</span>
                                    <span className="mt-0.5 block text-xs text-gray-600">{sub.description}</span>
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Navegação mobile */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-bold tracking-wide">Prefeitura de Inconfidentes</Link>
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            className="p-2 rounded hover:bg-green-900"
          >
            {menuAberto ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuAberto && (
          <ul className="lg:hidden max-h-[calc(100vh-56px)] overflow-y-auto border-t border-green-700 pb-4">
            {listNav.map((item) => (
              <li key={item.linkTxt}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => setSubmenuAberto(submenuAberto === item.linkTxt ? null : item.linkTxt)}
                      aria-expanded={submenuAberto === item.linkTxt}
                      className="flex w-full items-center justify-between px-5 py-3 text-sm font-semibold hover:bg-green-900"
                    >
                      <span className="flex items-center gap-3"><NavIcon name={item.icon} />{item.linkTxt}</span>
                      <ChevronDown size={18} className={`transition-transform ${submenuAberto === item.linkTxt ? 'rotate-180' : ''}`} />
                    </button>
                    {submenuAberto === item.linkTxt && (
                      <ul className="bg-green-900">
                        {item.linkUrl !== "#" && (
                          <li>
                            <Link href={item.linkUrl} className="block px-12 py-2.5 text-sm font-semibold text-white">Ver tudo</Link>
                          </li>
                        )}
                        {item.dropdown.map((sub) => (
                          <li key={sub.url}>
                            <Link href={sub.url} className={`block px-12 py-2.5 text-sm ${sub.url === pathname ? 'font-bold text-white' : 'text-green-100'} hover:text-white`}>
                              {sub.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link href={item.linkUrl} className={`flex items-center gap-3 px-5 py-3 text-sm font-semibold hover:bg-green-900 ${isRotaAtiva(pathname, item.linkUrl) ? 'bg-green-900' : ''}`}>
                    <NavIcon name={item.icon} />
                    {item.linkTxt}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </header>

      {showBreadcrumbs && <Breadcrumbs />}
    </>
  );
}
