import Image from "next/image";
import Link from "next/link";

const listNav = [
  { icon: "house", linkTxt: "Página Inicial", linkUrl: "#" },
  {
    icon: "municipio",
    linkTxt: "O Município",
    linkUrl: "#",
    dropdown: [
      { text: "História", url: "#" },
      { text: "Símbolos", url: "#" },
      { text: "Localização", url: "#" },
    ],
  },
  {
    icon: "governo",
    linkTxt: "O Governo",
    linkUrl: "#",
    dropdown: [
      { text: "Prefeito", url: "#" },
      { text: "Vice-Prefeito", url: "#" },
      { text: "Secretarias", url: "#" },
    ],
  },
  {
    icon: "departamento",
    linkTxt: "Departamentos",
    linkUrl: "#",
    dropdown: [
      { text: "Saúde", url: "#" },
      { text: "Educação", url: "#" },
      { text: "Cultura", url: "#" },
    ],
  },
  {
    icon: "publicacao_oficial",
    linkTxt: "Publicações Oficiais",
    linkUrl: "#",
    dropdown: [
      { text: "Diário Oficial", url: "#" },
      { text: "Leis", url: "#" },
      { text: "Licitações", url: "#" },
    ],
  },
  { icon: "transparencia", linkTxt: "Transparência", linkUrl: "#" },
];

export function Header() {
    return (
        <header className="sticky top-0 w-full bg-green-800 text-white z-50">
            <nav className="flex justify-center">
                <ul className="flex items-center gap-4 px-4 py-3 relative">
                {listNav.map((item, index) => (
                    <li key={index} className="relative group">
                    {item.dropdown ? (
                        <>
                        <button className="flex items-center gap-2 hover:bg-green-900 px-3 py-2 rounded transition"> 
                            <Image width={24} height={24} alt="icon" src={`/icons/${item.icon}.svg`} className="invert"/>
                            <span className="text-xs">{item.linkTxt}</span>
                            <Image width={16} height={16} alt="icone seta para baixo" src={"/icons/arrow-down.svg"} className="ml-1 invert group-hover:rotate-180 ease duration-200" />
                        </button>

                        <ul className="absolute hidden group-hover:flex flex-col top-full left-0 bg-white text-black shadow-md rounded w-48 z-10">
                            {item.dropdown.map((sub, subIndex) => (
                            <li key={subIndex}>
                                <Link
                                href={sub.url}
                                className="block px-4 py-2 hover:bg-gray-200"
                                >
                                {sub.text}
                                </Link>
                            </li>
                            ))}
                        </ul>
                        </>
                    ) : (
                        <Link
                        href={item.linkUrl}
                        className="hover:bg-green-900 px-3 py-2 rounded transition flex items-center gap-2"
                        >
                            <Image width={24} height={24} alt="icon" src={`/icons/${item.icon}.svg`} className="invert" />
                            <span className="text-xs">{item.linkTxt}</span>
                        </Link>
                    )}
                    </li>
                ))}
                </ul>
            </nav>
        </header>
    );
}
