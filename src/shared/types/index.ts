export interface Institution {
  id: string;
  nome: string;
  slug: string;
  createdAt: string;
}

export interface Turma {
  id: string;
  institutionId: string;
  nome: string;
  codigo: string;
  periodo: string;
  status: 'ativa' | 'encerrada';
}

export interface Aluno {
  id: string;
  institutionId: string;
  nome: string;
  email: string;
  matricula: string;
}

export interface AlunoTurma {
  id: string;
  alunoId: string;
  turmaId: string;
  status: 'ativo' | 'trancado' | 'concluido';
}

export interface Aula {
  id: string;
  turmaId: string;
  data: string;
  topico?: string;
}

export interface Presenca {
  id: string;
  aulaId: string;
  alunoId: string;
  status: 'presente' | 'ausente' | 'justificado';
}

export interface Disciplina {
  id: string;
  institutionId: string;
  nome: string;
  codigo: string;
}

export interface Nota {
  id: string;
  turmaId: string;
  alunoId: string;
  disciplinaId: string; // Adicionado para vincular a nota a uma disciplina
  avaliacao: string;
  valor: number;
}

// --- DTOs (Data Transfer Objects) baseados nas interfaces acima ---

// Turmas
export type CreateTurmaDTO = Omit<Turma, 'id'>;
export type UpdateTurmaDTO = Partial<Omit<Turma, 'id'>> & { id: string };

// Alunos
export type CreateAlunoDTO = Omit<Aluno, 'id'>;
export type UpdateAlunoDTO = Partial<Omit<Aluno, 'id'>> & { id: string };

// Presenças
export type CreatePresencaDTO = Omit<Presenca, 'id'>;
export type UpdatePresencaDTO = Partial<Omit<Presenca, 'id'>> & { id: string };

// Disciplinas
export type CreateDisciplinaDTO = Omit<Disciplina, 'id'>;
export type UpdateDisciplinaDTO = Partial<Omit<Disciplina, 'id'>> & { id: string };

// Notas
export type CreateNotaDTO = Omit<Nota, 'id'>;
export type UpdateNotaDTO = Partial<Omit<Nota, 'id'>> & { id: string };
