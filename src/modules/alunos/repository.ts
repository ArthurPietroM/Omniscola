import { db } from '@/core/infrastructure/database';
import { alunos } from '@/core/infrastructure/database/schemas/alunos';
import { eq } from 'drizzle-orm';
import { CreateAlunoDTO, UpdateAlunoDTO, AlunoResponseDTO } from './dtos';

export const alunoRepository = {

  async findAll(): Promise<AlunoResponseDTO[]> {
    return await db.select().from(alunos);
  },

  async findById(id: string): Promise<AlunoResponseDTO | undefined> {
    const result = await db.select().from(alunos).where(eq(alunos.id, id));
    return result[0];
  },

  async findByTurma(turmaId: string): Promise<AlunoResponseDTO[]> {
    return await db.select().from(alunos).where(eq(alunos.institutionId, turmaId));
  },

  async create(data: CreateAlunoDTO & { id: string }): Promise<AlunoResponseDTO> {
    await db.insert(alunos).values(data);
    return data as AlunoResponseDTO;
  },

  async update(data: UpdateAlunoDTO): Promise<void> {
    const { id, ...campos } = data;
    await db.update(alunos).set(campos).where(eq(alunos.id, id));
  },

  async delete(id: string): Promise<void> {
    await db.delete(alunos).where(eq(alunos.id, id));
  },

};