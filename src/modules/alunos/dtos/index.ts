// src/modules/alunos/dtos/index.ts

export interface CreateAlunoDTO {
  institutionId: string;
  nome: string;
  email: string;
  matricula: string;
}

export interface UpdateAlunoDTO {
  id: string;
  nome?: string;
  email?: string;
  matricula?: string;
}

export interface AlunoResponseDTO {
  id: string;
  institutionId: string;
  nome: string;
  email: string;
  matricula: string;
}