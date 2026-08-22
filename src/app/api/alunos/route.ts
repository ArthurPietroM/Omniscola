import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { alunoUseCases } from '@/modules/alunos/usecases';

export async function GET() {
  const usuario = await getSession();
  if (!usuario) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  try {
    const alunos = await alunoUseCases.listar();
    return NextResponse.json(alunos);
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
    const aluno = await alunoUseCases.criar({ ...body, institutionId: usuario.institutionId });
    return NextResponse.json(aluno, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}