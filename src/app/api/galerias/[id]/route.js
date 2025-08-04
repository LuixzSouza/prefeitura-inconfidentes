import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// GET /api/galerias/{id} -> Busca uma galeria e suas fotos
export async function GET(request, { params }) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  
    const galeria = await prisma.galerias.findUnique({
        where: { id: parseInt(params.id) },
        include: { fotos: { orderBy: { id: 'asc' } } }, // Inclui as fotos da galeria
    });
    if (!galeria) return NextResponse.json({ message: "Galeria não encontrada" }, { status: 404 });
    return NextResponse.json(galeria);
}

// PUT /api/galerias/{id} -> Atualiza uma galeria
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const data = await request.json();
  const galeria = await prisma.galerias.update({
    where: { id: parseInt(params.id) },
    data,
  });
  return NextResponse.json(galeria);
}

// DELETE /api/galerias/{id} -> Deleta uma galeria (e suas fotos em cascata)
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }
  
  await prisma.galerias.delete({ where: { id: parseInt(params.id) } });
  return new NextResponse(null, { status: 204 });
}