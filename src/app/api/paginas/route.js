import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/paginas -> Lista todas as páginas para o painel
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Não autorizado" }, { status: 401 });

  const paginas = await prisma.paginas.findMany({
    orderBy: { titulo: 'asc' },
  });
  return NextResponse.json(paginas);
}

// POST /api/paginas -> Cria uma nova página
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const data = await request.json();
  const novaPagina = await prisma.paginas.create({ data });
  return NextResponse.json(novaPagina, { status: 201 });
}