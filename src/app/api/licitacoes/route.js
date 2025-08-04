import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/licitacoes -> Lista todas as licitações para o painel
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Não autorizado" }, { status: 401 });

  const licitacoes = await prisma.licitacoes.findMany({ orderBy: { data_abertura: 'desc' } });
  return NextResponse.json(licitacoes);
}

// POST /api/licitacoes -> Cria uma nova licitação
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') { // Exemplo de regra de acesso
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const data = await request.json();
  const novaLicitacao = await prisma.licitacoes.create({ data });
  return NextResponse.json(novaLicitacao, { status: 201 });
}