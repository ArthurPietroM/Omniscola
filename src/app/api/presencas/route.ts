import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { presencaUseCases } from '@/modules/presencas/usecases';

export async function GET(request: Request) {
  const usuario = await getSession();
  if (!usuario) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const aulaId = searchParams.get('aulaId');
  const alunoId = searchParams.get('alunoId');

  try {
    if (aulaId) {
      const presencas = await presencaUseCases.listarPorAula(aulaId);
      return NextResponse.json(presencas);
    }
    if (alunoId) {
      const presencas = await presencaUseCases.listarPorAluno(alunoId);
      return NextResponse.json(presencas);
    }
    return NextResponse.json({ error: 'Informe aulaId ou alunoId' }, { status: 400 });
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
    const presenca = await presencaUseCases.registrar(body);
    return NextResponse.json(presenca, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}