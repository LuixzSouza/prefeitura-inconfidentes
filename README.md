# 🏛️ Portal da Prefeitura de Inconfidentes/MG

![Logo da Prefeitura de Inconfidentes](public/images/logo_home.png)

Portal oficial da Prefeitura Municipal de Inconfidentes, desenvolvido durante o período de estágio (junho a agosto de 2025).

A aplicação é **full-stack** e tem duas partes:

- um **site público** para o cidadão, com notícias, publicações oficiais, transparência e Ouvidoria online;
- um **painel administrativo (CMS)**, com controle de acesso por perfil, para a equipe da prefeitura gerenciar todo o conteúdo.

---

## ✨ Funcionalidades

### Site público
- **Notícias**: home e páginas `/noticias` e `/noticias/[slug]` alimentadas pelo CMS, com SEO (metadata e Open Graph) e revalidação automática (ISR).
- **Ouvidoria online**: o cidadão registra uma manifestação (sugestão, reclamação, elogio, denúncia ou pedido de informação), recebe um **número de protocolo** e acompanha o status informando protocolo + e-mail.
- **Publicações Oficiais**: leis, decretos, portarias, resoluções, licitações, compras diretas, concursos e Diário Oficial.
- **Portal da Transparência**, páginas institucionais (município, governo, departamentos), busca e previsão do tempo (Open-Meteo).
- **Acessibilidade**: aumentar/diminuir fonte e alto contraste, com preferências salvas no navegador.
- **Responsivo**: menu hambúrguer com submenus no celular.

### Painel administrativo (`/painel`)
- Autenticação com **NextAuth.js** (credenciais + JWT) e senhas com **bcrypt**.
- **RBAC** com três perfis: `admin`, `editor` e `publicador`.
- CRUD de notícias, eventos, galerias de fotos, páginas, licitações, legislação, concursos, Diário Oficial, secretarias, servidores e usuários.
- Gestão das manifestações da Ouvidoria (alteração de status).
- Dashboard com estatísticas.

### Segurança
- Rotas do painel protegidas no servidor por **middleware**.
- Todas as rotas de escrita da API exigem sessão e checam o perfil do usuário.
- Entradas públicas validadas com **Zod**. A consulta da Ouvidoria exige protocolo **e** e-mail, para não expor dados de terceiros.
- Senhas nunca são retornadas pela API.

---

## 🛠️ Tecnologias

| Camada | Tecnologias |
| --- | --- |
| Front-end | Next.js 15 (App Router), React 19, Tailwind CSS v4, lucide-react, Swiper |
| Back-end | Route Handlers do Next.js, NextAuth.js, bcryptjs |
| Banco de dados | PostgreSQL (Neon) + Prisma ORM |
| Formulários | react-hook-form + Zod |
| Deploy | Netlify |

---

## 🚀 Rodando localmente

### 1. Pré-requisitos
- [Node.js](https://nodejs.org/) 20.19+ ou 22+
- Um banco PostgreSQL (local, [Neon](https://neon.tech/) ou outro)

### 2. Instalação

```bash
git clone https://github.com/LuixzSouza/prefeitura-inconfidentes.git
cd prefeitura-inconfidentes
npm install
```

### 3. Variáveis de ambiente

Copie o arquivo de exemplo e preencha com seus dados:

```bash
cp .env.example .env
```

| Variável | Descrição |
| --- | --- |
| `DATABASE_URL` | String de conexão do PostgreSQL |
| `DATABASE_URL_UNPOOLED` | Conexão direta (sem pooler). Localmente pode ser igual à anterior |
| `NEXTAUTH_SECRET` | Segredo do NextAuth (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | URL da aplicação (ex: `http://localhost:3000`) |

### 4. Banco de dados

Cria as tabelas e popula o banco com um admin e dados de demonstração:

```bash
npm run db:push
npm run db:seed
```

### 5. Iniciar

```bash
npm run dev
```

Acesse `http://localhost:3000`.

> 💡 Sem banco configurado, o site público continua funcionando com notícias de demonstração. Só o painel e a Ouvidoria precisam do banco.

---

## 🔐 Acesso ao painel (desenvolvimento)

Depois de rodar o seed:

- **URL:** `http://localhost:3000/webmail`
- **E-mail:** `admin@inconfidentes.mg.gov.br`
- **Senha:** `admin`

Para usar outras credenciais, defina `SEED_ADMIN_EMAIL` e `SEED_ADMIN_PASSWORD` antes do seed. Para gerar o hash de uma senha manualmente: `node gerar-hash.js "sua-senha"`.

> ⚠️ Essas credenciais servem apenas para desenvolvimento. Em produção, use uma senha forte.

Para testar a Ouvidoria, use o protocolo `202500000001` com o e-mail `jose@example.com`.

---

## 📁 Estrutura

```
prisma/
  schema.prisma        # Modelos do banco
  seed.mjs             # Dados de demonstração
src/
  app/
    api/               # API REST (Route Handlers)
    painel/            # Painel administrativo (CMS)
    noticias/          # Notícias públicas
    ouvidoria/         # Ouvidoria online
    publicacoes-oficiais/, transparencia/, municipio/, governo/, departamentos/
  components/          # Componentes de UI, seções e navegação
  data/                # Conteúdo estático (navegação, departamentos...)
  lib/                 # Prisma, validações (Zod) e serviços
  middleware.js        # Proteção das rotas do painel
```

---

## 📜 Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera o Prisma Client e o build de produção |
| `npm start` | Servidor de produção |
| `npm run lint` | ESLint |
| `npm run db:push` | Sincroniza o schema com o banco |
| `npm run db:seed` | Popula o banco com dados de demonstração |

---

Desenvolvido por **Luiz Antônio de Souza**.
