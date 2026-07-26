'use server';

import { db } from '@/core/infrastructure/database';
import { users } from '@/core/infrastructure/database/schemas/users';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { randomUUID } from 'crypto';

async function verificarAdmin() {
  const usuario = await getSession();
  if (!usuario || usuario.role !== 'admin') redirect('/dashboard');
  return usuario;
}

type AdminState = { erro?: string; sucesso?: string } | null;

export async function atualizarUsuarioAction(state: AdminState, formData: FormData) {
  await verificarAdmin();

  const id    = formData.get('id') as string;
  const nome  = formData.get('nome') as string;
  const email = formData.get('email') as string;
  const role  = formData.get('role') as string;

  try {
    await db.update(users).set({ nome, email, role }).where(eq(users.id, id));
    revalidatePath('/admin');
    return { sucesso: 'Usuário atualizado com sucesso!' };
  } catch {
    return { erro: 'Erro ao atualizar usuário.' };
  }
}

export async function resetarSenhaAction(state: AdminState, formData: FormData) {
  await verificarAdmin();

  const id          = formData.get('id') as string;
  const novaSenha   = formData.get('novaSenha') as string;

  if (!novaSenha || novaSenha.length < 6) {
    return { erro: 'Senha deve ter pelo menos 6 caracteres.' };
  }

  const passwordHash = await bcrypt.hash(novaSenha, 10);

  try {
    await db.update(users).set({ passwordHash }).where(eq(users.id, id));
    revalidatePath('/admin');
    return { sucesso: 'Senha resetada com sucesso!' };
  } catch {
    return { erro: 'Erro ao resetar senha.' };
  }
}

export async function toggleAtivoAction(id: string, ativo: boolean) {
  await verificarAdmin();
  await db.update(users).set({ ativo: !ativo }).where(eq(users.id, id));
  revalidatePath('/admin');
}

export async function criarUsuarioAction(state: AdminState, formData: FormData) {
  await verificarAdmin();

  const nome         = formData.get('nome') as string;
  const email        = formData.get('email') as string;
  const senha        = formData.get('senha') as string;
  const role         = formData.get('role') as string;
  const institutionId = formData.get('institutionId') as string;

  if (!nome || !email || !senha) {
    return { erro: 'Todos os campos são obrigatórios.' };
  }

  if (senha.length < 6) {
    return { erro: 'Senha deve ter pelo menos 6 caracteres.' };
  }

  const existe = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existe[0]) {
    return { erro: 'Email já cadastrado.' };
  }

  const passwordHash = await bcrypt.hash(senha, 10);

  try {
    await db.insert(users).values({
      id: randomUUID(),
      nome,
      email,
      passwordHash,
      role,
      institutionId,
      ativo: true,
      createdAt: new Date().toISOString(),
    });
    revalidatePath('/admin');
    return { sucesso: 'Usuário criado com sucesso!' };
  } catch {
    return { erro: 'Erro ao criar usuário.' };
  }
}