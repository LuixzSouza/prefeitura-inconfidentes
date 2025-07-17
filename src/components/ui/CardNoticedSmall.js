import Image from "next/image";

export function CardNoticedSmall({ text, img }) {
    return (
        <div className="flex items-center justify-center w-full max-w-80 shadow-sm shadow-black rounded-xl overflow-hidden">
            <div className="flex-1 h-32 relative">
                <Image
                    alt="Imagem de Notícias"
                    src={img}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-5 w-1/2">
                <p className="text-xs text-verde-claro font-bold">
                    {text}
                </p>
            </div>
        </div>
    );
}
