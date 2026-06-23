# Documentação Técnica e de Requisitos — Omniscola 🎓

Este documento detalha as regras de negócio, permissões de segurança, fluxos de sistema e modelagem de dados que guiam o desenvolvimento do backend e frontend do Omniscola.

---

## 🔐 Controle de Acesso & Matriz de Permissões

O sistema possui controle de acesso baseado em perfis de usuários (RBAC - *Role-Based Access Control*). A tabela abaixo mapeia as permissões de cada ator dentro da plataforma:

| Funcionalidade | Secretaria (Admin) | Professor | Coordenador | Aluno | Responsável |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Gerenciar usuários | ✓ | — | — | — | — |
| Criar/editar turmas | ✓ | — | — | — | — |
| Matricular alunos | ✓ | — | — | — | — |
| Lançar presenças | ✓ | ✓ (suas turmas) | — | — | — |
| Lançar/editar notas | ✓ | ✓ (suas turmas) | — | — | — |
| Ver todas as turmas | ✓ | — | ✓ | — | — |
| Gerar boletim | ✓ | ✓ (suas turmas) | ✓ | ✓ (próprio) | ✓ (vinculado) |
| Ver próprias notas | — | — | — | ✓ | ✓ |
| Ver próprias presenças | — | — | — | ✓ | ✓ |

---

## ⚙️ Engenharia de Requisitos (Casos de Uso)

Estas são as especificações de negócio que guiam a criação dos arquivos de regras de negócio dentro de `src/modules/[modulo]/usecases/`:

### CSU01: Gerenciar Usuários e Matricular Alunos
* **Ator Principal:** Secretaria.
* **Pré-condições:** O usuário do perfil Secretaria precisa estar autenticado.
* **Fluxo Principal:**
  1. O usuário acessa o menu administrativo e seleciona "Criar Usuário".
  2. Define o perfil (Aluno, Professor, Coordenador, Responsável).
  3. Preenche as informações básicas (Nome, E-mail, Documentos).
  4. Caso o perfil seja "Aluno", o sistema exige a vinculação a uma Turma ativa e abre um campo opcional para vincular um Responsável.
  5. O sistema valida se o e-mail ou documento já existem, salva no banco de dados e gera o número de matrícula para o aluno.

### CSU02: Lançar Notas e Presenças
* **Ator Principal:** Professor (ou Secretaria em casos de auditoria).
* **Pré-condições:** O professor precisa estar previamente associado à disciplina daquela turma.
* **Fluxo Principal:**
  1. O Professor faz login e acessa a aba "Minhas Turmas".
  2. Seleciona a Turma e a Disciplina desejada.
  3. Escolhe entre a opção "Registrar Chamada (Presença)" ou "Lançar Notas".
  4. O sistema lista todos os alunos matriculados naquela turma específica.
  5. O Professor preenche as notas ou marca a presença/falta da data corrente.
  6. Ao clicar em "Salvar", o sistema valida se a nota está entre 0 e 10 e atualiza o histórico do aluno.

### CSU03: Visualizar Boletim e Acompanhamento
* **Ator Principal:** Aluno / Responsável / Coordenador.
* **Pré-condições:** Usuário autenticado.
* **Fluxo Principal:**
  1. O usuário acessa a opção "Boletim".
  2. *Fluxo Alternativo (Responsável):* O sistema exibe uma lista com os alunos vinculados àquele responsável para que ele escolha de quem deseja ver o relatório.
  3. O sistema faz a busca no banco de dados compilando as Notas e somando as Presenças do aluno selecionado divididas por Disciplina.
  4. O sistema gera a tabela visual na tela com as médias parciais e o percentual de faltas acumuladas.

---

## 🗄️ Modelagem de Dados (Drizzle ORM Schemas)

As entidades abaixo estruturam o banco de dados relacional (SQLite) e devem ser mapeadas nos arquivos `schema.ts` de seus respectivos módulos:

* **`Usuario`**: Centraliza a autenticação segura (Id, Nome, Email, Senha, Perfil).
* **`Aluno`**: Dados acadêmicos vinculados a um Usuário, uma Turma e, opcionalmente, a um Responsável.
* **`Responsavel`**: Cadastro de responsáveis legais associados a um ou mais alunos (CPF, Id_Usuario).
* **`Professor`**: Cadastro de docentes e suas áreas de atuação.
* **`Turma`**: Controle de agrupamentos de alunos (Nome, Ano Letivo, Turno).
* **`Disciplina`**: Catálogo de matérias ofertadas (Nome, Carga Horária).
* **`Turma_Disciplina_Professor`**: Entidade associativa (N:M) que define qual professor leciona determinada disciplina em qual turma.
* **`Nota`**: Registro de avaliações vinculando Aluno, Disciplina da Turma, Valor (0-10) e Unidade/Bimestre.
* **`Presenca`**: Histórico diário de chamadas (Aluno, Disciplina da Turma, Data, Status de Presença/Falta).

---

## 🔗 Relacionamentos e Cardinalidade

1.  **Usuário para Perfis (1:1):** Um `Usuario` possui apenas um perfil específico do sistema (`Aluno`, `Professor`, etc.).
2.  **Responsável para Aluno (1:N):** Um `Responsavel` pode estar associado a vários `Alunos` (ex: irmãos que estudam na instituição), mas o `Aluno` possui apenas um `Responsavel` principal mapeado.
3.  **Turma para Aluno (1:N):** Uma `Turma` pode ter muitos `Alunos`, mas um `Aluno` só pode estar matriculado em uma única `Turma` ativa por período.
4.  **Turma, Disciplina e Professor (N:M):** Uma turma possui várias disciplinas e um professor pode lecionar em várias turmas. A tabela `Turma_Disciplina_Professor` resolve essa relação de muitos-para-muitos.
5.  **Aluno para Notas e Presenças (1:N):** Um `Aluno` recebe múltiplos registros de `Nota` e de `Presenca` ao longo do curso, mas cada registro gerado aponta de volta rigidamente para um único aluno.