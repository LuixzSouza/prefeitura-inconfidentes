import Image from "next/image";

export function CardNoticedLarge({ title, text, img, date, type }) {
    return (
        <div className="flex items-center justify-center w-full h-72 shadow-sm shadow-black rounded-xl">
            <div className="w-full h-full relative">
                <Image
                    alt="Imagem de Notícias"
                    src={img}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="relative p-5 w-full">
                <span className="absolute -top-4 -left-6 bg-verde-claro text-white px-7 py-1 font-bold rounded-sm" >
                    {type}
                </span>
                <h3 className="font-bold text-xl mb-6" >
                    {title}
                </h3>
                <p className="text-xs text-black/50 font-bold mb-7">
                    {text}
                </p>
                <div className="flex items-center justify-start gap-3" >
                    <Image width={24} height={24} src={"/icons/green-date.svg"} alt="Icone Data" />
                    <span className="text-verde-claro text-sm" >
                        {date}
                    </span>
                </div>
            </div>
        </div>
    );
}
