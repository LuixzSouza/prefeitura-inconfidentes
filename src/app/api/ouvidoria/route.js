import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { randomInt } from "crypto";
import { authOptions } from "../auth/[...nextauth]/route";
import { manifestacaoSchema } from "@/lib/validations/ouvidoria";

// GET /api/ouvidoria -> Lista todas as solicitações (painel)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Não autorizado" }, { status: 401 });

  const solicitacoes = await prisma.ouvidoria_solicitacoes.findMany({
    orderBy: { created_at: 'desc' },
    include: { secretaria_destino: { select: { nome: true } } },
  });
  return NextResponse.json(solicitacoes);
}

// Gera um protocolo no formato AAAA + 8 dígitos (ex: 202612345678)
const gerarProtocolo = () => `${new Date().getFullYear()}${randomInt(10_000_000, 100_000_000)}`;

// POST /api/ouvidoria -> Cidadão registra uma nova manifestação (público)
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Requisição inválida." }, { status: 400 });
  }

  const parsed = manifestacaoSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Dados inválidos." },
      { status: 400 }
    );
  }

  const { telefone_cidadao, ...dados } = parsed.data;

  // Tenta algumas vezes em caso (raro) de colisão de protocolo
  for (let tentativa = 0; tentativa < 3; tentativa++) {
    try {
      const solicitacao = await prisma.ouvidoria_solicitacoes.create({
        data: { ...dados, telefone_cidadao: telefone_cidadao || null, protocolo: gerarProtocolo() },
        select: { protocolo: true, created_at: true },
      });
      return NextResponse.json(solicitacao, { status: 201 });
    } catch (error) {
      if (error.code !== 'P2002') {
        console.error("[API OUVIDORIA POST]", error);
        break;
      }
    }
  }
  return NextResponse.json({ message: "Erro ao registrar manifestação." }, { status: 500 });
}
