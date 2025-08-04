import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/servidores -> Lista todos os servidores
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Não autorizado" }, { status: 401 });

  const servidores = await prisma.servidores.findMany({
    orderBy: { nome: 'asc' },
    include: { secretaria: { select: { nome: true } } }, // Inclui o nome da secretaria
  });
  return NextResponse.json(servidores);
}

// POST /api/servidores -> Cria um novo servidor
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const data = await request.json();
  const novoServidor = await prisma.servidores.create({ data });
  return NextResponse.json(novoServidor, { status: 201 });
}