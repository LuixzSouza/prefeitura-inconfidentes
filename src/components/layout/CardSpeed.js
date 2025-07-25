import Image from "next/image"

export function CardSpeed({ title, icon, layout }) {
    const isFlex = layout === "flex"

    return (
        <div
            className={`w-full max-w-44 h-auto p-4 gap-3 flex items-center justify-center cursor-pointer group hover:shadow-transparent
                border-2 border-green-700 rounded-2xl text-black bg-white hover:bg-green-700/80 transition-all duration-300 shadow-md shadow-black/50
                ${isFlex ? "flex-row max-w-full justify-start" : "flex-col"}
            `}
        >
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center transition group-hover:bg-white">
                <Image 
                    width={32}
                    height={32}
                    alt="Ícone Acesso rápido"
                    src={`/icons/${icon}.svg`}
                    className="transition group-hover:brightness-100"
                />
            </div>
            <h5 className={`font-medium text-lg text-green-900 group-hover:text-white ${isFlex ? "text-start" : "text-center"}`}>
                {title}
            </h5>
        </div>
    )
}
