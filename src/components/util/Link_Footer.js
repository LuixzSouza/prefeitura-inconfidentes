// /components/util/Link_Footer.jsx

import Link from "next/link";

export function Link_Footer({ title, items }) {
  return (
    <div className="text-sm">
      <h4 className="text-verde-claro font-bold mb-2">{title}</h4>
      <ul className="space-y-1">
        {items.map((link, index) => (
          <li key={index}>
            <Link href={link.link} className="text-gray-700 hover:underline">
              {/* Usamos flex para alinhar o ícone e o texto com um espaçamento (gap) */}
              <div className="flex items-center gap-2">
                {/* Renderiza o ícone */}
                {link.icon}
                {/* O texto do link */}
                <span>{link.item}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}



// /data/footerLinks.js

// Ícones trocados para lucide-react
import {
  Building2, Coins, BookOpen, Landmark, Phone, Users, Building, Leaf,
  GraduationCap, Factory, ShoppingCart, HeartPulse, HardHat, Gavel,
  FileSignature, Scale, Folder, FileText
} from 'lucide-react';

export const footerLinks = [
  {
    title: "O Município",
    items: [
      { item: "Sobre o Município", link: "/", icon: <Building2 size={16} /> },
      { item: "Economia", link: "/", icon: <Coins size={16} /> },
      { item: "História", link: "/", icon: <BookOpen size={16} /> },
      { item: "Turismo e Lazer", link: "/", icon: <Landmark size={16} /> },
      { item: "Telefones Úteis", link: "/", icon: <Phone size={16} /> },
    ],
  },
  {
    title: "O Governo",
    items: [
      { item: "Prefeito", link: "/", icon: <Users size={16} /> },
      { item: "Vice-Prefeito", link: "/", icon: <Users size={16} /> },
    ],
  },
  {
    title: "Departamentos",
    items: [
      { item: "Administração", link: "/", icon: <Building size={16} /> },
      { item: "Assistência e Assessoria", link: "/", icon: <Users size={16} /> },
      { item: "Agricultura e Gestão Ambiental", link: "/", icon: <Leaf size={16} /> },
      { item: "Assistência Social", link: "/", icon: <HeartPulse size={16} /> },
      { item: "Cultura e Turismo", link: "/", icon: <Landmark size={16} /> },
      { item: "Educação", link: "/", icon: <GraduationCap size={16} /> },
      { item: "Finanças", link: "/", icon: <Coins size={16} /> },
      { item: "Indústria e Comércio", link: "/", icon: <Factory size={16} /> },
      { item: "Licitação e Compras", link: "/", icon: <ShoppingCart size={16} /> },
      { item: "Saúde", link: "/", icon: <HeartPulse size={16} /> },
      { item: "Obras", link: "/", icon: <HardHat size={16} /> },
    ],
  },
  {
    title: "Publicações Oficiais",
    items: [
      { item: "Compras Diretas", link: "/", icon: <ShoppingCart size={16} /> },
      { item: "Decretos", link: "/", icon: <Gavel size={16} /> },
      { item: "Demais Publicações Oficiais", link: "/", icon: <FileSignature size={16} /> },
      { item: "Leis", link: "/", icon: <Scale size={16} /> },
      { item: "Licitações", link: "/", icon: <Folder size={16} /> },
      { item: "Contratos", link: "/", icon: <FileText size={16} /> },
      { item: "Portarias", link: "/", icon: <FileSignature size={16} /> },
      { item: "Concursos e Processos Seletivos", link: "/", icon: <Users size={16} /> },
    ],
  },
];