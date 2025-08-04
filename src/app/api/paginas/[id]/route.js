import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET /api/paginas/{id} -> Busca uma página específica
export async function GET(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  
    try {
      const pagina = await prisma.paginas.findUnique({
        where: { id: parseInt(params.id) },
      });
      if (!pagina) return NextResponse.json({ message: "Página não encontrada" }, { status: 404 });
      return NextResponse.json(pagina);
    } catch (error) {
      return NextResponse.json({ message: "Erro ao buscar página." }, { status: 500 });
    }
}

// PUT /api/paginas/{id} -> Atualiza uma página
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const data = await request.json();
  const pagina = await prisma.paginas.update({
    where: { id: parseInt(params.id) },
    data,
  });
  return NextResponse.json(pagina);
}

// DELETE /api/paginas/{id} -> Deleta uma página
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin') { // Apenas admins podem deletar páginas
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }
  
  await prisma.paginas.delete({ where: { id: parseInt(params.id) } });
  return new NextResponse(null, { status: 204 });
}