'use server';

import { db } from '@/core/infrastructure/database';
import { users } from '@/core/infrastructure/database/schemas/users';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { createSession, deleteSession } from '@/lib/session';
import { redirect } from 'next/navigation';

type AuthState = { erro: string } | null;

export async function login(state: AuthState, formData: FormData) {
  const email = formData.get('email') as string;
  const senha = formData.get('senha') as string;

  if (!email || !senha) {
    return { erro: 'Email e senha são obrigatórios' };
  }

  const resultado = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  const usuario = resultado[0];

  if (!usuario) {
    return { erro: 'Credenciais inválidas' };
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.passwordHash);
  if (!senhaCorreta) {
    return { erro: 'Credenciais inválidas' };
  }

  await createSession(usuario.id);
  redirect('/dashboard');
}

export async function register(state: AuthState, formData: FormData) {
  const nome = formData.get('nome') as string;
  const email = formData.get('email') as string;
  const senha = formData.get('senha') as string;
  const institutionId = formData.get('institutionId') as string;

  if (!nome || !email || !senha) {
    return { erro: 'Todos os campos são obrigatórios' };
  }

  if (senha.length < 6) {
    return { erro: 'Senha deve ter pelo menos 6 caracteres' };
  }

  const existe = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existe[0]) {
    return { erro: 'Email já cadastrado' };
  }

  const passwordHash = await bcrypt.hash(senha, 10);

 const novoUsuario = {
  id: randomUUID(),
  nome,
  email,
  passwordHash,
  role: 'professor' as const,
  institutionId: institutionId || '8815ed0e-bea7-49d7-9174-027a1c137b0e',
  createdAt: new Date().toISOString(),
};

  await db.insert(users).values(novoUsuario);
  await createSession(novoUsuario.id);
  redirect('/dashboard');
}

export async function logout() {
  await deleteSession();
  redirect('/');
}