export interface CreateDisciplinaDTO {
  nome: string;
  codigo: string;
  institutionId: string;
}

export interface UpdateDisciplinaDTO {
  id: string;
  nome?: string;
  codigo?: string;
}

export interface DisciplinaResponseDTO {
  id: string;
  nome: string;
  codigo: string;
  institutionId: string;
}