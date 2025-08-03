import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route"; // Importa as opções de auth

export async function GET() {
  // 1. Proteção da Rota: Verifica se o usuário está logado
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    // 2. Executa várias consultas ao banco de dados em paralelo para mais eficiência
    const [
      noticiasCount,
      licitacoesCount,
      secretariasCount,
      ouvidoriaCount,
      recentesNoticias,
    ] = await Promise.all([
      prisma.noticias.count({ where: { status: 'publicado' } }),
      prisma.licitacoes.count({ where: { status: 'aberta' } }),
      prisma.secretarias.count(),
      prisma.ouvidoria_solicitacoes.count({ where: { status: 'aberto' } }),
      prisma.noticias.findMany({
        take: 4, // Pega as 4 notícias mais recentes
        orderBy: { data_publicacao: 'desc' },
        select: { id: true, titulo: true, data_publicacao: true },
      }),
    ]);

    // 3. Formata os dados para enviar ao frontend
    const stats = {
      noticias: noticiasCount,
      licitacoes: licitacoesCount,
      secretarias: secretariasCount,
      ouvidoria: ouvidoriaCount,
    };

    // Retorna os dados como JSON
    return NextResponse.json({ stats, recentesNoticias });

  } catch (error) {
    console.error("[API STATS ERROR]", error);
    return NextResponse.json(
      { message: "Erro ao buscar estatísticas do painel." },
      { status: 500 }
    );
  }
}