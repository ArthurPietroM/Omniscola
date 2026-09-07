'use client';

import { deletarCursoAction } from '@/actions/cursos';

type Curso = { id: string; nome: string; codigo: string; codigoNumerico: string; descricao: string | null };

export default function CursoTable({ cursos }: { cursos: Curso[] }) {
  if (cursos.length === 0) {
    return <div className="bg-white border border-black/[.06] rounded-xl p-8 text-center text-gray-400 text-sm">Nenhum curso cadastrado ainda.</div>;
  }

  return (
    <div className="bg-white border border-black/[.06] rounded-xl p-4">
      <h2 className="text-sm font-medium text-[#003B6F] mb-3">Cursos cadastrados</h2>
      <div className="flex text-xs text-gray-400 pb-2 border-b border-black/[.05]">
        <span className="flex-[3]">Nome</span>
        <span className="flex-1">Sigla</span>
        <span className="flex-1">Cód. Numérico</span>
        <span className="flex-1 text-right">Ações</span>
      </div>
      {cursos.map((c) => (
        <div key={c.id} className="flex items-center py-2.5 border-b border-black/[.04] last:border-none">
          <span className="flex-[3] font-medium text-[#003B6F] text-xs">{c.nome}</span>
          <span className="flex-1 text-xs text-gray-400">{c.codigo}</span>
          <span className="flex-1 text-xs text-gray-400">{c.codigoNumerico}</span>
          <span className="flex-1 flex justify-end">
            <form action={deletarCursoAction.bind(null, c.id)}>
              <button type="submit" className="text-xs text-red-500 hover:underline">Excluir</button>
            </form>
          </span>
        </div>
      ))}
    </div>
  );
}