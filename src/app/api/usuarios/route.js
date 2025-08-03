import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import bcrypt from "bcryptjs";

// GET /api/usuarios -> Lista todos os usuários (Admin Only)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin') {
    return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  try {
    const usuarios = await prisma.usuarios.findMany({
      // NUNCA retorne a senha, mesmo que hasheada!
      select: {
        id: true,
        nome: true,
        email: true,
        nivel_acesso: true,
        status: true,
      },
      orderBy: { nome: 'asc' },
    });
    return NextResponse.json(usuarios);
  } catch (error) {
    console.error("[API USUARIOS GET]", error);
    return NextResponse.json({ message: "Erro ao buscar usuários." }, { status: 500 });
  }
}

// POST /api/usuarios -> Cria um novo usuário (Admin Only)
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== 'admin') {
    return NextResponse.json({ message: "Acesso negado" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { nome, email, senha, nivel_acesso, status } = body;

    if (!nome || !email || !senha || !nivel_acesso) {
        return NextResponse.json({ message: "Todos os campos são obrigatórios." }, { status: 400 });
    }

    // Criptografa a senha antes de salvar no banco
    const hashedPassword = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuarios.create({
      data: {
        nome,
        email,
        senha: hashedPassword, // Salva a senha com hash
        nivel_acesso,
        status,
      },
    });

    // Remove a senha do objeto retornado
    const { senha: _, ...userSemSenha } = novoUsuario;
    return NextResponse.json(userSemSenha, { status: 201 });

  } catch (error) {
    console.error("[API USUARIOS POST]", error);
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        return NextResponse.json({ message: "Este email já está em uso." }, { status: 409 });
    }
    return NextResponse.json({ message: "Erro ao criar usuário." }, { status: 500 });
  }
}