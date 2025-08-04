import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/secretarias -> Lista todas as secretarias
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Não autorizado" }, { status: 401 });

  const secretarias = await prisma.secretarias.findMany({
    orderBy: { nome: 'asc' },
  });
  return NextResponse.json(secretarias);
}

// POST /api/secretarias -> Cria uma nova secretaria
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin') { // Apenas admins podem criar secretarias
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const data = await request.json();
  const novaSecretaria = await prisma.secretarias.create({ data });
  return NextResponse.json(novaSecretaria, { status: 201 });
}