import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// POST /api/fotos -> Adiciona uma nova foto a uma galeria
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === 'publicador') {
      return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  const data = await request.json(); // Espera { galeria_id, caminho_imagem, legenda }
  const novaFoto = await prisma.fotos.create({ data });
  return NextResponse.json(novaFoto, { status: 201 });
}