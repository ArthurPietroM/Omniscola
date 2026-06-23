# Documento de Concepção — Omniscola 🎓

> **Projeto Integrador X4** · 8 de junho de 2026  
> **Desenvolvedores:** Arthur Pietro & Jose Ashila  
> **Instituição:** Senac

---

## 1. O Sistema

O **Omniscola** é uma plataforma web voltada para a gestão e automação de processos acadêmicos, unificando a comunicação e o controle de informações entre a secretaria, o corpo docente, os alunos e seus responsáveis legais.

## 2. O Problema

Atualmente, muitas instituições sofrem com a falta de centralização e o acompanhamento em tempo real do desempenho acadêmico e da assiduidade dos estudantes. O registro manual ou em sistemas legados descentralizados gera:
* Retrabalho e lentidão no lançamento de notas e chamadas por parte dos professores.
* Falta de transparência imediata para alunos sobre suas situações parciais.
* Dificuldade de acompanhamento por parte dos responsáveis sobre a frequência diária dos estudantes.

## 3. Público-Alvo e Mercado

* **Público-Alvo:** Instituições de Ensino Superior, Centros Universitários e Escolas de Ensino Técnico (com foco inicial no modelo de cursos técnicos e livres do Senac).
* **Mercado:** Setor de tecnologia educacional (*EdTechs*), focado em licença comercial por volume de alunos ou por instituição.

## 4. Escopo das Funcionalidades (Alto Nível)

* **Gestão de Turmas:** Criação, abertura, listagem e controle de períodos letivos e turmas ativas.
* **Gestão de Alunos:** Controle de matrículas, dados cadastrais e vinculação automática às turmas e aos seus respectivos responsáveis.
* **Controle de Presença:** Lançamento diário de frequências e geração de relatórios consolidados de assiduidade e faltas.
* **Gestão de Avaliações (Notas):** Lançamento de notas por unidade/bimestre e compilação automática do boletim escolar do aluno.

## 5. Diferenciais Competitivos

O grande diferencial do Omniscola é o **Registro de Presença com Validação Temporal**. O sistema não apenas computa se o aluno estava presente ou ausente, mas registra rigidamente o horário exato (*timestamp*) em que a chamada foi efetuada ou em que o aluno registrou sua entrada, permitindo auditorias precisas de atrasos e saídas antecipadas, gerando dados analíticos para a coordenação.