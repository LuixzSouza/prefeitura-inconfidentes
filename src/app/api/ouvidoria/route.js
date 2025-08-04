import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/ouvidoria -> Lista todas as solicitações
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Não autorizado" }, { status: 401 });

  const solicitacoes = await prisma.ouvidoria_solicitacoes.findMany({
    orderBy: { created_at: 'desc' },
    include: { secretaria_destino: { select: { nome: true } } },
  });
  return NextResponse.json(solicitacoes);
}