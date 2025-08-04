# Portal da Prefeitura de Inconfidentes/MG

![Logo da Prefeitura de Inconfidentes](public/images/logo_home.png)

Este repositório contém o código-fonte do portal oficial da Prefeitura de Inconfidentes. A aplicação é full-stack, construída com as tecnologias mais modernas, e é dividida em duas partes principais: um site público informativo para os cidadãos e um painel administrativo (CMS) robusto para o gerenciamento completo do conteúdo.

---

## ✨ Funcionalidades

O sistema conta com um conjunto completo de funcionalidades para atender às necessidades do município:

* **Painel Administrativo Seguro:**
    * Sistema de autenticação com email e senha.
    * Sessões gerenciadas com NextAuth.js (Auth.js).
    * Controle de Acesso Baseado em Nível (RBAC) para Admin, Editor e Publicador.
* **Gerenciamento de Conteúdo (CRUDs):**
    * Notícias
    * Páginas Institucionais (Sobre, História, etc.)
    * Eventos
* **Gerenciamento de Publicações Oficiais (CRUDs):**
    * Licitações
    * Leis, Decretos, Portarias e Resoluções
    * Diário Oficial
    * Concursos e Processos Seletivos
* **Gerenciamento da Estrutura Administrativa (CRUDs):**
    * Secretarias
    * Servidores
* **Módulos de Interação:**
    * Gerenciador de Galerias de Fotos.
    * Visualizador e gerenciador de solicitações da Ouvidoria.
* **Interface Moderna e Responsiva:**
    * Notificações "toast" para feedback de ações.
    * Formulários com validação de dados em tempo real.
    * Animações de carregamento contextuais (loaders de página, skeletons e spinners em botões).

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando um stack moderno e performático:

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Linguagem:** JavaScript
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Autenticação:** [NextAuth.js (Auth.js)](https://authjs.dev/)
* **Formulários:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
* **UI & Ícones:** [Lucide React](https://lucide.dev/)
* **Notificações:** [React Hot Toast](https://react-hot-toast.com/)
* **Deployment:** [Netlify](https://www.netlify.com/)

---

## 🚀 Começando

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente de desenvolvimento local.

### 1. Pré-requisitos

* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* Um servidor PostgreSQL rodando localmente ou na nuvem.

### 2. Clonar o Repositório

```bash
git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)
cd SEU_REPOSITORIO
```

### 3. Instalar as Dependências

```bash
npm install
```

### 4. Configurar as Variáveis de Ambiente

Crie uma cópia do arquivo `.env.local.example` (se não existir, crie um novo) e renomeie para `.env.local`. Preencha com suas informações:

```env
# .env.local

# URL de conexão do seu banco de dados PostgreSQL
# O nome da variável DEVE ser DATABASE_URL para o Prisma encontrar.
DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO"

# URL para tarefas de migração (se estiver usando um pooler como o do Neon)
# Para desenvolvimento local, pode ser a mesma DATABASE_URL.
DATABASE_URL_UNPOOLED="postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO"

# Chave secreta para a autenticação com NextAuth.js
# Gere uma chave forte com `openssl rand -base64 32`
NEXTAUTH_SECRET="SUA_CHAVE_SECRETA_AQUI"
```

### 5. Executar as Migrações do Banco de Dados

Este comando irá ler seu `schema.prisma` e criar todas as tabelas no banco de dados configurado na `DATABASE_URL`.

```bash
npx prisma migrate dev
```

### 6. (Opcional) Popular o Banco com Dados Iniciais

Para criar o usuário administrador inicial e outros dados de exemplo, você pode usar o `seed` do Prisma. Certifique-se de que o arquivo `prisma/seed.js` existe e está configurado.

```bash
npx prisma db seed
```
*(Lembre-se de que o script de seed precisa gerar uma senha com hash bcrypt para o usuário admin)*.

### 7. Rodar o Servidor de Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado. A página do painel estará em [http://localhost:3000/painel](http://localhost:3000/painel).

---

## 🚢 Deploy

Este projeto está configurado para deploy contínuo na [Netlify](https://www.netlify.com/). O comando de build no `package.json` já está preparado para executar as migrações e gerar o cliente Prisma antes de construir a aplicação.

```json
"build": "prisma migrate deploy && prisma generate && next build"
```

As variáveis de ambiente (`DATABASE_URL`, `DATABASE_URL_UNPOOLED`, `NEXTAUTH_SECRET`) devem ser configuradas na interface da Netlify.

## 📚 InstalaçÕies feita com npm

- npm i tailwind-merge
- npm install cheerio
- npm install swiper
- npm install lucide-react
- npm install axios
- npm install pg
- npm install prisma --save-dev
- npm install @prisma/client
- npx prisma init
- npm install next-auth bcryptjs
- npm install react-hot-toast
- npm install react-hook-form zod @hookform/resolvers