// components/util/Link_Footer.jsx
import Link from "next/link";

export function Link_Footer({ title, items }) {
  return (
    <div className="text-sm">
      <h4 className="text-verde-claro font-bold mb-2">{title}</h4>
      <ul className="space-y-1">
        {items.map((link, index) => (
          <li key={index}>
            <Link href={link.link} className="text-gray-700 hover:underline">
              {link.item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}



export const footerLinks = [
  {
    title: "O Município",
    items: [
      { item: "Sobre o Município", link: "/" },
      { item: "Economia", link: "/" },
      { item: "História", link: "/" },
      { item: "Turismo e Lazer", link: "/" },
      { item: "Telefones Úteis", link: "/" },
    ],
  },
  {
    title: "O Governo",
    items: [
      { item: "Prefeito", link: "/" },
      { item: "Vice-Prefeito", link: "/" },
    ],
  },
  {
    title: "Departamentos",
    items: [
      { item: "Administração", link: "/" },
      { item: "Assistência e Assessoria", link: "/" },
      { item: "Agricultura e Gestão Ambiental", link: "/" },
      { item: "Assistência Social", link: "/" },
      { item: "Cultura e Turismo", link: "/" },
      { item: "Educação", link: "/" },
      { item: "Finanças", link: "/" },
      { item: "Indústria e Comércio", link: "/" },
      { item: "Licitação e Compras", link: "/" },
      { item: "Saúde", link: "/" },
      { item: "Obras", link: "/" },
    ],
  },
  {
    title: "Publicações Oficiais",
    items: [
      { item: "Compras Diretas", link: "/" },
      { item: "Decretos", link: "/" },
      { item: "Demais Publicações Oficiais", link: "/" },
      { item: "Leis", link: "/" },
      { item: "Licitações", link: "/" },
      { item: "Contratos", link: "/" },
      { item: "Portarias", link: "/" },
      { item: "Concursos e Processos Seletivos", link: "/" },
    ],
  },
];