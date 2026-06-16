# Omniscola 🎓

**Omniscola** é um sistema de gestão escolar moderno, desenvolvido especificamente para faculdades e cursos técnicos. O objetivo principal é simplificar a administração de turmas, alunos, presenças e notas através de uma interface intuitiva e uma arquitetura robusta e escalável.

## 🚀 Tecnologias

Este projeto utiliza o que há de mais moderno no ecossistema JavaScript/TypeScript:

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **UI Library:** [React 19](https://react.dev/)
*   **Linguagem:** [TypeScript 5](https://www.typescriptlang.org/)
*   **Estilização:** [Tailwind CSS 4](https://tailwindcss.com/)
*   **Banco de Dados:** [SQLite](https://www.sqlite.org/)
*   **ORM:** [Drizzle ORM](https://orm.drizzle.team/)

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture**, garantindo uma separação clara de responsabilidades e facilitando a manutenção e evolução do sistema:

1.  **Modules (`src/modules/`)**: Contém a lógica de negócio central. Cada domínio (turmas, alunos, etc.) possui seus próprios:
    *   `dtos/`: Objetos de transferência de dados.
    *   `usecases/`: Regras de negócio puras.
    *   `repository/`: Abstração do acesso ao banco de dados.
2.  **Handlers (`src/handlers/`)**: Camada intermediária que processa requisições HTTP, trata erros de forma segura e comunica-se com os Use Cases.
3.  **Hooks (`src/hooks/`)**: Custom Hooks que abstraem o consumo das APIs, fornecendo estados de carregamento, erro e dados tipados para o frontend.
4.  **Shared (`src/shared/`)**: Tipos globais, utilitários e componentes compartilhados.

## 📋 Módulos Atuais

*   **Turmas:** Gestão de turmas por instituição, controle de períodos e códigos.
*   **Alunos:** Cadastro completo de alunos e matrículas.
*   **Presenças:** Controle de frequência por aula e por aluno.
*   **Notas:** Lançamento e acompanhamento de avaliações e desempenhos.
*   **Instituições:** Suporte a múltiplas instituições com licenciamento comercial.

## 🛠️ Como Rodar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/omniscola.git
    ```
2.  **Instale as dependências:**
    ```bash
    pnpm install
    ```
3.  **Configure o banco de dados:**
    ```bash
    pnpm drizzle-kit push
    ```
4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    pnpm dev
    ```
5.  Acesse `http://localhost:3000` no seu navegador.

## 📈 Roadmap

- [ ] Implementar módulo de Disciplinas/Matérias.
- [ ] Finalizar interface visual (UI/UX) com Tailwind 4.
- [ ] Implementar autenticação e níveis de acesso.
- [ ] Gerador de relatórios e boletins em PDF.
- [ ] Dashboard analítico para coordenadores.

## 📄 Licença

Comercial - Licença por instituição.

---
Desenvolvido com ❤️ para transformar a educação.
