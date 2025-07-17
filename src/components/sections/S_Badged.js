'use client'

import { useRef } from "react"
import Image from "next/image"
import { ContainerGrid } from "../layout/ContainerGrid"

export function S_Badged() {
    const containerRef = useRef(null)

    let timeoutId

    const handleMouseEnter = () => {
        if (containerRef.current) {
            containerRef.current.style.animationPlayState = 'paused'
        }
        clearTimeout(timeoutId)
    }

    const handleMouseLeave = () => {
        timeoutId = setTimeout(() => {
            if (containerRef.current) {
                containerRef.current.style.animationPlayState = 'running'
            }
        }, 3000) // 3 segundos após sair do hover
    }

    return (
        <section className="w-full bg-gray-200 py-12" >
            <ContainerGrid>
                <div className="w-full h-auto flex flex-col items-center justify-center overflow-hidden">
                    <h1 className="text-black text-6xl text-center font-bold" >
                        PREFEITURA DE <br/>
                        <span className="text-green-700 text-7xl font-extrabold" >INCONFIDENTES</span>
                    </h1>
                    <div
                        className="relative w-full max-w-[630px] overflow-hidden"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div
                            ref={containerRef}
                            className="flex animate-scrollLoop"
                            style={{
                                animation: 'scroll-loop 20s linear infinite',
                                animationPlayState: 'running',
                            }}
                        >
                            <Image
                                width={676}
                                height={255}
                                alt="Badged nova gestão"
                                src="/images/badged-loop.png"
                            />
                            <Image
                                width={676}
                                height={255}
                                alt="Badged nova gestão duplicada"
                                src="/images/badged-loop.png"
                            />
                        </div>
                    </div>
                    <p className="text-black text-2xl" >
                        <span className="font-bold" >
                            RENOVAÇÃO QUE FAZ ACONTECER 
                        </span>
                        | ADM 2025 - 2028   
                    </p>
                </div>
            </ContainerGrid>
        </section>
    )
}


{/* 
    <Image width={200} height={190} alt="Badged nova gestão" src={"/images/line_church.png"}/>    
    <Image width={676} height={255} alt="Badged nova gestão" src={"/images/renovation-25_28.png"}/>         
    <Image width={200} height={190} alt="Badged nova gestão" src={"/images/line_church.png"}/>          
*/}