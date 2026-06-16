
import { randomUUID } from 'crypto';
import { turmaRepository } from '../repository';
import { CreateTurmaDTO, UpdateTurmaDTO, TurmaResponseDTO } from '../dtos';

export const turmaUseCases = {

  async listar(): Promise<TurmaResponseDTO[]> {
    return await turmaRepository.findAll();
  },

  async buscarPorId(id: string): Promise<TurmaResponseDTO> {
    const turma = await turmaRepository.findById(id);
    if (!turma) throw new Error(`Turma ${id} não encontrada`);
    return turma;
  },

  async criar(data: CreateTurmaDTO): Promise<TurmaResponseDTO> {
    if (!data.nome) throw new Error('Nome da turma é obrigatório');
    if (!data.codigo) throw new Error('Código da turma é obrigatório');
    if (!data.periodo) throw new Error('Período da turma é obrigatório');

    return await turmaRepository.create({
      ...data,
      id: randomUUID(),
    });
  },

  async atualizar(data: UpdateTurmaDTO): Promise<void> {
    const existe = await turmaRepository.findById(data.id);
    if (!existe) throw new Error(`Turma ${data.id} não encontrada`);

    await turmaRepository.update(data);
  },

  async deletar(id: string): Promise<void> {
    const existe = await turmaRepository.findById(id);
    if (!existe) throw new Error(`Turma ${id} não encontrada`);

    await turmaRepository.delete(id);
  },

};