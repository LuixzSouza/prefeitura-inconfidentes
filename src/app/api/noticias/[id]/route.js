import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

// Lida com: GET /api/noticias/{id} (Ler uma notícia)
export async function GET(request, { params }) {
    // ... (Opcional, se precisar de uma página de detalhes no painel)
}

// Lida com: PUT /api/noticias/{id} (Atualizar uma notícia)
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Não autorizado" }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await request.json();
    const { titulo, subtitulo, conteudo, imagem_destaque, slug, data_publicacao, status } = body;

    const noticiaAtualizada = await prisma.noticias.update({
      where: { id: parseInt(id) },
      data: {
        titulo,
        subtitulo,
        conteudo,
        imagem_destaque,
        slug,
        data_publicacao: new Date(data_publicacao),
        status,
      },
    });
    return NextResponse.json(noticiaAtualizada);
  } catch (error) {
    console.error("[API NOTICIAS PUT]", error);
    return NextResponse.json({ message: "Erro ao atualizar notícia." }, { status: 500 });
  }
}

// Lida com: DELETE /api/noticias/{id} (Deletar uma notícia)
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  const allowedRoles = ['admin', 'editor'];
  if (!session || !allowedRoles.includes(session.user.role)) {
    return NextResponse.json({ message: "Acesso negado." }, { status: 403 }); // 403 Forbidden
  }

  try {
    const { id } = params;
    await prisma.noticias.delete({
      where: { id: parseInt(id) },
    });
    return new NextResponse(null, { status: 204 }); // 204 No Content
  } catch (error) {
    console.error("[API NOTICIAS DELETE]", error);
    return NextResponse.json({ message: "Erro ao deletar notícia." }, { status: 500 });
  }
}