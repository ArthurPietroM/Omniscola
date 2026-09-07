'use server';

import { db } from '@/core/infrastructure/database';
import { cursos } from '@/core/infrastructure/database/schemas/cursos';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';

type CursoState = { erro?: string; sucesso?: boolean } | null;

export async function criarCursoAction(state: CursoState, formData: FormData) {
  const nome           = formData.get('nome') as string;
  const codigo         = formData.get('codigo') as string;
  const codigoNumerico = formData.get('codigoNumerico') as string;
  const descricao      = formData.get('descricao') as string;
  const institutionId  = formData.get('institutionId') as string;

  if (!nome || !codigo || !codigoNumerico) {
    return { erro: 'Nome, sigla e código numérico são obrigatórios' };
  }

  try {
    await db.insert(cursos).values({
      id: randomUUID(),
      nome,
      codigo,
      codigoNumerico,
      descricao: descricao || null,
      institutionId,
      createdAt: new Date().toISOString(),
    });
    revalidatePath('/cadastro/cursos');
    return { sucesso: true };
  } catch {
    return { erro: 'Erro ao criar curso. Verifique se o código já existe.' };
  }
}

export async function deletarCursoAction(id: string) {
  await db.delete(cursos).where(eq(cursos.id, id));
  revalidatePath('/cadastro/cursos');
}