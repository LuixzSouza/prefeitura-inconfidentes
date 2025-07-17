'use client'

import { useState } from "react"
import { Heading_2 } from "../font/Heading_2"
import { CardSpeed } from "../layout/CardSpeed"
import { ContainerGrid } from "../layout/ContainerGrid"
import Image from "next/image"

export function S_AcessSped() {
    const [isGrid, setIsGrid] = useState(true)

    const toggleLayout = () => setIsGrid(prev => !prev)

    const layout = isGrid ? "grid" : "flex"
    
    const cards = [
        { icon: "area-habitacional", title: "Conjunto Habitacional – Informações" },
        { icon: "covid-19", title: "COVID-19" },
        { icon: "decreto", title: "Decretos" },
        { icon: "caderno", title: "Diário Oficial do Município" },
        { icon: "leis", title: "Leis" },
        { icon: "licitacao", title: "Licitações" },
        { icon: "taxa", title: "Nota Fiscal Eletrônica" },
        { icon: "impostos", title: "IPTU, ISS/TLL" },
        { icon: "portal-transparencia", title: "Portal da Transparência" },
        { icon: "portaria", title: "Portarias" },
        { icon: "registro-de-dominio", title: "Portal do Servidor" },
        { icon: "concurso", title: "Concursos Públicos e Processos Seletivos" },
    ]

    return (
        <section className="py-28" >
            <ContainerGrid>
                <div className="flex items-center justify-between">
                    <Heading_2 title={"Acesso Rápido"} />
                    <button
                        onClick={toggleLayout}
                        className="py-2 px-6 rounded bg-green-700 hover:bg-green-800 transition flex gap-3"
                        title="Alternar visualização"
                    >
                        <Image
                            width={24}
                            height={24}
                            alt="Alternar layout"
                            src={isGrid ? "/icons/list.svg" : "/icons/grid.svg"}
                            className="invert"
                        />
                        <span className="text-white" >
                            {isGrid ? "Lista" : "Grid"}
                        </span>
                    </button>
                </div>

                <div
                    className={`transition-all duration-500 mt-6 ${
                        isGrid
                            ? "grid grid-cols-6 gap-4"
                            : "grid grid-cols-3 gap-4"
                    }`}
                >
                    {cards.map((item, index) => (
                        <CardSpeed
                            key={index}
                            icon={item.icon}
                            title={item.title}
                            layout={layout}
                        />
                    ))}
                </div>
            </ContainerGrid>
        </section>
    )
}
