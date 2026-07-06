'use server';

import { notaUseCases } from '@/modules/notas/usecases';
import { db } from '@/core/infrastructure/database';
import { notas } from '@/core/infrastructure/database/schemas/notas';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function lancarNotaAction(formData: FormData) {
  const turmaId = formData.get('turmaId') as string;
  const alunoId = formData.get('alunoId') as string;
  const avaliacao = formData.get('avaliacao') as string;
  const valor = parseFloat(formData.get('valor') as string);

  const existe = await db.select().from(notas).where(
    and(eq(notas.turmaId, turmaId), eq(notas.alunoId, alunoId), eq(notas.avaliacao, avaliacao))
  ).limit(1);

  if (existe[0]) {
    await notaUseCases.atualizar({ id: existe[0].id, valor });
  } else {
    await notaUseCases.lancar({ turmaId, alunoId, avaliacao, valor });
  }

  revalidatePath('/notas');
}