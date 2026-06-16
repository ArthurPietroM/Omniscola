
import { db } from '@/core/infrastructure/database';
import { presencas } from '@/core/infrastructure/database/schemas/presencas';
import { eq } from 'drizzle-orm';
import { CreatePresencaDTO, UpdatePresencaDTO, PresencaResponseDTO } from './dtos';

export const presencaRepository = {

  async findAll(): Promise<PresencaResponseDTO[]> {
    return await db.select().from(presencas);
  },

  async findByAula(aulaId: string): Promise<PresencaResponseDTO[]> {
    return await db.select().from(presencas).where(eq(presencas.aulaId, aulaId));
  },

  async findByAluno(alunoId: string): Promise<PresencaResponseDTO[]> {
    return await db.select().from(presencas).where(eq(presencas.alunoId, alunoId));
  },

  async create(data: CreatePresencaDTO & { id: string }): Promise<PresencaResponseDTO> {
    await db.insert(presencas).values(data);
    return data as PresencaResponseDTO;
  },

  async update(data: UpdatePresencaDTO): Promise<void> {
    const { id, ...campos } = data;
    await db.update(presencas).set(campos).where(eq(presencas.id, id));
  },

  async delete(id: string): Promise<void> {
    await db.delete(presencas).where(eq(presencas.id, id));
  },

};