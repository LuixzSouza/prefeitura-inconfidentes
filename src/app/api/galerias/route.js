import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/galerias -> Lista todas as galerias
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Não autorizado" }, { status: 401 });

  const galerias = await prisma.galerias.findMany({
    orderBy: { data_evento: 'desc' },
    include: { _count: { select: { fotos: true } } }, // Inclui a contagem de fotos
  });
  return NextResponse.json(galerias);
}

// POST /api/galerias -> Cria uma nova galeria
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const data = await request.json();
  const novaGaleria = await prisma.galerias.create({ data });
  return NextResponse.json(novaGaleria, { status: 201 });
}