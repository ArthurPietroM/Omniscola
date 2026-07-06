'use client';

import { useState } from 'react';
import { lancarNotaAction } from '@/actions/notas';

type Turma = { id: string; nome: string; codigo: string };
type Aluno = { id: string; nome: string; matricula: string };
type Nota = { id: string; turmaId: string; alunoId: string; avaliacao: string; valor: number };
type AlunoTurma = { id: string; alunoId: string; turmaId: string };

interface Props {
  turmas: Turma[];
  alunos: Aluno[];
  notas: Nota[];
  alunoTurmas: AlunoTurma[];
}

export default function NotaPanel({ turmas, alunos, notas, alunoTurmas }: Props) {
  const [turmaId, setTurmaId] = useState('');
  const [avaliacao, setAvaliacao] = useState('');

  const alunosDaTurma = alunoTurmas
    .filter(at => at.turmaId === turmaId)
    .map(at => alunos.find(a => a.id === at.alunoId))
    .filter(Boolean) as Aluno[];

  function getNota(alunoId: string) {
    return notas.find(n => n.turmaId === turmaId && n.alunoId === alunoId && n.avaliacao === avaliacao)?.valor ?? '';
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border border-black/[.06] rounded-xl p-4 flex gap-3 flex-wrap">
        <div className="flex-1 min-w-[160px]">
          <label className="text-xs text-gray-500 mb-1 block">Turma</label>
          <select
            value={turmaId}
            onChange={e => setTurmaId(e.target.value)}
            className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C]"
          >
            <option value="">Selecionar turma</option>
            {turmas.map(t => <option key={t.id} value={t.id}>{t.nome} · {t.codigo}</option>)}
          </select>
        </div>
        <div className="flex-1 min-w-[160px]">
          <label className="text-xs text-gray-500 mb-1 block">Avaliação</label>
          <input
            value={avaliacao}
            onChange={e => setAvaliacao(e.target.value)}
            placeholder="Ex: Prova 1, Trabalho Final"
            className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C]"
          />
        </div>
      </div>

      {turmaId && avaliacao && (
        <div className="bg-white border border-black/[.06] rounded-xl p-4">
          <h2 className="text-sm font-medium text-[#003B6F] mb-3">
            Lançar notas · {avaliacao}
          </h2>
          {alunosDaTurma.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">Nenhum aluno matriculado nesta turma.</p>
          ) : (
            <>
              <div className="flex text-xs text-gray-400 pb-2 border-b border-black/[.05]">
                <span className="flex-[2]">Aluno</span>
                <span className="flex-1">Matrícula</span>
                <span className="flex-1">Nota (0–10)</span>
              </div>
              {alunosDaTurma.map((a) => (
                <form
                  key={a.id}
                  action={lancarNotaAction}
                  className="flex items-center py-2.5 border-b border-black/[.04] last:border-none gap-3"
                >
                  <input type="hidden" name="turmaId" value={turmaId} />
                  <input type="hidden" name="alunoId" value={a.id} />
                  <input type="hidden" name="avaliacao" value={avaliacao} />
                  <span className="flex-[2] font-medium text-[#003B6F] text-xs">{a.nome}</span>
                  <span className="flex-1 text-xs text-gray-400">{a.matricula}</span>
                  <div className="flex-1 flex gap-2 items-center">
                    <input
                      name="valor"
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      defaultValue={getNota(a.id)}
                      className="w-20 border border-black/[.1] rounded-lg px-2 py-1 text-sm text-gray-800 outline-none focus:border-[#E8601C]"
                    />
                    <button type="submit" className="text-xs text-[#E8601C] hover:underline">Salvar</button>
                  </div>
                </form>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}