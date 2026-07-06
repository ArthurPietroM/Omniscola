'use client';

import { deletarDisciplinaAction } from '@/actions/disciplinas';

type Disciplina = { id: string; nome: string; codigo: string };

export default function DisciplinaTable({ disciplinas }: { disciplinas: Disciplina[] }) {
  if (disciplinas.length === 0) {
    return <div className="bg-white border border-black/[.06] rounded-xl p-8 text-center text-gray-400 text-sm">Nenhuma disciplina cadastrada.</div>;
  }

  return (
    <div className="bg-white border border-black/[.06] rounded-xl p-4">
      <h2 className="text-sm font-medium text-[#003B6F] mb-3">Todas as disciplinas</h2>
      <div className="flex text-xs text-gray-400 pb-2 border-b border-black/[.05]">
        <span className="flex-[2]">Nome</span>
        <span className="flex-1">Código</span>
        <span className="flex-1 text-right">Ações</span>
      </div>
      {disciplinas.map((d) => (
        <div key={d.id} className="flex items-center py-2.5 border-b border-black/[.04] last:border-none">
          <span className="flex-[2] font-medium text-[#003B6F] text-xs">{d.nome}</span>
          <span className="flex-1 text-xs text-gray-400">{d.codigo}</span>
          <span className="flex-1 flex justify-end">
            <form action={deletarDisciplinaAction.bind(null, d.id)}>
              <button type="submit" className="text-xs text-red-500 hover:underline">Excluir</button>
            </form>
          </span>
        </div>
      ))}
    </div>
  );
}