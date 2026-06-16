import { NextResponse } from 'next/server';
import { turmaUseCases } from '../modules/turmas/usecases';
import { CreateTurmaDTO, UpdateTurmaDTO } from '../modules/turmas/dtos';

export const turmaHandler = {
  async listar() {
    try {
      const turmas = await turmaUseCases.listar();
      return NextResponse.json(turmas, { status: 200 });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';

      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async buscarPorId(id: string) {
    try {
      const turma = await turmaUseCases.buscarPorId(id);
      return NextResponse.json(turma, { status: 200 });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';

      if (message.includes('não encontrada')) {
        return NextResponse.json({ error: message }, { status: 404 });
      }

      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async criar(req: Request) {
    try {
      const body = await req.json();
      const data: CreateTurmaDTO = body;

      const turma = await turmaUseCases.criar(data);
      return NextResponse.json(turma, { status: 201 });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';

      if (message.includes('obrigatório')) {
        return NextResponse.json({ error: message }, { status: 400 });
      }

      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async atualizar(req: Request, id: string) {
    try {
      const body = await req.json();
      const data: UpdateTurmaDTO = { ...body, id };

      await turmaUseCases.atualizar(data);
      return new NextResponse(null, { status: 204 });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';

      if (message.includes('não encontrada')) {
        return NextResponse.json({ error: message }, { status: 404 });
      }

      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async deletar(id: string) {
    try {
      await turmaUseCases.deletar(id);
      return new NextResponse(null, { status: 204 });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';

      if (message.includes('não encontrada')) {
        return NextResponse.json({ error: message }, { status: 404 });
      }

      return NextResponse.json({ error: message }, { status: 500 });
    }
  }
};