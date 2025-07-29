import Image from "next/image";
import Link from "next/link";

// LISTA DE NAVEGAÇÃO ATUALIZADA COM BASE NAS IMAGENS
const listNav = [
  { icon: "house", linkTxt: "Página Inicial", linkUrl: "#" },
  {
    icon: "municipio",
    linkTxt: "O Município",
    linkUrl: "#",
    dropdown: [
      { icon: "info", title: "Sobre o Município", description: "Tudo sobre nossa cidade, estrutura e mais.", url: "#" },
      { icon: "economia", title: "Economia", description: "Veja os dados econômicos e de desenvolvimento.", url: "#" },
      { icon: "prefeitos", title: "Galeria de Prefeitos", description: "Conheça os prefeitos que fizeram nossa história.", url: "#" },
      { icon: "historia", title: "História", description: "A linha do tempo e os fatos marcantes da cidade.", url: "#" },
      { icon: "turismo", title: "Turismo e Lazer", description: "Explore os pontos turísticos e opções de lazer.", url: "#" },
      { icon: "telefone", title: "Telefones Úteis", description: "Lista de contatos importantes para o cidadão.", url: "#" },
    ],
  },
  {
    icon: "governo",
    linkTxt: "O Governo",
    linkUrl: "#",
    dropdown: [
        { icon: "prefeitos", title: "prefeito", description: "Informações, contato e biografia do chefe do executivo.", url: "#" },
        { icon: "prefeitos", title: "vice-prefeitos", description: "Conheça o vice-prefeito e suas atribuições.", url: "#" },
        { icon: "secretarias", title: "Secretarias", description: "Navegue pela estrutura administrativa e seus secretários.", url: "#" },
    ],
  },
  {
    icon: "departamento",
    linkTxt: "Departamentos",
    linkUrl: "#",
    dropdown: [
      { icon: "admin", title: "Administração", description: "Informações sobre a gestão administrativa.", url: "#" },
      { icon: "assessoria", title: "Assistência e Assessoria", description: "Serviços de apoio e assessoria.", url: "#" },
      { icon: "agricultura", title: "Agricultura e Gestão Ambiental", description: "Políticas e ações para o setor.", url: "#" },
      { icon: "social", title: "Assistência Social", description: "Programas e serviços de apoio social.", url: "#" },
      { icon: "cultura", title: "Cultura e Turismo", description: "Acesse a agenda cultural e turística.", url: "#" },
      { icon: "educacao", title: "Educação", description: "Informações sobre escolas e programas.", url: "#" },
      { icon: "esporte", title: "Esporte e Lazer", description: "Atividades e espaços esportivos.", url: "#" },
      { icon: "leis", title: "Finanças", description: "Gestão financeira e orçamentária.", url: "#" },
      { icon: "industria", title: "Indústria e Comércio", description: "Incentivo e desenvolvimento local.", url: "#" },
      { icon: "compras", title: "Licitação e Compras", description: "Processos de licitação e compras.", url: "#" },
      { icon: "saude", title: "Saúde", description: "Encontre postos, hospitais e serviços.", url: "#" },
      { icon: "obras", title: "Obras", description: "Acompanhe as obras e infraestrutura.", url: "#" },
    ],
  },
  {
    icon: "publicacao_oficial",
    linkTxt: "Publicações Oficiais",
    linkUrl: "#",
    dropdown: [
      { icon: "compras-diretas", title: "Compras Diretas", description: "Consulte os processos de compra direta.", url: "#" },
      { icon: "leis", title: "Decretos", description: "Acesse os decretos municipais publicados.", url: "#" },
      { icon: "leis", title: "Demais Publicações Oficiais", description: "Outras publicações de interesse público.", url: "#" },
      { icon: "leis", title: "Leis", description: "Consulte a legislação municipal.", url: "#" },
      { icon: "leis", title: "Licitações", description: "Acompanhe os processos licitatórios.", url: "#" },
      { icon: "leis", title: "Portarias", description: "Veja as portarias emitidas pelo governo.", url: "#" },
      { icon: "leis", title: "Concursos e Processos Seletivos", description: "Editais e informações de concursos.", url: "#" },
    ],
  },
  { icon: "transparencia", linkTxt: "Transparência", linkUrl: "#" },
];

export function Header() {
  return (
    <header className="sticky top-0 w-full bg-green-800 text-white z-50">
      <nav className="relative flex justify-center">
        <ul className="flex items-center gap-4 px-4 pt-3">
          {listNav.map((item, index) => (
            <li key={index} className="group pb-4">
              {item.dropdown ? (
                <>
                  <button className="flex items-center gap-2 hover:bg-green-900 px-3 py-2 rounded transition-colors duration-200">
                    <Image width={24} height={24} alt="icon" src={`/icons/${item.icon}.svg`} className="invert" />
                    <span className="text-xs font-semibold">{item.linkTxt}</span>
                    <Image width={16} height={16} alt="icone seta para baixo" src={"/icons/arrow-down.svg"} className="ml-1 invert group-hover:rotate-180 transition-transform duration-300 ease-in-out" />
                  </button>

                  <div className="
                      absolute top-full left-0 w-full
                      opacity-0 pointer-events-none 
                      group-hover:opacity-100 group-hover:pointer-events-auto
                      transition-all duration-300 ease-in-out
                      transform-origin-top
                      "
                  >
                    <div className="bg-white text-gray-800 shadow-2xl">
                      <div className="max-w-7xl mx-auto px-8 py-10">
                        {/* 👇 AQUI ESTÁ A CORREÇÃO: troque <div> por <ul> */}
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8">
                          {item.dropdown.map((sub, subIndex) => (
                            <li key={subIndex} className="list-none">
                              <Link href={sub.url} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                <div className="bg-green-100 p-2 rounded-md shrink-0">
                                  <Image width={24} height={24} alt={sub.title} src={`/icons/${sub.icon}.svg`} />
                                </div>
                                <div>
                                  <h3 className="font-bold text-sm text-gray-900">{sub.title}</h3>
                                  <p className="text-xs text-gray-600 mt-1">{sub.description}</p>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {/* 👆 E feche com </ul> */}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <Link
                  href={item.linkUrl}
                  className="hover:bg-green-900 px-3 py-2 rounded transition flex items-center gap-2"
                >
                  <Image width={24} height={24} alt="icon" src={`/icons/${item.icon}.svg`} className="invert" />
                  <span className="text-xs font-semibold">{item.linkTxt}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}