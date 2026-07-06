'use server';

import { turmaUseCases } from '@/modules/turmas/usecases';
import { revalidatePath } from 'next/cache';

type TurmaActionState = { erro?: string; sucesso?: boolean } | null;

export async function criarTurmaAction(state: TurmaActionState, formData: FormData) {
  const nome = formData.get('nome') as string;
  const codigo = formData.get('codigo') as string;
  const periodo = formData.get('periodo') as string;
  const institutionId = formData.get('institutionId') as string;

  try {
    await turmaUseCases.criar({ nome, codigo, periodo, institutionId });
    revalidatePath('/(menu)/turmas');
    return { sucesso: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro ao criar turma';
    return { erro: message };
  }
}

export async function atualizarTurmaAction(id: string, formData: FormData) {
  const nome = formData.get('nome') as string;
  const status = formData.get('status') as 'ativa' | 'encerrada';

  await turmaUseCases.atualizar({ id, nome, status });
  revalidatePath('/(menu)/turmas');
}

export async function deletarTurmaAction(id: string) {
  await turmaUseCases.deletar(id);
  revalidatePath('/(menu)/turmas');
}