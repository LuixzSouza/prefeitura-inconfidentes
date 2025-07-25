import Image from "next/image";

export function CardNoticedMedium({ title, text, img, date, type }) {
    return (
        <div className="flex flex-col items-center justify-center w-full shadow-sm shadow-black rounded-xl">
            <div className="w-full h-48 relative">
                <Image
                    alt="Imagem de Notícias"
                    src={img}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="relative p-5 w-full">
                <span className="absolute -top-4 -left-4 bg-verde-claro text-white px-7 py-1 font-bold rounded-sm" >
                    {type}
                </span>
                <h3 className="font-bold text-xl mb-4" >
                    {title}
                </h3>
                <p className="text-xs text-black/50 font-bold mb-5">
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
