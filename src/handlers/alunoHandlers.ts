import { NextResponse } from 'next/server';
import { alunoUseCases } from '../modules/alunos/usecases';
import { CreateAlunoDTO, UpdateAlunoDTO } from '../modules/alunos/dtos';

export const alunoHandler = {
  async listar() {
    try {
      const alunos = await alunoUseCases.listar();
      return NextResponse.json(alunos, { status: 200 });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';

      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async buscarPorId(id: string) {
    try {
      const aluno = await alunoUseCases.buscarPorId(id);
      return NextResponse.json(aluno, { status: 200 });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';

      if (message.includes('não encontrado')) {
        return NextResponse.json({ error: message }, { status: 404 });
      }

      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async criar(req: Request) {
    try {
      const body = await req.json();
      const data: CreateAlunoDTO = body;

      const aluno = await alunoUseCases.criar(data);
      return NextResponse.json(aluno, { status: 201 });
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
      const data: UpdateAlunoDTO = { ...body, id };

      await alunoUseCases.atualizar(data);
      return new NextResponse(null, { status: 204 });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';

      if (message.includes('não encontrado')) {
        return NextResponse.json({ error: message }, { status: 404 });
      }

      return NextResponse.json({ error: message }, { status: 500 });
    }
  },

  async deletar(id: string) {
    try {
      await alunoUseCases.deletar(id);
      return new NextResponse(null, { status: 204 });
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : 'Erro desconhecido';

      if (message.includes('não encontrado')) {
        return NextResponse.json({ error: message }, { status: 404 });
      }

      return NextResponse.json({ error: message }, { status: 500 });
    }
  }
};