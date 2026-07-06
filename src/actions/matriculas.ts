'use server';

import { db } from '@/core/infrastructure/database';
import { alunoTurmas } from '@/core/infrastructure/database/schemas/alunoTurmas';
import { eq, and } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';

export async function matricularAlunoAction(formData: FormData) {
  const alunoId = formData.get('alunoId') as string;
  const turmaId = formData.get('turmaId') as string;

  const existe = await db.select().from(alunoTurmas).where(
    and(eq(alunoTurmas.alunoId, alunoId), eq(alunoTurmas.turmaId, turmaId))
  ).limit(1);

  if (existe[0]) return;

  await db.insert(alunoTurmas).values({
    id: randomUUID(),
    alunoId,
    turmaId,
    status: 'ativo',
  });

  revalidatePath('/alunos');
}

export async function desmatricularAlunoAction(alunoId: string, turmaId: string) {
  await db.delete(alunoTurmas).where(
    and(eq(alunoTurmas.alunoId, alunoId), eq(alunoTurmas.turmaId, turmaId))
  );

  revalidatePath('/alunos');
}