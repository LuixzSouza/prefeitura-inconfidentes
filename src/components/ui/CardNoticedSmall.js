import Image from "next/image";

export function CardNoticedSmall({ notice }) {
    const { title, img, href } = notice;
    return (
        <a href={href} className="w-full flex items-center gap-4 group">
            {/* Imagem */}
            <div className="flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden">
                <Image
                    alt={title}
                    src={img}
                    width={96}
                    height={80}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            {/* Título */}
            <h4 className="font-semibold text-sm text-gray-700 leading-tight group-hover:text-green-800 transition-colors">
                {title}
            </h4>
        </a>
    );
}