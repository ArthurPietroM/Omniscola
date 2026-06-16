
import { db } from '@/core/infrastructure/database';
import { turmas } from '@/core/infrastructure/database/schemas/turmas';
import { eq } from 'drizzle-orm';
import { CreateTurmaDTO, UpdateTurmaDTO, TurmaResponseDTO } from './dtos';

export const turmaRepository = {

  async findAll(): Promise<TurmaResponseDTO[]> {
    return await db.select().from(turmas);
  },

  async findById(id: string): Promise<TurmaResponseDTO | undefined> {
    const result = await db.select().from(turmas).where(eq(turmas.id, id));
    return result[0];
  },

  async create(data: CreateTurmaDTO & { id: string }): Promise<TurmaResponseDTO> {
    const nova = { ...data, status: 'ativa' as const };
    await db.insert(turmas).values(nova);
    return nova as TurmaResponseDTO;
  },

  async update(data: UpdateTurmaDTO): Promise<void> {
    const { id, ...campos } = data;
    await db.update(turmas).set(campos).where(eq(turmas.id, id));
  },

  async delete(id: string): Promise<void> {
    await db.delete(turmas).where(eq(turmas.id, id));
  },

};