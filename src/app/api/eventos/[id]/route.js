import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET /api/eventos/{id} -> Busca um evento específico
export async function GET(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  
    const evento = await prisma.eventos.findUnique({ where: { id: parseInt(params.id) } });
    if (!evento) return NextResponse.json({ message: "Evento não encontrado" }, { status: 404 });
    return NextResponse.json(evento);
}

// PUT /api/eventos/{id} -> Atualiza um evento
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const data = await request.json();
  const evento = await prisma.eventos.update({
    where: { id: parseInt(params.id) },
    data,
  });
  return NextResponse.json(evento);
}

// DELETE /api/eventos/{id} -> Deleta um evento
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }
  
  await prisma.eventos.delete({ where: { id: parseInt(params.id) } });
  return new NextResponse(null, { status: 204 });
}