import { randomUUID } from 'crypto';
import { presencaRepository } from '../repository';
import { CreatePresencaDTO, UpdatePresencaDTO, PresencaResponseDTO } from '../dtos';

export const presencaUseCases = {

  async listarPorAula(aulaId: string): Promise<PresencaResponseDTO[]> {
    if (!aulaId) throw new Error('ID da aula é obrigatório');
    return await presencaRepository.findByAula(aulaId);
  },

  async listarPorAluno(alunoId: string): Promise<PresencaResponseDTO[]> {
    if (!alunoId) throw new Error('ID do aluno é obrigatório');
    return await presencaRepository.findByAluno(alunoId);
  },

  async registrar(data: CreatePresencaDTO): Promise<PresencaResponseDTO> {
    if (!data.aulaId) throw new Error('ID da aula é obrigatório');
    if (!data.alunoId) throw new Error('ID do aluno é obrigatório');
    if (!data.status) throw new Error('Status de presença é obrigatório');

    return await presencaRepository.create({
      ...data,
      id: randomUUID(),
    });
  },

  async atualizar(data: UpdatePresencaDTO): Promise<void> {
    await presencaRepository.update(data);
  },

  async deletar(id: string): Promise<void> {
    await presencaRepository.delete(id);
  },

};