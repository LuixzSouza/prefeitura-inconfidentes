// app/data/publicacoesData.js

const createDate = (day, month, year) => new Date(year, month - 1, day);

export const publicacoes = [
  // Decretos (usarão a visualização de 'leis-e-atos')
  { id: 1, tipo: 'decretos', numero: '2.306/2025', ementa: 'DISPÕE SOBRE A DESIGNAÇÃO DE MEMBROS PARA COMPOR COMISSÃO DE AVALIAÇÃO DE BENS IMÓVEIS', data_publicacao: createDate(29, 7, 2025), url_documento: '#' },
  { id: 2, tipo: 'decretos', numero: '2.235/2025', ementa: 'ABRE CRÉDITO SUPLEMENTAR', data_publicacao: createDate(30, 7, 2025), url_documento: '#' },
  
  // Leis
  { id: 3, tipo: 'leis', numero: '1.501/2025', ementa: 'Institui o novo Plano Diretor do município de Inconfidentes.', data_publicacao: createDate(15, 7, 2025), url_documento: '#' },

  // Licitações
  { id: 5, tipo: 'licitacoes', modalidade: 'Adesão a Ata de Registro de Preço', numero: '009/2025', objeto: 'Adesão da Ata de Registro de Preços nº 160/2025, Pregão Eletrônico nº 9005/2025, Processo Administr...', data_publicacao: createDate(28, 7, 2025), valor_estimado: 202000.00, valor_homologado: 202000.00, situacao: 'Finalizado' },
  { id: 6, tipo: 'licitacoes', modalidade: 'Pregão Presencial', numero: '022/2025', objeto: 'SISTEMA DE REGISTRO DE PREÇOS (SRP) PARA LOCAÇÃO DE BRINQUEDOS INFLÁVEIS, CAMA ELÁSTICA, BARRACA DE ...', data_publicacao: createDate(17, 7, 2025), valor_estimado: 383667.20, valor_homologado: null, situacao: 'Aberto' },
  { id: 7, tipo: 'licitacoes', modalidade: 'Contratação Direta', numero: '017/2025', objeto: 'FORNECIMENTO E INSTALAÇÃO DE DIVISÓRIAS.', data_publicacao: createDate(17, 7, 2025), valor_estimado: 8166.67, valor_homologado: 8166.67, situacao: 'Finalizado' },
  { id: 52, tipo: 'licitacoes', modalidade: 'Pregão Presencial', numero: '024/2025', objeto: 'Sistema de registro de preços - SRP para aquisição de fórmulas alimentares/leites especiais à pacien...', data_publicacao: createDate(11, 7, 2025), valor_estimado: 2872635.00, valor_homologado: null, situacao: 'Em andamento' },

  // Portarias (usarão a visualização de 'leis-e-atos')
  { id: 8, tipo: 'portarias', numero: '108/2025', ementa: 'EXONERA ASSESSOR ESPECIAL DE SAÚDE', data_publicacao: createDate(29, 7, 2025), url_documento: '#' },
  { id: 9, tipo: 'portarias', numero: '107/2025', ementa: 'EXONERA SERVIDOR A PEDIDO', data_publicacao: createDate(29, 7, 2025), url_documento: '#' },
];

// Mapeamento dos tipos para os componentes de visualização
// app/data/publicacoesData.js
export const viewMapping = {
  'licitacoes': 'LicitacoesView',
  'compras-diretas': 'LicitacoesView', // Compras diretas usarão a mesma tabela de licitações
  'decretos': 'LeisEAtosView',
  'leis': 'LeisEAtosView',
  'portarias': 'LeisEAtosView',
  'concursos-e-processos-seletivos': 'ConcursosView', // <<< ADICIONE ESTA LINHA
};

// Lista de tipos para a visualização de Leis e Atos
export const tiposLeisEAtos = ['Decreto', 'Lei', 'Portaria', 'Edital'];

// Lista de modalidades de licitação
export const modalidadesLicitacao = ['Pregão Presencial', 'Contratação Direta', 'Adesão a Ata de Registro de Preço', 'Tomada de Preços'];

// Lista de situações de licitação
export const situacoesLicitacao = ['Aberto', 'Em andamento', 'Finalizado', 'Cancelado'];