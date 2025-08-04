import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/diario-oficial -> Lista todas as edições
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Não autorizado" }, { status: 401 });

  const edicoes = await prisma.diario_oficial.findMany({
    orderBy: { data_publicacao: 'desc' },
  });
  return NextResponse.json(edicoes);
}

// POST /api/diario-oficial -> Cria uma nova edição
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const data = await request.json();
  const novaEdicao = await prisma.diario_oficial.create({ data });
  return NextResponse.json(novaEdicao, { status: 201 });
}