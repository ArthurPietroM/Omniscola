import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { disciplinaUseCases } from '@/modules/disciplinas/usecases';

export async function GET() {
  const usuario = await getSession();
  if (!usuario) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  try {
    const disciplinas = await disciplinaUseCases.listar();
    return NextResponse.json(disciplinas);
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
    const disciplina = await disciplinaUseCases.criar({ ...body, institutionId: usuario.institutionId });
    return NextResponse.json(disciplina, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}