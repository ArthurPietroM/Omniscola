import { NextResponse } from 'next/server';
import { disciplinaUseCases } from '../modules/disciplinas/usecases';
import { CreateDisciplinaDTO, UpdateDisciplinaDTO } from '../modules/disciplinas/dtos';

export const disciplinaHandler = {
  async listar() {
    try {
      const disciplinas = await disciplinaUseCases.listar();
      return NextResponse.json(disciplinas, { status: 200 });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async buscarPorId(id: string) {
    try {
      const disciplina = await disciplinaUseCases.buscarPorId(id);
      return NextResponse.json(disciplina, { status: 200 });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      if (message.includes('não encontrada')) return NextResponse.json({ error: message }, { status: 404 });
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async criar(req: Request) {
    try {
      const body = await req.json();
      const data: CreateDisciplinaDTO = body;
      const disciplina = await disciplinaUseCases.criar(data);
      return NextResponse.json(disciplina, { status: 201 });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      if (message.includes('obrigatório')) return NextResponse.json({ error: message }, { status: 400 });
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async atualizar(req: Request, id: string) {
    try {
      const body = await req.json();
      const data: UpdateDisciplinaDTO = { ...body, id };
      await disciplinaUseCases.atualizar(data);
      return new NextResponse(null, { status: 204 });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      if (message.includes('não encontrada')) return NextResponse.json({ error: message }, { status: 404 });
      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async deletar(id: string) {
    try {
      await disciplinaUseCases.deletar(id);
      return new NextResponse(null, { status: 204 });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      if (message.includes('não encontrada')) return NextResponse.json({ error: message }, { status: 404 });
      return NextResponse.json({ error: message }, { status: 500 });
    }
  }
};