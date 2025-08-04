'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Breadcrumbs from "../ui/Breadcrumbs";
import { listNav } from "@/data/navigationData";

export function Header() {
  const pathname = usePathname();
  const showBreadcrumbs = pathname !== '/';

  return (
    <>
      <header className="sticky top-0 w-full bg-green-800 text-white z-50">
        <nav className="relative flex justify-center">
          <ul className="flex items-center gap-4 px-4 pt-3">
            {listNav.map((item, idx) => {
              // Caso de dropdown
              if (item.dropdown) {
                // Verifica se alguma das URLs filhas bate com a rota atual
                const activeChild = item.dropdown.some(sub => sub.url === pathname);

                return (
                  <li key={idx} className="group">
                    <button
                      className={`
                        flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200
                        hover:bg-green-900
                        ${activeChild ? 'border-b-2 border-white' : 'opacity-80'}
                      `}
                    >
                      <Image
                        width={24}
                        height={24}
                        alt={item.linkTxt}
                        src={`/icons/${item.icon}.svg`}
                        className="invert"
                      />
                      <span className="text-xs font-semibold">{item.linkTxt}</span>
                      <Image
                        width={16}
                        height={16}
                        alt="seta"
                        src="/icons/arrow-down.svg"
                        className="ml-1 invert group-hover:rotate-180 transition-transform duration-300"
                      />
                    </button>

                    <div className="
                      absolute top-full left-0 w-full
                      opacity-0 pointer-events-none
                      group-hover:opacity-100 group-hover:pointer-events-auto
                      transition-all duration-300 ease-in-out
                      transform-origin-top
                    ">
                      <div className="bg-white text-gray-800 shadow-2xl">
                        <div className="max-w-7xl mx-auto px-8 py-10">
                          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
                            {item.dropdown.map((sub, subIdx) => {
                              const isSubActive = sub.url === pathname;
                              return (
                                <li key={subIdx} className="list-none">
                                  <Link
                                    href={sub.url}
                                    className={`
                                      flex items-start gap-4 p-3 rounded-lg transition-colors duration-200
                                      hover:bg-gray-100
                                      ${isSubActive ? 'bg-green-100 border-l-4 border-green-800' : ''}
                                    `}
                                  >
                                    <div className="bg-green-100 p-2 rounded-md shrink-0">
                                      <Image
                                        width={24}
                                        height={24}
                                        alt={sub.title}
                                        src={`/icons/${sub.icon}.svg`}
                                      />
                                    </div>
                                    <div>
                                      <h3 className="font-bold text-sm text-gray-900">{sub.title}</h3>
                                      <p className="text-xs text-gray-600 mt-1">{sub.description}</p>
                                    </div>
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
              }

              // Caso sem dropdown
              // Marca ativo se a rota for exata ou rota filha
              const isActive =
                pathname === item.linkUrl ||
                (item.linkUrl !== '/' && pathname.startsWith(item.linkUrl + '/'));

              return (
                <li key={idx} className="">
                  <Link
                    href={item.linkUrl}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200
                      hover:bg-green-900
                      ${isActive ? 'border-b-2 border-white' : 'opacity-80'}
                    `}
                  >
                    <Image
                      width={24}
                      height={24}
                      alt={item.linkTxt}
                      src={`/icons/${item.icon}.svg`}
                      className="invert"
                    />
                    <span className="text-xs font-semibold">{item.linkTxt}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      {showBreadcrumbs && <Breadcrumbs />}
    </>
  );
}
