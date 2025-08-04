import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// PUT /api/legislacao/{id} -> Atualiza um item
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const data = await request.json();
  const item = await prisma.legislacao.update({
    where: { id: parseInt(params.id) },
    data,
  });
  return NextResponse.json(item);
}

// DELETE /api/legislacao/{id} -> Deleta um item
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }
  
  await prisma.legislacao.delete({ where: { id: parseInt(params.id) } });
  return new NextResponse(null, { status: 204 });
}