import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/eventos -> Lista todos os eventos
export async function GET() {
  // Nota: Esta rota pode ser pública se você quiser listar eventos no site.
  // Para o painel, manteremos a verificação de sessão.
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Não autorizado" }, { status: 401 });

  const eventos = await prisma.eventos.findMany({
    orderBy: { data_inicio: 'desc' },
  });
  return NextResponse.json(eventos);
}

// POST /api/eventos -> Cria um novo evento
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const data = await request.json();
  const novoEvento = await prisma.eventos.create({ data });
  return NextResponse.json(novoEvento, { status: 201 });
}