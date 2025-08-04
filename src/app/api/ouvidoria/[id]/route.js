import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET /api/ouvidoria/{id} -> Busca uma solicitação específica
export async function GET(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  
    const solicitacao = await prisma.ouvidoria_solicitacoes.findUnique({
        where: { id: parseInt(params.id) },
        include: { secretaria_destino: { select: { nome: true } } },
    });

    if (!solicitacao) return NextResponse.json({ message: "Solicitação não encontrada" }, { status: 404 });
    return NextResponse.json(solicitacao);
}

// PUT /api/ouvidoria/{id} -> Atualiza o status de uma solicitação
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const { status } = await request.json();
  if (!status) {
      return NextResponse.json({ message: "O status é obrigatório." }, { status: 400 });
  }

  const solicitacao = await prisma.ouvidoria_solicitacoes.update({
    where: { id: parseInt(params.id) },
    data: { status },
  });
  return NextResponse.json(solicitacao);
}