import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { alunoUseCases } from '@/modules/alunos/usecases';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const usuario = await getSession();
  if (!usuario) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });

  try {
    const { id } = await params;
    const aluno = await alunoUseCases.buscarPorId(id);
    return NextResponse.json(aluno);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 404 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const usuario = await getSession();
  if (!usuario) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  if (usuario.role === 'aluno') return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });

  try {
    const { id } = await params;
    const body = await request.json();
    await alunoUseCases.atualizar({ ...body, id });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const usuario = await getSession();
  if (!usuario) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  if (!['admin'].includes(usuario.role)) return NextResponse.json({ error: 'Sem permissão' }, { status: 403 });

  try {
    const { id } = await params;
    await alunoUseCases.deletar(id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}