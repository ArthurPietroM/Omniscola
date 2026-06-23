// src/lib/session.ts
import { db } from '@/core/infrastructure/database';
import { sessions } from '@/core/infrastructure/database/schemas/sessions';
import { users } from '@/core/infrastructure/database/schemas/users';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'omniscola_session';
const EXPIRES_DAYS = 7;

export async function createSession(userId: string) {
  const token = randomUUID();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + EXPIRES_DAYS);

  await db.insert(sessions).values({
    id: randomUUID(),
    userId,
    token,
    expiresAt: expiresAt.toISOString(),
  });

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const result = await db
    .select()
    .from(sessions)
    .where(eq(sessions.token, token))
    .limit(1);

  const session = result[0];
  if (!session) return null;

  if (new Date(session.expiresAt) < new Date()) {
    await deleteSession();
    return null;
  }

  const userResult = await db
    .select()
    .from(users)
    .where(eq(users.id, session.userId))
    .limit(1);

  return userResult[0] ?? null;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (token) {
    await db.delete(sessions).where(eq(sessions.token, token));
  }

  cookieStore.delete(COOKIE_NAME);
}