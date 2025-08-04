import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/concursos -> Lista todos
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Não autorizado" }, { status: 401 });

  const concursos = await prisma.concursos_processos_seletivos.findMany({
    orderBy: { data_abertura: 'desc' },
  });
  return NextResponse.json(concursos);
}

// POST /api/concursos -> Cria um novo
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const data = await request.json();
  const novoConcurso = await prisma.concursos_processos_seletivos.create({ data });
  return NextResponse.json(novoConcurso, { status: 201 });
}