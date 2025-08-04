// src/app/api/secretarias/route.js
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// GET /api/secretarias -> Lista secretarias para dropdowns
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const secretarias = await prisma.secretarias.findMany({
      select: { id: true, nome: true },
      orderBy: { nome: 'asc' },
    });
    return NextResponse.json(secretarias);
  } catch (error) {
    return NextResponse.json({ message: "Erro ao buscar secretarias." }, { status: 500 });
  }
}