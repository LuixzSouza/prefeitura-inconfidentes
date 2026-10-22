// Popula o banco com um usuário administrador e dados de demonstração.
// Uso: npm run db:seed   (pode ser executado várias vezes com segurança)
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { noticiasDemo } from '../src/data/noticiasDemo.js';

const prisma = new PrismaClient();

const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL || 'admin@inconfidentes.mg.gov.br';
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'admin';

// Só insere quando a tabela está vazia, para não duplicar dados.
const seedSeVazio = async (model, nome, criar) => {
  if ((await prisma[model].count()) > 0) {
    console.log(`- ${nome}: já possui dados, pulando.`);
    return;
  }
  await criar();
  console.log(`✓ ${nome}`);
};

async function main() {
  const admin = await prisma.usuarios.upsert({
    where: { email: ADMIN_EMAIL },
    update: {},
    create: {
      nome: 'Administrador',
      email: ADMIN_EMAIL,
      senha: await bcrypt.hash(ADMIN_PASSWORD, 10),
      nivel_acesso: 'admin',
    },
  });
  console.log(`✓ Usuário admin: ${ADMIN_EMAIL}`);

  await seedSeVazio('secretarias', 'Secretarias', () =>
    prisma.secretarias.createMany({
      data: [
        { nome: 'Secretaria Municipal de Administração', sigla: 'SEMAD', responsavel_nome: 'Maria Aparecida Silva', email: 'administracao@inconfidentes.mg.gov.br', telefone: '(35) 3464-1144' },
        { nome: 'Secretaria Municipal de Saúde', sigla: 'SEMUS', responsavel_nome: 'João Carlos Pereira', email: 'saude@inconfidentes.mg.gov.br', telefone: '(35) 3464-1220' },
        { nome: 'Secretaria Municipal de Educação', sigla: 'SEMED', responsavel_nome: 'Ana Lúcia Ferreira', email: 'educacao@inconfidentes.mg.gov.br', telefone: '(35) 3464-1310' },
        { nome: 'Secretaria Municipal de Obras', sigla: 'SEMOB', responsavel_nome: 'Carlos Eduardo Souza', email: 'obras@inconfidentes.mg.gov.br' },
      ],
    })
  );
  const secretarias = await prisma.secretarias.findMany({ orderBy: { id: 'asc' } });
  const [administracao, saude, educacao] = secretarias;

  for (const noticia of noticiasDemo) {
    await prisma.noticias.upsert({
      where: { slug: noticia.slug },
      update: {},
      create: { ...noticia, data_publicacao: new Date(noticia.data_publicacao), status: 'publicado', usuario_id: admin.id },
    });
  }
  console.log(`✓ Notícias (${noticiasDemo.length})`);

  await seedSeVazio('servidores', 'Servidores', () =>
    prisma.servidores.createMany({
      data: [
        { nome: 'Fernanda Rocha', cargo: 'Assistente Administrativo', tipo_vinculo: 'efetivo', secretaria_id: administracao.id, data_admissao: new Date('2018-03-01') },
        { nome: 'Ricardo Alves', cargo: 'Enfermeiro', tipo_vinculo: 'efetivo', secretaria_id: saude.id, data_admissao: new Date('2020-07-15') },
        { nome: 'Patrícia Gomes', cargo: 'Professora', tipo_vinculo: 'contratado', secretaria_id: educacao.id, data_admissao: new Date('2024-02-05') },
      ],
    })
  );

  await seedSeVazio('licitacoes', 'Licitações', () =>
    prisma.licitacoes.createMany({
      data: [
        { numero: '001/2025', modalidade: 'Concorrência Pública', objeto: 'Concessão onerosa de uso da Lanchonete da Rodoviária Municipal.', data_abertura: new Date('2025-07-10T09:00:00'), secretaria_id: administracao.id },
        { numero: '002/2025', modalidade: 'Concorrência Pública', objeto: 'Concessão onerosa de uso da Lanchonete da Cancha de Bocha.', data_abertura: new Date('2025-07-12T09:00:00'), secretaria_id: administracao.id },
        { numero: '015/2025', modalidade: 'Pregão Eletrônico', objeto: 'Aquisição de medicamentos para a rede municipal de saúde.', data_abertura: new Date('2025-05-20T09:00:00'), status: 'finalizada', secretaria_id: saude.id },
        { numero: '008/2025', modalidade: 'Contratação Direta', objeto: 'Aquisição de material escolar para a rede municipal.', data_abertura: new Date('2025-04-02T09:00:00'), status: 'finalizada', secretaria_id: educacao.id },
      ],
    })
  );

  await seedSeVazio('legislacao', 'Legislação', () =>
    prisma.legislacao.createMany({
      data: [
        { tipo: 'lei', numero: 1571, ano: 2025, data_sancao: new Date('2025-03-14'), ementa: 'Institui a Ouvidoria Geral do Município de Inconfidentes e dá outras providências.', caminho_arquivo: '#' },
        { tipo: 'decreto', numero: 2232, ano: 2025, data_sancao: new Date('2025-07-10'), ementa: 'Aprova o Regimento Interno da Ouvidoria Geral do Município.', caminho_arquivo: '#' },
        { tipo: 'portaria', numero: 145, ano: 2025, data_sancao: new Date('2025-06-02'), ementa: 'Nomeia comissão permanente de licitação.', caminho_arquivo: '#' },
        { tipo: 'resolucao', numero: 12, ano: 2025, data_sancao: new Date('2025-05-18'), ementa: 'Dispõe sobre o calendário escolar da rede municipal de ensino.', caminho_arquivo: '#' },
      ],
    })
  );

  await seedSeVazio('concursos_processos_seletivos', 'Concursos', () =>
    prisma.concursos_processos_seletivos.createMany({
      data: [
        { numero: '001', ano: 2025, titulo: 'Processo Seletivo Simplificado - Saúde', descricao: 'Contratação temporária de profissionais da saúde.', data_abertura: new Date('2025-06-25'), caminho_edital: '#' },
        { numero: '002', ano: 2024, titulo: 'Concurso Público - Educação', descricao: 'Provimento de cargos efetivos na Educação.', data_abertura: new Date('2024-09-01'), status: 'finalizado', caminho_edital: '#' },
      ],
    })
  );

  await seedSeVazio('diario_oficial', 'Diário Oficial', () =>
    prisma.diario_oficial.createMany({
      data: [
        { edicao_numero: 312, data_publicacao: new Date('2025-06-25'), descricao: 'Publicação dos editais de concorrência 001 e 002/2025.', caminho_arquivo: '#' },
        { edicao_numero: 311, data_publicacao: new Date('2025-06-18'), descricao: 'Atos do Poder Executivo.', caminho_arquivo: '#' },
      ],
    })
  );

  await seedSeVazio('eventos', 'Eventos', () =>
    prisma.eventos.createMany({
      data: [
        { titulo: '1º Seminário de Empreendedorismo e Inovação', descricao: 'Palestras e oficinas gratuitas para empreendedores.', data_inicio: new Date('2025-07-01T19:00:00'), local: 'Centro Cultural de Inconfidentes' },
        { titulo: 'Festa do Padroeiro', descricao: 'Celebrações religiosas e quermesse na praça central.', data_inicio: new Date('2025-08-15T18:00:00'), data_fim: new Date('2025-08-17T23:00:00'), local: 'Praça da Matriz' },
      ],
    })
  );

  await seedSeVazio('paginas', 'Páginas', () =>
    prisma.paginas.create({
      data: { titulo: 'Sobre o Portal', slug: 'sobre-o-portal', conteudo: '<p>Portal oficial da Prefeitura Municipal de Inconfidentes.</p>' },
    })
  );

  await seedSeVazio('ouvidoria_solicitacoes', 'Ouvidoria', () =>
    prisma.ouvidoria_solicitacoes.createMany({
      data: [
        { protocolo: '202500000001', nome_cidadao: 'José da Silva', email_cidadao: 'jose@example.com', tipo_manifestacao: 'reclamacao', assunto: 'Buraco na Rua Principal', mensagem: 'Há um buraco grande na Rua Principal, próximo à praça, que oferece risco aos motoristas.', secretaria_destino_id: secretarias[3]?.id, status: 'em_analise' },
        { protocolo: '202500000002', nome_cidadao: 'Maria Souza', email_cidadao: 'maria@example.com', tipo_manifestacao: 'elogio', assunto: 'Atendimento no posto de saúde', mensagem: 'Gostaria de elogiar o excelente atendimento recebido no posto de saúde central.', secretaria_destino_id: saude.id, status: 'respondido' },
      ],
    })
  );
}

main()
  .then(() => console.log('\nSeed concluído com sucesso!'))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
