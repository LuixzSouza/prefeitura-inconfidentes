import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// PUT /api/licitacoes/{id} -> Atualiza uma licitação
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const data = await request.json();
  const licitacao = await prisma.licitacoes.update({
    where: { id: parseInt(params.id) },
    data,
  });
  return NextResponse.json(licitacao);
}

// DELETE /api/licitacoes/{id} -> Deleta uma licitação
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }
  
  await prisma.licitacoes.delete({ where: { id: parseInt(params.id) } });
  return new NextResponse(null, { status: 204 });
}