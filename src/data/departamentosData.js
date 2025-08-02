// app/data/departamentosData.js

import { 
  Landmark, Users, Sprout, HandHeart, Palette, School, Trophy, DollarSign, Factory, ShoppingCart, HeartPulse, Wrench 
} from 'lucide-react';

export const departamentosData = [
  // #1 ADMINISTRAÇÃO
  {
    slug: 'administracao',
    nome: 'Administração',
    icone: <Landmark />,
    responsavel: 'Marcos Michell de Mira',
    horario: '12h às 18h',
    telefone: '(035) 3464-1015 | Ramal: 214',
    email: 'administracao@inconfidentes.mg.gov.br',
    endereco: 'Prédio Municipal – Rua Engenheiro Alvares Maciel, 190 – Centro',
    linkCompetencias: '#', // Substituir pelo link real
    setores: [
      {
        nome: 'Setor de Pessoal',
        responsavel: 'Estela Maria Sobreiro',
        horario: '12h às 18h',
        telefone: '(035) 3464-1015 | Ramal: 224',
        email: 'dp@inconfidentes.mg.gov.br',
        endereco: 'Prédio Municipal – Rua Engenheiro Alvares Maciel, 190 – Centro',
      }
    ]
  },
  // #2 ASSISTÊNCIA E ASSESSORIA
  {
    slug: 'assistencia-e-assessoria',
    nome: 'Assistência e Assessoria',
    icone: <Users />,
    horario: '12h às 18h',
    telefone: '(035) 3464-1015 | Ramal: 233',
    email: 'assessoria@inconfidentes.mg.gov.br',
    endereco: 'Prédio Municipal – Rua Engenheiro Alvares Maciel, 190 – Centro',
    linkCompetencias: '#',
    secoesEspeciais: [
      {
        titulo: 'Órgãos de Assistência e Assessoria Direta',
        tipo: 'lista-pessoas',
        itens: [
          { cargo: 'Prefeito', nome: 'Claudinei Tunes Pereira' },
          { cargo: 'Vice-Prefeito', nome: 'Décio Bonamichi Júnior' },
          { cargo: 'Controle Interno', nome: 'Marçal Costa Tunes' },
          { cargo: 'Assessoria Jurídica', nome: 'Flávio Tadeu Ribeiro' },
          { cargo: 'Assessoria do Prefeito', nome: 'Amanda Baquero, Admilson Constantini e Lucas Correa' },
        ]
      },
      {
        titulo: 'Editais Relacionados',
        tipo: 'lista-documentos',
        itens: [
          { texto: 'Edital 001/2024 – 11ª Conferência Municipal de Assistência Social', url: '#' }
        ]
      }
    ]
  },
  // #3 AGRICULTURA E GESTÃO AMBIENTAL
  {
    slug: 'agricultura-e-gestao-ambiental',
    nome: 'Agricultura e Gestão Ambiental',
    icone: <Sprout />,
    responsavel: 'Alexandre Lopes Moreira',
    horario: '12h às 18h',
    telefone: '(035) 3464-1015 | Ramal: 233',
    email: 'meioambiente@inconfidentes.mg.gov.br',
    endereco: 'Prédio Municipal – Rua Engenheiro Alvares Maciel, 190 – Centro',
    linkCompetencias: '#',
    setores: [
      {
        nome: 'Setor de Gestão Ambiental',
        responsavel: 'Rafaela Lopes Moreira',
        horario: '12h às 18h',
        telefone: '(035) 3464-1015 | Ramal: 233',
        email: 'agricultura@inconfidentes.mg.gov.br',
        endereco: 'Prédio Municipal – Rua Engenheiro Alvares Maciel, 190 – Centro',
      },
      {
        nome: 'Setor de Agricultura',
        responsavel: 'Flávia de Souza Veronezzi Bastos',
        horario: '12h às 18h',
        telefone: '(035) 3464-1015 | Ramal: 233',
        email: 'agricultura@inconfidentes.mg.gov.br',
        endereco: 'Prédio Municipal – Rua Engenheiro Alvares Maciel, 190 – Centro',
      }
    ],
    secoesEspeciais: [
      { titulo: 'Plano Municipal de Saneamento Básico', tipo: 'lista-documentos', itens: [{ texto: 'Clique para visualizar', url: '#' }] },
      {
        titulo: 'CODEMA',
        tipo: 'grupo-documentos',
        subsecoes: [
          {
            titulo: 'Instrumentos Legais',
            itens: [
              { texto: 'Lei Nº 1434/2022', url: '#' },
              { texto: 'Portaria Nº 034/2022', url: '#' },
              { texto: 'Decreto Nº 1902/2022', url: '#' },
              { texto: 'PORTARIA 069/2021', url: '#' },
              { texto: 'Lei 1274/2017', url: '#' },
              { texto: 'Lei 515/1985', url: '#' },
            ]
          },
          {
            titulo: 'Substituição de Árvores',
            itens: [
              { texto: 'Passo a passo', url: '#' },
              { texto: 'Requerimento', url: '#' },
            ]
          },
          {
            titulo: 'Atas das Reuniões',
            itens: [
              { texto: 'Ata de Reunião – 18/11/2024', url: '#' },
              { texto: 'Ata de Reunião – 27/08/2024', url: '#' },
              { texto: 'Ata de Reunião – 18/06/2024', url: '#' },
              { texto: 'E mais 15 atas...', url: '#' },
            ]
          }
        ]
      }
    ]
  },
  // #4 ASSISTÊNCIA SOCIAL
  {
    slug: 'assistencia-social',
    nome: 'Assistência Social',
    icone: <HandHeart />,
    responsavel: 'Silvia Fátima Oliveira',
    horario: 'Segunda a sexta-feira, das 8h às 17h',
    telefone: '(035) 3464-2025',
    email: 'asocial@inconfidentes.mg.gov.br',
    endereco: 'CRAS – Rua Sargento Mor Toledo Piza, 178 – Centro',
    linkCompetencias: '#',
    secoesEspeciais: [
      { titulo: 'Plano de Inventário do Patrimônio Cultural', tipo: 'lista-documentos', itens: [{ texto: 'Clique para visualizar', url: '#' }] }
    ]
  },
  // #5 EDUCAÇÃO
  {
    slug: 'educacao',
    nome: 'Educação',
    icone: <School />,
    responsavel: 'Adriana Dalo Rodrigues Barbosa',
    horario: '7h às 17h',
    telefone: '(035) 3464-1590',
    email: 'educacao@inconfidentes.mg.gov.br',
    endereco: 'Rua Bárbara Heliodora, 507 – Centro',
    linkCompetencias: '#',
    setores: [
        { nome: 'Centro de Educação Infantil Municipal Reino Encantado Irineu Doná', responsavel: 'Suelen Jamberg Bonamichi Pires', horario: '7h às 17h', telefone: '(035) 3464-1153' },
        { nome: 'Creche Municipal Cônego Augusto José de Carvalho', responsavel: 'Paula Batista da Silva', horario: '7h às 17h', telefone: '(035) 3464-1124' },
        { nome: 'Centro Educacional Municipal Américo Bonamichi', responsavel: 'Priscila Alexandre de Roma', horario: '7h às 17h', telefone: '(035) 3464-1372' },
        { nome: 'Escola Municipal Rogério Bernardes de Souza', responsavel: 'Carmélia Josefina Ana da Silva', horario: '7h às 17h' },
        { nome: 'Assessoria Especial de Educação', responsavel: 'Mickaella Cristiany Alves da Cunha', horario: '7h às 17h' },
    ],
    secoesEspeciais: [
        { titulo: 'Editais Relacionados', tipo: 'lista-documentos', itens: [{ texto: 'Edital 004/2025', url: '#' }] }
    ]
  },
  // #6 ESPORTE E LAZER
  {
    slug: 'esporte-e-lazer',
    nome: 'Esporte e Lazer',
    icone: <Trophy />,
    responsavel: 'Tiago Felipe de Freitas (interino)',
    horario: '12h às 18h',
    telefone: '(035) 3464-1015',
    email: 'esporte@inconfidentes.mg.gov.br',
    endereco: 'Prédio Municipal – Rua Engenheiro Alvares Maciel, 190 – Centro',
    linkCompetencias: '#',
    setores: [
        { nome: 'Setor de Lazer', responsavel: 'Tiago Felipe de Freitas (interino)', horario: '12h às 18h', telefone: '(035) 3464-1015', email: 'esporte@inconfidentes.mg.gov.br', endereco: 'Prédio Municipal – Rua Engenheiro Alvares Maciel, 190 – Centro' }
    ]
  },
  // #7 FINANÇAS
  {
    slug: 'financas',
    nome: 'Finanças',
    icone: <DollarSign />,
    responsavel: 'Francisco Volney Costa',
    horario: '12h às 18h',
    telefone: '(035) 3464-1015 | Ramal: 209',
    whatsapp: '35997086862',
    email: 'fiscalizacao@inconfidentes.mg.gov.br',
    endereco: 'Prédio Municipal – Rua Engenheiro Alvares Maciel, 190 – Centro',
    linkCompetencias: '#',
    setores: [
        { nome: 'Setor de Tributação e fiscalização', responsavel: 'Mara Heid Moreira da Rosa', horario: '12h às 18h', telefone: '(035) 3464-1015 | Ramal: 212', whatsapp: '35997086862', email: 'tributacao@inconfidentes.mg.gov.br' },
        { nome: 'Setor de Contabilidade, Planejamento e Orçamento', responsavel: 'Não informado', horario: '12h às 18h', telefone: '(035) 3464-1015 | Ramal: 223', email: 'contabilidade@inconfidentes.mg.gov.br' },
        { nome: 'Setor de Tesouraria', responsavel: 'Ediel Alberti', horario: '12h às 18h', telefone: '(035) 3464-1015 | Ramal: 229', email: 'tesouraria@inconfidentes.mg.gov.br' },
    ]
  },
   // #8 INDÚSTRIA, COMÉRCIO, TURISMO E CULTURA
  {
    slug: 'industria-comercio-turismo-e-cultura',
    nome: 'Indústria, Comércio, Turismo e Cultura',
    icone: <Factory />,
    responsavel: 'Décio Bonamichi Júnior',
    horario: '12h às 18h',
    telefone: '(035) 3464-1015 | Ramal: 214',
    email: 'culturaeturismo@inconfidentes.mg.gov.br',
    endereco: 'Prédio Municipal – Rua Engenheiro Alvares Maciel, 190 – Centro',
    linkCompetencias: '#',
    setores: [
        { nome: 'Setor de Indústria, Comércio e Turismo', responsavel: 'Camila Ferreira dos Santos Vilas Boas', horario: '12h às 18h', telefone: '(035) 3464-1015 | Ramal: 214', email: 'culturaeturismo@inconfidentes.mg.gov.br' },
        { nome: 'Setor de Cultura', responsavel: 'Djalma Lopes Abs', horario: '12h às 18h', telefone: '(035) 3464-1015 | Ramal: 214', email: 'culturaeturismo@inconfidentes.mg.gov.br' },
        { nome: 'Assessoria especial de Comunicação', responsavel: 'Iago Faria Vilas Boas', horario: '12h às 18h', telefone: '(035) 3464-1015 | Ramal: 233', email: 'assessoria@inconfidentes.mg.gov.br' },
    ]
  },
  // #9 LICITAÇÃO E COMPRAS
  {
    slug: 'licitacao-e-compras',
    nome: 'Licitação e Compras',
    icone: <ShoppingCart />,
    responsavel: 'Rodnei Francisco de Oliveira',
    horario: '12h às 18h',
    telefone: '(035) 3464-1015 | Ramal: 217',
    email: 'licitacao@inconfidentes.mg.gov.br',
    endereco: 'Prédio Municipal – Rua Engenheiro Alvares Maciel, 190 – Centro',
    competenciasTexto: 'O departamento de Compras, Licitação e Contratos é responsável pelo processamento das aquisições de materiais e equipamentos e das contratações de serviços e obras mediante processos licitatórios ou compras diretas (dispensas e inexigibilidades de licitação), bem como atividades correlatas.',
    setores: [
        { nome: 'Setor de Compras', responsavel: 'Telma Lucia Moreira Cezar', horario: '12h às 18h', telefone: '(035) 3464-1015 | Ramal: 227', email: 'compras@inconfidentes.mg.gov.br' },
        { nome: 'Setor de Materiais', responsavel: 'Juliana Mariana Cézar de Góes', horario: '12h às 18h', telefone: '(035) 3464-1015 | Ramal: 227', email: 'compras@inconfidentes.mg.gov.br' },
    ],
    secoesEspeciais: [
        { titulo: 'Acesso Rápido', tipo: 'lista-documentos', itens: [
            { texto: 'Acesse as licitações', url: '#' },
            { texto: 'Acesse as compras diretas', url: '#' }
        ] }
    ]
  },
  // #10 SAÚDE
  {
    slug: 'saude',
    nome: 'Saúde',
    icone: <HeartPulse />,
    responsavel: 'Richard Guidi Doná',
    horario: 'Segunda a sexta-feira, das 7h às 18h',
    telefone: '(035) 3464-1293 / (035) 3464-1040 / (35) 9-9981-1999',
    email: 'saude@inconfidentes.mg.gov.br',
    endereco: 'Posto de Saúde – Rua Engenheiro Alvares Maciel, 168 – Centro',
    linkCompetencias: '#',
    setores: [
        { nome: 'UBS – Unidade Básica de Saúde Mario Pistelli (posto)', horario: 'Segunda a sexta-feira, das 7h às 17h', telefone: '(035) 3464-1886 / (35) 9-9704-2827', endereco: 'Posto de Saúde – Rua Engenheiro Alvares Maciel, 168 – Centro' },
        { nome: 'ESF/ PSF Vereador Miguel Vilas Boas', horario: 'das 7h às 19h', telefone: '(035) 3464-2023 / (35) 9-9871-4922', endereco: 'PSF – Rua Padre Oliveira Rolim, 99 – Centro' },
        { nome: 'Ambulância', horario: '24 horas, todos os dias', telefone: '(035) 3464-2028 / (35) 9-9981-1999' },
        { nome: 'Odontologia', horario: 'terça e sexta das 7h às 11h30 / seg, qua, qui das 7h às 17h', telefone: '(035) 3464-1794', endereco: 'Rua Engenheiro Alvares Maciel, 168 – Centro' },
        { nome: 'Epidemiologia / Vigilância Sanitária', horario: 'Segunda a Sexta-feira das 7h às 17h', telefone: '(035) 3464-2014', endereco: 'Rua Engenheiro Alvares Maciel, 168 – Centro' },
        { nome: 'Sala de Vacinas', horario: 'Segunda a Sexta-feira das 7h às 19h', telefone: '(035) 3464-2060', endereco: 'Rua Engenheiro Alvares Maciel, 168 – Centro' },
        { nome: 'Farmácia Básica', horario: 'Segunda a Sexta-feira das 7h às 19h', telefone: '(035) 3464-2013', endereco: 'Avenida Armindo Scheffer, 49- Centro' },
        { nome: 'Transporte e Marcação de Exames', horario: 'Segunda a Sexta-feira das 7h às 12h e das 13h às 16h', telefone: '(035) 3464-1040', endereco: 'Rua Engenheiro Alvares Maciel, 168 – Centro' },
    ],
    secoesEspeciais: [
        { titulo: 'Regimento Interno da VI Conferência Municipal de Saúde', tipo: 'lista-documentos', itens: [{ texto: 'Clique aqui para visualizar', url: '#' }] },
        { titulo: 'Relação de Medicamentos', tipo: 'lista-documentos', itens: [{ texto: 'RELAÇÃO DE MEDICAMENTOS DA FARMÁCIA MUNICIPAL 2024', url: '#' }] }
    ]
  },
   // #11 OBRAS
  {
    slug: 'obras',
    nome: 'Obras',
    icone: <Wrench />,
    responsavel: 'Carlos Eduardo de Souza',
    horario: '12h às 18h',
    telefone: '(035) 3464-1015 | Ramal: 229',
    email: 'obras@inconfidentes.mg.gov.br',
    endereco: 'Prédio Municipal – Rua Engenheiro Alvares Maciel, 190 – Centro',
    linkCompetencias: '#',
    setores: [
        { nome: 'Setor de Viação e Urbanismo', responsavel: 'Guilherme Francisco da Silva', horario: '12h às 18h', telefone: '(035) 3464-2028', email: 'viacao@inconfidentes.mg.gov.br' },
        { nome: 'Setor de Serviços Públicos', responsavel: 'Wilson José de Andrade', horario: '12h às 18h', telefone: '(035) 3464-2028' },
        { nome: 'Setor de Obras', responsavel: 'Gilmar Joaquim da Silva', horario: '12h às 18h', telefone: '(035) 3464-1015 | Ramal: 229', email: 'obras@inconfidentes.mg.gov.br' },
    ]
  },
  // Adicione os outros departamentos aqui seguindo a mesma estrutura
];