import Image from "next/image";

// Um componente de Tag reutilizável para consistência
const CategoryTag = ({ category }) => (
  <span className="absolute top-4 left-4 z-10 bg-green-700 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
    {category}
  </span>
);

export function CardNoticedLarge({ notice }) {
  const { title, text, img, date, category, href } = notice;

  return (
    <a href={href} className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      {/* Container da Imagem */}
      <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
        <CategoryTag category={category} />
        <Image
          alt={title}
          src={img}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
      </div>
      {/* Container do Conteúdo */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-2xl mb-3 text-gray-800 group-hover:text-green-800 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {text}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" /></svg>
          <span>{date}</span>
        </div>
      </div>
    </a>
  );
}