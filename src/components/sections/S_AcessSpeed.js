// SEU ARQUIVO: S_AcessSped.js (Com o novo design)

'use client'

import { useState } from "react"
import { Heading_2 } from "../font/Heading_2"
import { CardSpeed } from "../layout/CardSpeed" // Certifique-se que o caminho está correto
import { ContainerGrid } from "../layout/ContainerGrid"
import Image from "next/image"

export function S_AcessSped() {
  const [layout, setLayout] = useState('grid') // 'grid' ou 'list'

  const toggleLayout = () => setLayout(prev => (prev === 'grid' ? 'list' : 'grid'))

  const cards = [
      { icon: "area-habitacional", title: "Conjunto Habitacional" },
      { icon: "covid-19", title: "COVID-19" },
      { icon: "decreto", title: "Decretos" },
      { icon: "caderno", title: "Diário Oficial" },
      { icon: "leis", title: "Leis Municipais" },
      { icon: "licitacao", title: "Licitações" },
      { icon: "taxa", title: "Nota Fiscal Eletrônica" },
      { icon: "impostos", title: "IPTU, ISS e Taxas" },
      { icon: "portal-transparencia", title: "Portal da Transparência" },
      { icon: "portaria", title: "Portarias" },
      { icon: "registro-de-dominio", title: "Portal do Servidor" },
      { icon: "concurso", title: "Concursos e Seleções" },
  ]

  return (
    <section className="py-20 md:py-28 bg-white">
      <ContainerGrid>
        <div className="flex items-center justify-between mb-8">
          <Heading_2 title={"Acesso Rápido"} />
          
          {/* Botão de alternância com design mais leve */}
          <button
            onClick={toggleLayout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-300"
            title="Alternar visualização"
          >
            <Image
              width={20}
              height={20}
              alt="Ícone para alternar layout"
              src={layout === 'grid' ? "/icons/list.svg" : "/icons/grid.svg"}
              // O ícone não precisa mais ser invertido se o fundo for claro
            />
            <span className="font-medium text-sm hidden sm:inline">
              {layout === 'grid' ? "Ver em Lista" : "Ver em Grade"}
            </span>
          </button>
        </div>

        {/* Container dos cards com layouts responsivos */}
        <div
          className={`grid gap-4 sm:gap-5 transition-all duration-500 ${
            layout === 'grid'
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6" // Layout de grade responsivo
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" // Layout de lista responsivo
          }`}
        >
          {cards.map((item, index) => (
            <CardSpeed
              key={index}
              icon={item.icon}
              title={item.title}
              layout={layout}
              index={index} // Passando o index para a animação
            />
          ))}
        </div>
      </ContainerGrid>
    </section>
  )
}