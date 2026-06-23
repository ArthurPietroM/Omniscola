import { db } from '@/core/infrastructure/database';
import { disciplinas } from '@/core/infrastructure/database/schemas/disciplinas';
import { eq } from 'drizzle-orm';
import { Disciplina, CreateDisciplinaDTO, UpdateDisciplinaDTO } from '@/shared/types';

export const disciplinaRepository = {

  async findAll(): Promise<Disciplina[]> {
    return await db.select().from(disciplinas);
  },

  async findById(id: string): Promise<Disciplina | undefined> {
    const result = await db.select().from(disciplinas).where(eq(disciplinas.id, id));
    return result[0];
  },

  async create(data: CreateDisciplinaDTO & { id: string }): Promise<Disciplina> {
    await db.insert(disciplinas).values(data);
    return data as Disciplina;
  },

  async update(data: UpdateDisciplinaDTO): Promise<void> {
    const { id, ...campos } = data;
    await db.update(disciplinas).set(campos).where(eq(disciplinas.id, id));
  },

  async delete(id: string): Promise<void> {
    await db.delete(disciplinas).where(eq(disciplinas.id, id));
  },

};
