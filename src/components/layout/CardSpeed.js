// SEU ARQUIVO: CardSpeed.js (Com o novo design)

import Image from "next/image"

export function CardSpeed({ title, icon, layout, index }) {
  const isListLayout = layout === "list"

  return (
    // Link clicável envolvendo todo o card para melhor acessibilidade
    <a 
      href="#" // Substitua pelo link real do item
      className={`
        w-full h-full p-4 gap-4 flex items-center group
        border rounded-xl shadow-sm cursor-pointer
        transition-all duration-300 ease-in-out
        bg-slate-50/70 border-slate-200
        hover:shadow-xl hover:border-green-500 hover:-translate-y-1.5
        ${isListLayout ? "flex-row justify-start" : "flex-col justify-center text-center"}
      `}
      // Animação de entrada escalonada
      style={{ transitionDelay: `${index * 25}ms` }}
    >
      {/* Círculo do Ícone */}
      <div className={`
        flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center
        transition-all duration-300
        bg-white shadow-inner-sm
        group-hover:bg-green-600 group-hover:shadow-lg
      `}>
        <Image 
          width={32}
          height={32}
          alt={`Ícone para ${title}`}
          src={`/icons/${icon}.svg`}
          className="transition-transform duration-300 group-hover:invert group-hover:brightness-0 group-hover:scale-110"
        />
      </div>
      {/* Título */}
      <h5 className="font-semibold text-gray-700 transition-colors duration-300 group-hover:text-green-800">
        {title}
      </h5>
    </a>
  )
}