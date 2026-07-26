import { db } from '@/core/infrastructure/database';
import { presencas } from '@/core/infrastructure/database/schemas/presencas';
import { eq } from 'drizzle-orm';
import { CreatePresencaDTO, UpdatePresencaDTO, PresencaResponseDTO } from './dtos';

function mapPresenca(p: { id: string; aulaId: string; alunoId: string; status: string }): PresencaResponseDTO {
  return {
    ...p,
    status: p.status as 'presente' | 'ausente' | 'justificado',
  };
}

export const presencaRepository = {

  async findAll(): Promise<PresencaResponseDTO[]> {
    const result = await db.select().from(presencas);
    return result.map(mapPresenca);
  },

  async findByAula(aulaId: string): Promise<PresencaResponseDTO[]> {
    const result = await db.select().from(presencas).where(eq(presencas.aulaId, aulaId));
    return result.map(mapPresenca);
  },

  async findByAluno(alunoId: string): Promise<PresencaResponseDTO[]> {
    const result = await db.select().from(presencas).where(eq(presencas.alunoId, alunoId));
    return result.map(mapPresenca);
  },

  async create(data: CreatePresencaDTO & { id: string }): Promise<PresencaResponseDTO> {
    await db.insert(presencas).values(data);
    return mapPresenca(data);
  },

  async update(data: UpdatePresencaDTO): Promise<void> {
    const { id, ...campos } = data;
    await db.update(presencas).set(campos).where(eq(presencas.id, id));
  },

  async delete(id: string): Promise<void> {
    await db.delete(presencas).where(eq(presencas.id, id));
  },

};