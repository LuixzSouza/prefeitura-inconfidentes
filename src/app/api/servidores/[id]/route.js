import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET /api/servidores/{id} -> Busca um servidor específico
export async function GET(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  
    const servidor = await prisma.servidores.findUnique({ where: { id: parseInt(params.id) } });
    if (!servidor) return NextResponse.json({ message: "Servidor não encontrado" }, { status: 404 });
    return NextResponse.json(servidor);
}

// PUT /api/servidores/{id} -> Atualiza um servidor
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const data = await request.json();
  const servidor = await prisma.servidores.update({
    where: { id: parseInt(params.id) },
    data,
  });
  return NextResponse.json(servidor);
}

// DELETE /api/servidores/{id} -> Deleta um servidor
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }
  
  await prisma.servidores.delete({ where: { id: parseInt(params.id) } });
  return new NextResponse(null, { status: 204 });
}