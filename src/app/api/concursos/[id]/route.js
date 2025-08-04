import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// PUT /api/concursos/{id} -> Atualiza um
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const data = await request.json();
  const concurso = await prisma.concursos_processos_seletivos.update({
    where: { id: parseInt(params.id) },
    data,
  });
  return NextResponse.json(concurso);
}

// DELETE /api/concursos/{id} -> Deleta um
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }
  
  await prisma.concursos_processos_seletivos.delete({ where: { id: parseInt(params.id) } });
  return new NextResponse(null, { status: 204 });
}