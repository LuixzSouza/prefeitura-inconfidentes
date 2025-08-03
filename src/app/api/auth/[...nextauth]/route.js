import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma"; // Importa nossa instância única do Prisma
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // Esta é a função que valida o login
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 1. Busca o usuário no banco de dados pelo email
        const user = await prisma.usuarios.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          return null; // Usuário não encontrado
        }
        
        // 2. Compara a senha enviada com a senha "hasheada" no banco
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.senha // A senha no seu banco DEVE estar com hash
        );

        if (isPasswordCorrect) {
          // 3. Se tudo estiver correto, retorna os dados do usuário para a sessão
          return {
            id: user.id,
            name: user.nome,
            email: user.email,
            role: user.nivel_acesso,
          };
        }

        return null; // Senha incorreta
      },
    }),
  ],
  session: {
    strategy: "jwt", // Usaremos JSON Web Tokens para a sessão
  },
  callbacks: {
    // Adiciona o 'role' e 'id' do usuário ao token JWT
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    // Adiciona os dados do token ao objeto de sessão do cliente
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/webmail", // Redireciona para a página de login se o acesso for negado
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };