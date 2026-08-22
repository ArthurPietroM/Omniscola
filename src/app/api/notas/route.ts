import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { notaUseCases } from '@/modules/notas/usecases';

export async function GET(request: Request) {
  const usuario = await getSession();
  if (!usuario) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const turmaId = searchParams.get('turmaId');
  const alunoId = searchParams.get('alunoId');

  try {
    if (turmaId) {
      const notas = await notaUseCases.listarPorTurma(turmaId);
      return NextResponse.json(notas);
    }
    if (alunoId) {
      const notas = await notaUseCases.listarPorAluno(alunoId);
      return NextResponse.json(notas);
    }
    return NextResponse.json({ error: 'Informe turmaId ou alunoId' }, { status: 400 });
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
    const nota = await notaUseCases.lancar(body);
    return NextResponse.json(nota, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}