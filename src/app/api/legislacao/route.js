import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/legislacao -> Lista todos os itens para o painel
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Não autorizado" }, { status: 401 });

  const legislacao = await prisma.legislacao.findMany({
    orderBy: [{ ano: 'desc' }, { numero: 'desc' }],
  });
  return NextResponse.json(legislacao);
}

// POST /api/legislacao -> Cria um novo item
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const data = await request.json();
  const novoItem = await prisma.legislacao.create({ data });
  return NextResponse.json(novoItem, { status: 201 });
}