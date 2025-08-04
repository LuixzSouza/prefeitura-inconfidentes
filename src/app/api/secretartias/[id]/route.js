import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET /api/secretarias/{id} -> Busca uma secretaria específica
export async function GET(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  
    const secretaria = await prisma.secretarias.findUnique({ where: { id: parseInt(params.id) } });
    if (!secretaria) return NextResponse.json({ message: "Secretaria não encontrada" }, { status: 404 });
    return NextResponse.json(secretaria);
}

// PUT /api/secretarias/{id} -> Atualiza uma secretaria
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const data = await request.json();
  const secretaria = await prisma.secretarias.update({
    where: { id: parseInt(params.id) },
    data,
  });
  return NextResponse.json(secretaria);
}

// DELETE /api/secretarias/{id} -> Deleta uma secretaria
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }
  
  // Adicionar verificação para não deletar secretarias com licitações ou servidores vinculados
  const licitacoes = await prisma.licitacoes.count({ where: { secretaria_id: parseInt(params.id) } });
  if (licitacoes > 0) {
      return NextResponse.json({ message: "Não é possível excluir. Esta secretaria possui licitações vinculadas." }, { status: 400 });
  }

  await prisma.secretarias.delete({ where: { id: parseInt(params.id) } });
  return new NextResponse(null, { status: 204 });
}