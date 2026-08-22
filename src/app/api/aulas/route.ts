import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { db } from '@/core/infrastructure/database';
import { aulas } from '@/core/infrastructure/database/schemas/aulas';
import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export async function GET(request: Request) {
  const usuario = await getSession();
  if (!usuario) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const turmaId = searchParams.get('turmaId');

  try {
    const lista = turmaId
      ? await db.select().from(aulas).where(eq(aulas.turmaId, turmaId))
      : await db.select().from(aulas);
    return NextResponse.json(lista);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const usuario = await getSession();
  if (!usuario) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  if (usuario.role === 'aluno') return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });

  try {
    const body = await request.json();
    const nova = { id: randomUUID(), ...body };
    await db.insert(aulas).values(nova);
    return NextResponse.json(nova, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}