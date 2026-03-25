# 🏛️ Portal da Prefeitura de Inconfidentes/MG

![Logo da Prefeitura de Inconfidentes](public/images/logo_home.png)

Este repositório contém o código-fonte do portal oficial da Prefeitura de Inconfidentes. Projeto desenvolvido durante o período de estágio (Junho a Agosto de 2025).

A aplicação é *full-stack* e dividida em duas partes principais: um **site público informativo** para os cidadãos e um **painel administrativo (CMS)** robusto para o gerenciamento completo do conteúdo municipal.

---

## 🔐 Acesso ao Painel Administrativo (Ambiente de Desenvolvimento)

Para testar o painel administrativo localmente, utilize as credenciais padrão:
*   **Acesso:** `http://localhost:3000/painel`
*   **E-mail:** `admin@inconfidentes.mg.gov.br`
*   **Senha:** `admin`

*(Aviso: Estas credenciais são apenas para desenvolvimento local. Certifique-se de alterá-las e utilizar hashes seguros no ambiente de produção).*

---

## ✨ Funcionalidades

O sistema conta com um conjunto completo de ferramentas para atender às necessidades do município:

*   **Painel Administrativo Seguro (CMS):**
    *   Autenticação e gerenciamento de sessões com `NextAuth.js`.
    *   Controle de Acesso Baseado em Nível (RBAC) para Perfis: Admin, Editor e Publicador.
*   **Gerenciamento de Conteúdo:**
    *   Notícias, Eventos e Galerias de Fotos.
    *   Páginas Institucionais (Sobre, História, etc.).
*   **Transparência e Publicações Oficiais:**
    *   Licitações, Leis, Decretos, Portarias e Resoluções.
    *   Diário Oficial, Concursos e Processos Seletivos.
*   **Estrutura e Interação:**
    *   Cadastro de Secretarias e Servidores.
    *   Visualizador de solicitações da Ouvidoria.

---

## 🛠️ Tecnologias e Bibliotecas

Este projeto foi construído utilizando um ecossistema moderno e performático (baseado no `package.json`):

*   **Core:** [Next.js 15](https://nextjs.org/) (App Router) e React 19.
*   **Banco de Dados:** PostgreSQL hospedado via [Neon](https://neon.tech/) / Local.
*   **ORM:** [Prisma](https://www.prisma.io/) (`@prisma/client`).
*   **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) com `tailwind-merge` para classes dinâmicas.
*   **Autenticação & Segurança:** `next-auth` e `bcryptjs` para criptografia de senhas.
*   **Formulários:** `react-hook-form` integrado com `zod` para validações rígidas.
*   **Interface (UI):** Ícones com `lucide-react`, carrosséis com `swiper` e notificações com `react-hot-toast`.
*   **Utilitários:** `axios` para requisições externas e `cheerio` para manipulação de HTML/Scraping.

---

## 🚀 Começando (Setup Local)

Siga os passos abaixo para configurar o ambiente de desenvolvimento em sua máquina.

### 1. Pré-requisitos
*   [Node.js](https://nodejs.org/) (versão 18 ou superior)
*   Banco de dados PostgreSQL rodando localmente ou na nuvem.

### 2. Instalação

Clone o repositório e instale todas as dependências automaticamente:

```bash
git clone [https://github.com/SEU_USUARIO/prefeitura-inconfidentes.git](https://github.com/SEU_USUARIO/prefeitura-inconfidentes.git)
cd prefeitura-inconfidentes
npm install
