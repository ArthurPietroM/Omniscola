'use server';

import { db } from '@/core/infrastructure/database';
import { requerimentos } from '@/core/infrastructure/database/schemas/requerimentos';
import { alunos } from '@/core/infrastructure/database/schemas/alunos';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

function gerarProtocolo(): string {
  const agora = new Date();
  const ano = agora.getFullYear();
  const seq = Math.floor(Math.random() * 9000) + 1000;
  return `${ano}.07.${seq}`;
}

export async function solicitarRequerimentoAction(
  _prevState: { erro?: string; sucesso?: boolean } | null,
  formData: FormData
) {
  const usuario = await getSession();
  if (!usuario) redirect('/');

  const tipo = formData.get('tipo') as string;
  const periodoRef = formData.get('periodoRef') as string;

  const aluno = await db.select().from(alunos)
    .where(eq(alunos.email, usuario.email)).limit(1);

  if (!aluno[0]) return { erro: 'Aluno não encontrado' };

  await db.insert(requerimentos).values({
    id: randomUUID(),
    alunoId: aluno[0].id,
    protocolo: gerarProtocolo(),
    tipo,
    situacao: 'concluido',
    periodoRef: periodoRef || null,
    createdAt: new Date().toISOString(),
    concluidoAt: new Date().toISOString(),
  });

  revalidatePath('/portal/documentos');
  revalidatePath('/gestao/secretaria/requerimentos');

  return { sucesso: true }; // Retorno com sucesso
}