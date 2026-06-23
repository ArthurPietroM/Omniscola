import { NextResponse } from 'next/server';
import { notaUseCases } from '../modules/notas/usecases';
import { CreateNotaDTO, UpdateNotaDTO } from '../modules/notas/dtos';

export const notaHandler = {
  async listarPorTurma(turmaId: string) {
    try {
      const notas = await notaUseCases.listarPorTurma(turmaId);
      return NextResponse.json(notas, { status: 200 });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async listarPorAluno(alunoId: string) {
    try {
      const notas = await notaUseCases.listarPorAluno(alunoId);
      return NextResponse.json(notas, { status: 200 });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async lancar(req: Request) {
    try {
      const body = await req.json();
      const data: CreateNotaDTO = body;
      const nota = await notaUseCases.lancar(data);
      return NextResponse.json(nota, { status: 201 });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      if (message.includes('obrigatório') || message.includes('entre 0 e 10'))
        return NextResponse.json({ error: message }, { status: 400 });
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async atualizar(req: Request, id: string) {
    try {
      const body = await req.json();
      const data: UpdateNotaDTO = { ...body, id };
      await notaUseCases.atualizar(data);
      return new NextResponse(null, { status: 204 });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async deletar(id: string) {
    try {
      await notaUseCases.deletar(id);
      return new NextResponse(null, { status: 204 });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }
};