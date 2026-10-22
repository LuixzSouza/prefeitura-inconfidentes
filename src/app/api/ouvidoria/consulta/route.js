import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { consultaSchema } from "@/lib/validations/ouvidoria";

// POST /api/ouvidoria/consulta -> Cidadão acompanha uma manifestação (público)
// Exige protocolo + e-mail para não expor manifestações de terceiros.
export async function POST(request) {
  const parsed = consultaSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Dados inválidos." }, { status: 400 });
  }

  const { protocolo, email } = parsed.data;
  const solicitacao = await prisma.ouvidoria_solicitacoes.findUnique({
    where: { protocolo },
    select: {
      protocolo: true,
      email_cidadao: true,
      tipo_manifestacao: true,
      assunto: true,
      status: true,
      created_at: true,
      secretaria_destino: { select: { nome: true } },
    },
  });

  if (!solicitacao || solicitacao.email_cidadao.toLowerCase() !== email.toLowerCase()) {
    return NextResponse.json({ message: "Manifestação não encontrada. Verifique o protocolo e o e-mail." }, { status: 404 });
  }

  const { email_cidadao: _, ...publico } = solicitacao;
  return NextResponse.json(publico);
}
