// src/modules/notas/dtos/index.ts

export interface CreateNotaDTO {
  turmaId: string;
  alunoId: string;
  avaliacao: string;
  valor: number;
}

export interface UpdateNotaDTO {
  id: string;
  avaliacao?: string;
  valor?: number;
}

export interface NotaResponseDTO {
  id: string;
  turmaId: string;
  alunoId: string;
  avaliacao: string;
  valor: number;
}