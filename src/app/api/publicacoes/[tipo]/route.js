import prisma from '@/lib/prisma'; // ⬅️ ALTERAÇÃO IMPORTANTE AQUI
import { NextResponse } from 'next/server';

// ❌ REMOVA a linha: const prisma = new PrismaClient()

const slugToEnumMap = {
  leis: 'lei',
  decretos: 'decreto',
  portarias: 'portaria',
  resolucoes: 'resolucao',
};

export async function GET(request, { params }) {
  const { tipo: slug } = await params;

  try {
    let data;
    const tipoEnum = slugToEnumMap[slug];

    if (tipoEnum) {
      data = await prisma.legislacao.findMany({
        where: { tipo: tipoEnum },
        orderBy: { data_sancao: 'desc' },
      });
    } else if (slug === 'licitacoes' || slug === 'compras-diretas') {
      const modalidadeFilter = slug === 'compras-diretas' ? { modalidade: 'Contratação Direta' } : {};
      data = await prisma.licitacoes.findMany({
        where: modalidadeFilter,
        orderBy: { data_abertura: 'desc' },
      });
    } else if (slug === 'concursos-e-processos-seletivos') {
      data = await prisma.concursos_processos_seletivos.findMany({
        orderBy: { data_abertura: 'desc' },
      });
    } else if (slug === 'diario-oficial') {
      data = await prisma.diario_oficial.findMany({
        orderBy: { data_publicacao: 'desc' },
      });
    } else {
      return NextResponse.json(
        { message: `Tipo de publicação '${slug}' não encontrado.` },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(`[API ERROR] /api/publicacoes/${slug}:`, error);
    return NextResponse.json(
      {
        message: 'Erro interno ao buscar publicações.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}