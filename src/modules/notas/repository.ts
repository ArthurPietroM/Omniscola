
import { db } from '@/core/infrastructure/database';
import { notas } from '@/core/infrastructure/database/schemas/notas';
import { eq } from 'drizzle-orm';
import { CreateNotaDTO, UpdateNotaDTO, NotaResponseDTO } from './dtos';

export const notaRepository = {

  async findAll(): Promise<NotaResponseDTO[]> {
    return await db.select().from(notas);
  },

  async findByAluno(alunoId: string): Promise<NotaResponseDTO[]> {
    return await db.select().from(notas).where(eq(notas.alunoId, alunoId));
  },

  async findByTurma(turmaId: string): Promise<NotaResponseDTO[]> {
    return await db.select().from(notas).where(eq(notas.turmaId, turmaId));
  },

  async create(data: CreateNotaDTO & { id: string }): Promise<NotaResponseDTO> {
    await db.insert(notas).values(data);
    return data as NotaResponseDTO;
  },

  async update(data: UpdateNotaDTO): Promise<void> {
    const { id, ...campos } = data;
    await db.update(notas).set(campos).where(eq(notas.id, id));
  },

  async delete(id: string): Promise<void> {
    await db.delete(notas).where(eq(notas.id, id));
  },

};