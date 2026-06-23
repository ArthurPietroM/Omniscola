# Omniscola 🎓

**Omniscola** é um sistema de gestão escolar moderno, desenvolvido especificamente para faculdades e cursos técnicos (inspirado na estrutura do Senac). O objetivo principal é simplificar e centralizar a administração acadêmica através de uma interface intuitiva e uma arquitetura robusta, segura e escalável.

## 🚀 Tecnologias

Este projeto utiliza o que há de mais moderno no ecossistema JavaScript/TypeScript:

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
* **UI Library:** [React 19](https://react.dev/)
* **Linguagem:** [TypeScript 5](https://www.typescriptlang.org/)
* **Estilização:** [Tailwind CSS 4](https://tailwindcss.com/)
* **Banco de Dados:** [SQLite](https://www.sqlite.org/)
* **ORM:** [Drizzle ORM](https://orm.drizzle.team/)

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture**, garantindo uma separação clara de responsabilidades e facilitando a manutenção e evolução do sistema através das camadas de `Modules`, `Handlers`, `Hooks` e `Shared`.

## 📖 Documentação Completa

Para manter a página inicial organizada, os detalhes de regras de negócio, modelagem e permissões foram movidos para arquivos dedicados:

* 👉 [Matriz de Permissões, Casos de Uso e Schemas de Banco](./docs/arquitetura-e-requisitos.md)

---

## 🛠️ Como Rodar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/omniscola.git](https://github.com/seu-usuario/omniscola.git)
    ```
2.  **Instale as dependências:**
    ```bash
    pnpm install
    ```
3.  **Configure o banco de dados (Drizzle Migrations):**
    ```bash
    pnpm drizzle-kit push
    ```
4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    pnpm dev
    ```
5.  Acesse `http://localhost:3000` no seu navegador.

## 📈 Roadmap

- [x] Definição de Engenharia de Requisitos e Modelagem de Dados.
- [ ] Implementar esquemas das tabelas no Drizzle ORM (`schema.ts`).
- [ ] Implementar autenticação (JWT/Cookies) e níveis de acesso (Middleware).
- [ ] Criar rotas e Use Cases para o módulo de Disciplinas/Matérias.
- [ ] Finalizar interface visual (UI/UX) com Tailwind 4 baseado nos perfis de acesso.
- [ ] Gerador de relatórios e boletins em PDF.
- [ ] Dashboard analítico para coordenadores.

## 📄 Licença

Comercial - Licença por instituição.

---
Desenvolvido com ❤️ para transformar a educação.