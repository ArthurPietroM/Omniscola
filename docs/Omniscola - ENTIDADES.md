# Levantamento de Entidades — Omniscola

> Projeto Integrador X4 · 8 de junho de 2026

---

## Entidades

### Turma
- id: number
- nome: string
- ano: number
- professor: string

### Aluno
- id: number
- nome: string
- matricula: string
- turmaId: number

### Presenca
- id: number
- data: Date
- presente: boolean
- alunoId: number

### Nota
- id: number
- disciplina: string
- valor: number
- alunoId: number

## Observações

Presença e notas são lançamentos frequentes — priorize formulários rápidos.

---

*Salve este arquivo em `docs/ENTIDADES.md` no seu repositório GitHub.*
