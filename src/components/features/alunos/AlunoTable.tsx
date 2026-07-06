'use client';

import { useState } from 'react';
import { deletarAlunoAction } from '@/actions/alunos';
import { matricularAlunoAction, desmatricularAlunoAction } from '@/actions/matriculas';

type Aluno = { id: string; nome: string; email: string; matricula: string };
type Turma = { id: string; nome: string; codigo: string };
type Matricula = { id: string; alunoId: string; turmaId: string };

interface Props {
  alunos: Aluno[];
  turmas: Turma[];
  matriculas: Matricula[];
}

export default function AlunoTable({ alunos, turmas, matriculas }: Props) {
  const [expandidoId, setExpandidoId] = useState<string | null>(null);

  if (alunos.length === 0) {
    return (
      <div className="bg-white border border-black/[.06] rounded-xl p-8 text-center text-gray-400 text-sm">
        Nenhum aluno cadastrado ainda.
      </div>
    );
  }

  function turmasDoAluno(alunoId: string) {
    return matriculas
      .filter(m => m.alunoId === alunoId)
      .map(m => turmas.find(t => t.id === m.turmaId))
      .filter(Boolean) as Turma[];
  }

  function turmasDisponiveis(alunoId: string) {
    const matriculadas = matriculas.filter(m => m.alunoId === alunoId).map(m => m.turmaId);
    return turmas.filter(t => !matriculadas.includes(t.id));
  }

  return (
    <div className="bg-white border border-black/[.06] rounded-xl p-4">
      <h2 className="text-sm font-medium text-[#003B6F] mb-3">Todos os alunos</h2>

      <div className="flex text-xs text-gray-400 pb-2 border-b border-black/[.05]">
        <span className="flex-[2]">Nome</span>
        <span className="flex-[2]">Email</span>
        <span className="flex-1">Matrícula</span>
        <span className="flex-1 text-right">Ações</span>
      </div>

      {alunos.map((a) => (
        <div key={a.id} className="border-b border-black/[.04] last:border-none">
          <div className="flex items-center py-2.5">
            <span className="flex-[2] font-medium text-[#003B6F] text-xs">{a.nome}</span>
            <span className="flex-[2] text-xs text-gray-400">{a.email}</span>
            <span className="flex-1 text-xs text-gray-400">{a.matricula}</span>
            <span className="flex-1 flex justify-end gap-3">
              <button
                onClick={() => setExpandidoId(expandidoId === a.id ? null : a.id)}
                className="text-xs text-[#003B6F] hover:underline"
              >
                {expandidoId === a.id ? 'Fechar' : 'Turmas'}
              </button>
              <form action={deletarAlunoAction.bind(null, a.id)}>
                <button type="submit" className="text-xs text-red-500 hover:underline">
                  Excluir
                </button>
              </form>
            </span>
          </div>

          {expandidoId === a.id && (
            <div className="pb-3 px-2 flex flex-col gap-2">
              <div className="flex flex-wrap gap-1.5">
                {turmasDoAluno(a.id).length === 0 ? (
                  <span className="text-xs text-gray-400">Sem turmas matriculadas.</span>
                ) : (
                  turmasDoAluno(a.id).map(t => (
                    <span key={t.id} className="flex items-center gap-1 text-xs bg-[#E6EEF5] text-[#003B6F] px-2 py-0.5 rounded-full">
                      {t.nome} · {t.codigo}
                      <form action={desmatricularAlunoAction.bind(null, a.id, t.id)} className="inline">
                        <button type="submit" className="text-[#003B6F]/40 hover:text-red-500 ml-1">✕</button>
                      </form>
                    </span>
                  ))
                )}
              </div>

              {turmasDisponiveis(a.id).length > 0 && (
                <form action={matricularAlunoAction} className="flex gap-2 items-center">
                  <input type="hidden" name="alunoId" value={a.id} />
                  <select
                    name="turmaId"
                    className="border border-black/[.1] rounded-lg px-2 py-1 text-xs text-gray-800 outline-none focus:border-[#E8601C]"
                  >
                    {turmasDisponiveis(a.id).map(t => (
                      <option key={t.id} value={t.id}>{t.nome} · {t.codigo}</option>
                    ))}
                  </select>
                  <button type="submit" className="text-xs bg-[#E8601C] text-white px-3 py-1 rounded-lg hover:bg-[#cf5418]">
                    Matricular
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}