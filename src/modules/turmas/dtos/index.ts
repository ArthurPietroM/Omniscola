// src/modules/turmas/dtos/index.ts

export interface CreateTurmaDTO {
  institutionId: string;
  nome: string;
  codigo: string;
  periodo: string;
}

export interface UpdateTurmaDTO {
  id: string;
  nome?: string;
  codigo?: string;
  periodo?: string;
  status?: 'ativa' | 'encerrada';
}

export interface TurmaResponseDTO {
  id: string;
  institutionId: string;
  nome: string;
  codigo: string;
  periodo: string;
  status: 'ativa' | 'encerrada';
  createdAt?: string;
}