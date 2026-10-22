// Protege todas as rotas do painel administrativo no servidor,
// redirecionando visitantes não autenticados para a tela de login.
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/webmail" },
});

export const config = {
  matcher: ["/painel/:path*"],
};
