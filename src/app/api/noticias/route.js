import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// Lida com: GET /api/noticias (Listar todas as notícias)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const noticias = await prisma.noticias.findMany({
      orderBy: { data_publicacao: 'desc' },
      include: { usuario: { select: { nome: true } } }, // Inclui o nome do autor
    });
    return NextResponse.json(noticias);
  } catch (error) {
    console.error("[API NOTICIAS GET]", error);
    return NextResponse.json({ message: "Erro ao buscar notícias." }, { status: 500 });
  }
}

// Lida com: POST /api/noticias (Criar uma nova notícia)
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { titulo, subtitulo, conteudo, imagem_destaque, slug, data_publicacao, status } = body;

    if (!titulo || !conteudo || !slug) {
        return NextResponse.json({ message: "Título, conteúdo e slug são obrigatórios." }, { status: 400 });
    }

    const novaNoticia = await prisma.noticias.create({
      data: {
        titulo,
        subtitulo,
        conteudo,
        imagem_destaque: imagem_destaque || '/images/placeholder.jpg',
        slug,
        data_publicacao: new Date(data_publicacao),
        status,
        usuario_id: parseInt(session.user.id), // Associa ao usuário logado
      },
    });
    return NextResponse.json(novaNoticia, { status: 201 });
  } catch (error) {
    console.error("[API NOTICIAS POST]", error);
    // Adiciona verificação de erro para slug duplicado
    if (error.code === 'P2002' && error.meta?.target?.includes('slug')) {
        return NextResponse.json({ message: "Este 'slug' (URL amigável) já está em uso." }, { status: 409 });
    }
    return NextResponse.json({ message: "Erro ao criar notícia." }, { status: 500 });
  }
}