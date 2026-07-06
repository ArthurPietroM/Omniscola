'use server';

import { db } from '@/core/infrastructure/database';
import { aulas } from '@/core/infrastructure/database/schemas/aulas';
import { presencas } from '@/core/infrastructure/database/schemas/presencas';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';

export async function criarAulaAction(formData: FormData) {
  const turmaId = formData.get('turmaId') as string;
  const data = formData.get('data') as string;
  const topico = formData.get('topico') as string;

  await db.insert(aulas).values({
    id: randomUUID(),
    turmaId,
    data,
    topico: topico || null,
  });

  revalidatePath('/presencas');
}

export async function registrarPresencaAction({
  aulaId, alunoId, status, presencaId
}: {
  aulaId: string;
  alunoId: string;
  status: string;
  presencaId?: string;
}) {
  if (presencaId) {
    await db.update(presencas).set({ status }).where(eq(presencas.id, presencaId));
  } else {
    await db.insert(presencas).values({
      id: randomUUID(),
      aulaId,
      alunoId,
      status,
    });
  }

  revalidatePath('/presencas');
}