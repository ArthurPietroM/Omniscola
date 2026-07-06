'use server';

import { disciplinaUseCases } from '@/modules/disciplinas/usecases';
import { revalidatePath } from 'next/cache';

type DisciplinaState = { erro?: string; sucesso?: boolean } | null;

export async function criarDisciplinaAction(state: DisciplinaState, formData: FormData) {
  const nome = formData.get('nome') as string;
  const codigo = formData.get('codigo') as string;
  const institutionId = formData.get('institutionId') as string;

  try {
    await disciplinaUseCases.criar({ nome, codigo, institutionId });
    revalidatePath('/disciplinas');
    return { sucesso: true };
  } catch (error) {
    return { erro: error instanceof Error ? error.message : 'Erro ao criar disciplina' };
  }
}

export async function deletarDisciplinaAction(id: string) {
  await disciplinaUseCases.deletar(id);
  revalidatePath('/disciplinas');
}