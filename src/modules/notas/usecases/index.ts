import { randomUUID } from 'crypto';
import { notaRepository } from '../repository';
import { CreateNotaDTO, UpdateNotaDTO, NotaResponseDTO } from '../dtos';

export const notaUseCases = {

  async listarPorAluno(alunoId: string): Promise<NotaResponseDTO[]> {
    if (!alunoId) throw new Error('ID do aluno é obrigatório');
    return await notaRepository.findByAluno(alunoId);
  },

  async listarPorTurma(turmaId: string): Promise<NotaResponseDTO[]> {
    if (!turmaId) throw new Error('ID da turma é obrigatório');
    return await notaRepository.findByTurma(turmaId);
  },

  async lancar(data: CreateNotaDTO): Promise<NotaResponseDTO> {
    if (!data.alunoId) throw new Error('ID do aluno é obrigatório');
    if (!data.turmaId) throw new Error('ID da turma é obrigatório');
    if (!data.avaliacao) throw new Error('Nome da avaliação é obrigatório');
    if (data.valor < 0 || data.valor > 10) throw new Error('Nota deve ser entre 0 e 10');

    return await notaRepository.create({
      ...data,
      id: randomUUID(),
    });
  },

  async atualizar(data: UpdateNotaDTO): Promise<void> {
    if (data.valor !== undefined && (data.valor < 0 || data.valor > 10)) {
      throw new Error('Nota deve ser entre 0 e 10');
    }
    await notaRepository.update(data);
  },

  async deletar(id: string): Promise<void> {
    await notaRepository.delete(id);
  },

};