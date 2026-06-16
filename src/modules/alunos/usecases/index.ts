import { randomUUID } from 'crypto';
import { alunoRepository } from '../repository';
import { CreateAlunoDTO, UpdateAlunoDTO, AlunoResponseDTO } from '../dtos';

export const alunoUseCases = {

  async listar(): Promise<AlunoResponseDTO[]> {
    return await alunoRepository.findAll();
  },

  async buscarPorId(id: string): Promise<AlunoResponseDTO> {
    const aluno = await alunoRepository.findById(id);
    if (!aluno) throw new Error(`Aluno ${id} não encontrado`);
    return aluno;
  },

  async criar(data: CreateAlunoDTO): Promise<AlunoResponseDTO> {
    if (!data.nome) throw new Error('Nome do aluno é obrigatório');
    if (!data.email) throw new Error('Email do aluno é obrigatório');
    if (!data.matricula) throw new Error('Matrícula do aluno é obrigatória');

    return await alunoRepository.create({
      ...data,
      id: randomUUID(),
    });
  },

  async atualizar(data: UpdateAlunoDTO): Promise<void> {
    const existe = await alunoRepository.findById(data.id);
    if (!existe) throw new Error(`Aluno ${data.id} não encontrado`);

    await alunoRepository.update(data);
  },

  async deletar(id: string): Promise<void> {
    const existe = await alunoRepository.findById(id);
    if (!existe) throw new Error(`Aluno ${id} não encontrado`);

    await alunoRepository.delete(id);
  },

};