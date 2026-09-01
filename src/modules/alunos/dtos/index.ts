export interface CreateAlunoDTO {
  nome: string;
  email: string;
  institutionId: string;
  matricula: string;
}

export interface UpdateAlunoDTO {
  id: string;
  nome?: string;
  email?: string;
}

export interface AlunoResponseDTO {
  id: string;
  nome: string;
  email: string;
  matricula: string;
  institutionId: string;
}