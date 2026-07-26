import { db } from '@/core/infrastructure/database';
import { turmas } from '@/core/infrastructure/database/schemas/turmas';
import { eq } from 'drizzle-orm';
import { CreateTurmaDTO, UpdateTurmaDTO, TurmaResponseDTO } from './dtos';

function mapTurma(t: { id: string; institutionId: string; disciplinaId: string | null; nome: string; codigo: string; periodo: string; status: string }): TurmaResponseDTO {
  return {
    ...t,
    status: t.status as 'ativa' | 'encerrada',
  };
}

export const turmaRepository = {

  async findAll(): Promise<TurmaResponseDTO[]> {
    const result = await db.select().from(turmas);
    return result.map(mapTurma);
  },

  async findById(id: string): Promise<TurmaResponseDTO | undefined> {
    const result = await db.select().from(turmas).where(eq(turmas.id, id));
    return result[0] ? mapTurma(result[0]) : undefined;
  },

  async create(data: CreateTurmaDTO & { id: string; disciplinaId?: string | null }): Promise<TurmaResponseDTO> {
    const nova = {
      ...data,
      disciplinaId: data.disciplinaId ?? null,
      status: 'ativa' as const,
    };
    await db.insert(turmas).values(nova);
    return mapTurma(nova);
  },

  async update(data: UpdateTurmaDTO): Promise<void> {
    const { id, ...campos } = data;
    await db.update(turmas).set(campos).where(eq(turmas.id, id));
  },

  async delete(id: string): Promise<void> {
    await db.delete(turmas).where(eq(turmas.id, id));
  },

};