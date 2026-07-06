import { randomUUID } from 'crypto';
import { disciplinaRepository } from '../repository';
import { CreateDisciplinaDTO, UpdateDisciplinaDTO, DisciplinaResponseDTO } from '../dtos';

export const disciplinaUseCases = {

  async listar(): Promise<DisciplinaResponseDTO[]> {
    return await disciplinaRepository.findAll();
  },

  async buscarPorId(id: string): Promise<DisciplinaResponseDTO> {
    const disciplina = await disciplinaRepository.findById(id);
    if (!disciplina) throw new Error(`Disciplina ${id} não encontrada`);
    return disciplina;
  },

  async criar(data: CreateDisciplinaDTO): Promise<DisciplinaResponseDTO> {
    if (!data.nome) throw new Error('Nome da disciplina é obrigatório');
    if (!data.codigo) throw new Error('Código da disciplina é obrigatório');

    return await disciplinaRepository.create({
      ...data,
      id: randomUUID(),
    });
  },

  async atualizar(data: UpdateDisciplinaDTO): Promise<void> {
    const existe = await disciplinaRepository.findById(data.id);
    if (!existe) throw new Error(`Disciplina ${data.id} não encontrada`);
    await disciplinaRepository.update(data);
  },

  async deletar(id: string): Promise<void> {
    const existe = await disciplinaRepository.findById(id);
    if (!existe) throw new Error(`Disciplina ${id} não encontrada`);
    await disciplinaRepository.delete(id);
  },

};