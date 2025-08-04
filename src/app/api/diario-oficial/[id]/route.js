import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// PUT /api/diario-oficial/{id} -> Atualiza uma edição
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const data = await request.json();
  const edicao = await prisma.diario_oficial.update({
    where: { id: parseInt(params.id) },
    data,
  });
  return NextResponse.json(edicao);
}

// DELETE /api/diario-oficial/{id} -> Deleta uma edição
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }
  
  await prisma.diario_oficial.delete({ where: { id: parseInt(params.id) } });
  return new NextResponse(null, { status: 204 });
}