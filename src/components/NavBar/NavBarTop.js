"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const icons_social = [
  { icon: "zap", link: "#" },
  { icon: "youtube", link: "#" },
  { icon: "instagram", link: "#" },
  { icon: "facebook", link: "#" },
];

const infoPref = [
  { icon: "local", info: "Álvares Maciel, 190", link: "https://www.google.com/maps/search/?api=1&query=Rua+Engenheiro+%C3%81lvares+Maciel+190+Inconfidentes+MG" },
  { icon: "clock", info: "12h–18h", link: "#" },
  { icon: "phone", info: "(35) 3464–1015", link: "tel:+553534641015" },
];

const lai = [
  {
    txtLink: "Ouvidoria/SIC",
    urlLink: "/ouvidoria",
    about:
      "Canal direto para enviar sugestões, elogios, reclamações ou solicitações de informação pública.",
  },
  {
    txtLink: "Transparência",
    urlLink: "/transparencia",
    about:
      "Acesso fácil a dados sobre gastos, contratos, servidores e outras informações públicas da gestão.",
  },
  {
    txtLink: "Legislação",
    urlLink: "/publicacoes-oficiais/leis",
    about:
      "Consulta de leis, decretos, portarias e outras normas oficiais do município.",
  },
  {
    txtLink: "Diário Oficial",
    urlLink: "/publicacoes-oficiais/diario-oficial",
    about:
      "Publicações oficiais com atos da administração pública, como nomeações, editais e avisos.",
  },
  {
  txtLink: "Webmail",
  urlLink: "/webmail",
  about:
    "Acesso ao e-mail institucional exclusivo para servidores da prefeitura.",
}
];

// Preferências de acessibilidade, salvas no navegador do visitante
const FONTE_MIN = -2;
const FONTE_MAX = 4;

const lerPreferencia = (chave, padrao) => {
  try {
    const valor = localStorage.getItem(chave);
    return valor === null ? padrao : JSON.parse(valor);
  } catch {
    return padrao;
  }
};

const salvarPreferencia = (chave, valor) => {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch {}
};

export function Navbartop() {
  const [fonte, setFonte] = useState(0);
  const [contraste, setContraste] = useState(false);

  useEffect(() => {
    setFonte(lerPreferencia("a11y-fonte", 0));
    setContraste(lerPreferencia("a11y-contraste", false));
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = fonte ? `${100 + fonte * 10}%` : "";
    document.documentElement.classList.toggle("alto-contraste", contraste);
  }, [fonte, contraste]);

  const mudarFonte = (passo) => {
    const nova = Math.min(FONTE_MAX, Math.max(FONTE_MIN, fonte + passo));
    setFonte(nova);
    salvarPreferencia("a11y-fonte", nova);
  };

  const alternarContraste = () => {
    setContraste(!contraste);
    salvarPreferencia("a11y-contraste", !contraste);
  };

  const redefinir = () => {
    setFonte(0);
    setContraste(false);
    salvarPreferencia("a11y-fonte", 0);
    salvarPreferencia("a11y-contraste", false);
  };

  return (
    <div className="relative bg-gradient-to-r from-green-800 to-green-950 text-white text-sm py-2 px-4 flex flex-wrap justify-between items-center gap-4 whitespace-nowrap z-20">
        {/* Informações da prefeitura */}
        <div className="flex items-center gap-3">
            {infoPref.map((item, index) => (
            <Link
                href={item.link}
                key={index}
                className="flex gap-1 group hover:opacity-50 hover:scale-105 ease duration-200"
            >
                <Image
                width={16}
                height={16}
                alt="icone informação"
                src={`/icons/${item.icon}.svg`}
                className="invert"
                />
                <span>{item.info}</span>
            </Link>
            ))}
        </div>

        {/* Links da LAI com tooltip */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {lai.map((item, index) => (
            <Link
                className="flex relative group"
                href={item.urlLink}
                key={index}
            >
                <span className="group-hover:opacity-40 group-hover:scale-105 ease duration-200" >{item.txtLink}</span>
                <span className="absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition bg-gray-700 text-white text-sm px-2 py-1 rounded top-full mt-2 left-1/2 transform -translate-x-1/2 z-10 w-64 text-center whitespace-normal">
                    {item.about}
                </span>
            </Link>
            ))}
        </div>

        {/* Redes sociais */}
        <div className="flex items-center gap-2">
            {icons_social.map((item, index) => (
            <a key={index} href={item.link} className="relative group">
                <Image
                width={16}
                height={16}
                alt="icon"
                src={`/icons/${item.icon}.svg`}
                className="w-4 invert hover:invert-50 hover:scale-110 ease duration-200"
                />
                <span className="absolute opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition bg-gray-700 text-white text-sm px-2 py-1 rounded top-full mt-2 left-1/2 transform -translate-x-1/2 z-10 text-center">
                {item.icon}
                </span>
            </a>
            ))}
        </div>

        {/* Acessibilidade */}
        <div className="relative">
            {/* Botão com peer */}
            <div className="peer flex items-center gap-2 px-3 py-2 hover:bg-green-950 rounded cursor-pointer group">
                <Image width={16} height={16} alt="icone acessibilidade" src={"/icons/acessibilit.svg"} className="invert" />
                <span>Acessibilidade</span>
                <Image width={16} height={16} alt="icone seta para baixo" src={"/icons/arrow-down.svg"} className="ml-1 invert group-hover:rotate-180 ease duration-200" />
            </div>

            {/* Dropdown */}
            <div className="absolute z-10 hidden peer-hover:flex hover:flex flex-col bg-green-950 text-white rounded shadow-md w-48">
                <button onClick={() => mudarFonte(1)} className="px-4 py-2 text-left text-sm hover:bg-green-800">A+ Aumentar fonte</button>
                <button onClick={() => mudarFonte(-1)} className="px-4 py-2 text-left text-sm hover:bg-green-800">A- Diminuir fonte</button>
                <button onClick={alternarContraste} aria-pressed={contraste} className="px-4 py-2 text-left text-sm hover:bg-green-800">{contraste ? 'Desativar' : 'Ativar'} alto contraste</button>
                <button onClick={redefinir} className="px-4 py-2 text-left text-sm hover:bg-green-800">Redefinir</button>
                <Link href="/busca" className="px-4 py-2 text-sm hover:bg-green-800">Buscar no portal</Link>
            </div>
        </div>
    </div>
  );
}
