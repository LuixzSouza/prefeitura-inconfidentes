export const listNav = [
  { icon: "house", linkTxt: "Página Inicial", linkUrl: "/" },
  {
    icon: "municipio",
    linkTxt: "O Município",
    linkUrl: "#", // Apenas abre o menu
    dropdown: [
      { icon: "info", title: "Sobre o Município", description: "Tudo sobre nossa cidade, estrutura e mais.", url: "/municipio/sobre-o-municipio" },
      { icon: "economia", title: "Economia", description: "Veja os dados econômicos e de desenvolvimento.", url: "/municipio/economia" },
      { icon: "prefeitos", title: "Galeria de Prefeitos", description: "Conheça os prefeitos que fizeram nossa história.", url: "/municipio/galeria-prefeitos" },
      { icon: "historia", title: "História", description: "A linha do tempo e os fatos marcantes da cidade.", url: "/municipio/historia" },
      { icon: "turismo", title: "Turismo e Lazer", description: "Explore os pontos turísticos e opções de lazer.", url: "/municipio/turismo-e-lazer" },
      { icon: "telefone", title: "Telefones Úteis", description: "Lista de contatos importantes para o cidadão.", url: "/municipio/telefones-uteis" },
    ],
  },
  {
    icon: "governo",
    linkTxt: "O Governo",
    linkUrl: "#", // Apenas abre o menu
    dropdown: [
        { icon: "prefeitos", title: "Prefeito", description: "Informações, contato e biografia do chefe do executivo.", url: "/governo/prefeito" },
        { icon: "prefeitos", title: "Vice-Prefeito", description: "Conheça o vice-prefeito e suas atribuições.", url: "/governo/vice-prefeito" },
        { icon: "secretarias", title: "Secretarias", description: "Navegue pela estrutura administrativa e seus secretários.", url: "/governo/secretarias" },
    ],
  },
  {
    icon: "departamento",
    linkTxt: "Departamentos",
    linkUrl: "/departamentos", // Link principal para a listagem
    dropdown: [
      { icon: "admin", title: "Administração", url: "/departamentos/administracao", description: "Gestão de recursos, pessoal e patrimônio." },
      { icon: "assessoria", title: "Assistência e Assessoria", url: "/departamentos/assistencia-e-assessoria", description: "Suporte técnico e consultivo à gestão." },
      { icon: "agricultura", title: "Agricultura e Gestão Ambiental", url: "/departamentos/agricultura-e-gestao-ambiental", description: "Apoio ao produtor e preservação ambiental." },
      { icon: "social", title: "Assistência Social", url: "/departamentos/assistencia-social", description: "Programas de apoio à comunidade." },
      // Adicionei a URL para todos os outros departamentos seguindo o padrão
      { icon: "cultura", title: "Cultura e Turismo", url: "/departamentos/cultura-e-turismo", description: "Promoção de eventos e do turismo local." },
      { icon: "educacao", title: "Educação", url: "/departamentos/educacao", description: "Gestão da rede municipal de ensino." },
      { icon: "esporte", title: "Esporte e Lazer", url: "/departamentos/esporte-e-lazer", description: "Incentivo a práticas esportivas." },
      { icon: "leis", title: "Finanças", url: "/departamentos/financas", description: "Controle orçamentário e tributário." },
      { icon: "industria", title: "Indústria e Comércio", url: "/departamentos/industria-e-comercio", description: "Fomento ao desenvolvimento econômico." },
      { icon: "compras", title: "Licitação e Compras", url: "/departamentos/licitacao-e-compras", description: "Processos de aquisições e contratações." },
      { icon: "saude", title: "Saúde", url: "/departamentos/saude", description: "Gestão da saúde pública municipal." },
      { icon: "obras", title: "Obras", url: "/departamentos/obras", description: "Execução de obras e manutenção urbana." },
    ],
  },
  {
    icon: "publicacao_oficial",
    linkTxt: "Publicações Oficiais",
    linkUrl: "/publicacoes-oficiais", // Link principal para o Hub
    dropdown: [
      { icon: "compras-diretas", title: "Compras Diretas", description: "Consulte os processos de compra direta.", url: "/publicacoes-oficiais/compras-diretas" },
      { icon: "leis", title: "Decretos", description: "Acesse os decretos municipais publicados.", url: "/publicacoes-oficiais/decretos" },
      { icon: "leis", title: "Leis", description: "Consulte a legislação municipal.", url: "/publicacoes-oficiais/leis" },
      { icon: "leis", title: "Licitações", description: "Acompanhe os processos licitatórios.", url: "/publicacoes-oficiais/licitacoes" },
      { icon: "leis", title: "Portarias", description: "Veja as portarias emitidas pelo governo.", url: "/publicacoes-oficiais/portarias" },
      { icon: "leis", title: "Concursos e Processos Seletivos", description: "Editais e informações de concursos.", url: "/publicacoes-oficiais/concursos-e-processos-seletivos" },
    ],
  },
  { icon: "transparencia", linkTxt: "Transparência", linkUrl: "/transparencia" },
];

export const popularLinks = [
    { text: 'Portal da Transparência', href: '/transparencia' },
    { text: 'Secretarias', href: '/governo/secretarias' },
    { text: 'Departamentos', href: '/departamentos' },
    { text: 'Licitações', href: '/publicacoes-oficiais/licitacoes' },
    { text: 'Telefones Úteis', href: '/municipio/telefones-uteis' },
    { text: 'História do Município', href: '/municipio/historia' },
];