'use server';

import { alunoUseCases } from '@/modules/alunos/usecases';
import { revalidatePath } from 'next/cache';

type AlunoState = { erro?: string; sucesso?: boolean } | null;

export async function criarAlunoAction(state: AlunoState, formData: FormData) {
  const nome = formData.get('nome') as string;
  const email = formData.get('email') as string;
  const matricula = formData.get('matricula') as string;
  const institutionId = formData.get('institutionId') as string;

  try {
    await alunoUseCases.criar({ nome, email, matricula, institutionId });
    revalidatePath('/alunos');
    return { sucesso: true };
  } catch (error) {
    return { erro: error instanceof Error ? error.message : 'Erro ao cadastrar aluno' };
  }
}

export async function deletarAlunoAction(id: string) {
  await alunoUseCases.deletar(id);
  revalidatePath('/alunos');
}