import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import bcrypt from "bcryptjs";

// PUT /api/usuarios/{id} -> Atualiza um usuário (Admin Only)
export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin') {
    return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  try {
    const { id } = params;
    const body = await request.json();
    const { nome, email, senha, nivel_acesso, status } = body;

    const updateData = { nome, email, nivel_acesso, status };

    // Só atualiza a senha se uma nova for fornecida
    if (senha) {
      updateData.senha = await bcrypt.hash(senha, 10);
    }

    const usuarioAtualizado = await prisma.usuarios.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    
    const { senha: _, ...userSemSenha } = usuarioAtualizado;
    return NextResponse.json(userSemSenha);

  } catch (error) {
    console.error("[API USUARIOS PUT]", error);
    return NextResponse.json({ message: "Erro ao atualizar usuário." }, { status: 500 });
  }
}

// DELETE /api/usuarios/{id} -> Deleta um usuário (Admin Only)
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin') {
    return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  try {
    const { id } = params;

    // Medida de segurança: impede que o admin delete a si mesmo
    if (parseInt(id) === parseInt(session.user.id)) {
        return NextResponse.json({ message: "Não é possível excluir o próprio usuário." }, { status: 400 });
    }

    await prisma.usuarios.delete({
      where: { id: parseInt(id) },
    });
    return new NextResponse(null, { status: 204 });

  } catch (error) {
    console.error("[API USUARIOS DELETE]", error);
    return NextResponse.json({ message: "Erro ao deletar usuário." }, { status: 500 });
  }
}