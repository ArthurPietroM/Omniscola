// src/modules/presencas/dtos/index.ts

export interface CreatePresencaDTO {
  aulaId: string;
  alunoId: string;
  status: 'presente' | 'ausente' | 'justificado';
}

export interface UpdatePresencaDTO {
  id: string;
  status: 'presente' | 'ausente' | 'justificado';
}

export interface PresencaResponseDTO {
  id: string;
  aulaId: string;
  alunoId: string;
  status: 'presente' | 'ausente' | 'justificado';
}