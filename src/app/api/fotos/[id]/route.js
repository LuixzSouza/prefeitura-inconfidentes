import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// DELETE /api/fotos/{id} -> Deleta uma foto
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }
  
  await prisma.fotos.delete({ where: { id: parseInt(params.id) } });
  return new NextResponse(null, { status: 204 });
}