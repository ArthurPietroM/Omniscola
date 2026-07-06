'use client';

import { useState } from 'react';
import { criarAulaAction, registrarPresencaAction } from '@/actions/presencas';

type Turma = { id: string; nome: string; codigo: string };
type Aula = { id: string; turmaId: string; data: string; topico: string | null };
type Aluno = { id: string; nome: string; matricula: string };
type Presenca = { id: string; aulaId: string; alunoId: string; status: string };
type AlunoTurma = { id: string; alunoId: string; turmaId: string };

interface Props {
  turmas: Turma[];
  aulas: Aula[];
  alunos: Aluno[];
  presencas: Presenca[];
  alunoTurmas: AlunoTurma[];
  institutionId: string;
}

export default function PresencaPanel({ turmas, aulas, alunos, presencas, alunoTurmas, institutionId }: Props) {
  const [turmaId, setTurmaId] = useState('');
  const [aulaId, setAulaId] = useState('');
  const [criandoAula, setCriandoAula] = useState(false);
  const [pending, setPending] = useState(false);

  const aulasDaTurma = aulas.filter(a => a.turmaId === turmaId);
  const alunosDaTurma = alunoTurmas
    .filter(at => at.turmaId === turmaId)
    .map(at => alunos.find(a => a.id === at.alunoId))
    .filter(Boolean) as Aluno[];

  const aulaSelecionada = aulas.find(a => a.id === aulaId);
  const presencasDaAula = presencas.filter(p => p.aulaId === aulaId);

  function getStatus(alunoId: string) {
    return presencasDaAula.find(p => p.alunoId === alunoId)?.status ?? 'ausente';
  }

  async function handlePresenca(alunoId: string, status: string) {
    setPending(true);
    const existing = presencasDaAula.find(p => p.alunoId === alunoId);
    await registrarPresencaAction({ aulaId, alunoId, status, presencaId: existing?.id });
    setPending(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border border-black/[.06] rounded-xl p-4 flex gap-3 flex-wrap">
        <div className="flex-1 min-w-[160px]">
          <label className="text-xs text-gray-500 mb-1 block">Turma</label>
          <select
            value={turmaId}
            onChange={e => { setTurmaId(e.target.value); setAulaId(''); }}
            className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C]"
          >
            <option value="">Selecionar turma</option>
            {turmas.map(t => <option key={t.id} value={t.id}>{t.nome} · {t.codigo}</option>)}
          </select>
        </div>

        {turmaId && (
          <div className="flex-1 min-w-[160px]">
            <label className="text-xs text-gray-500 mb-1 block">Aula</label>
            <select
              value={aulaId}
              onChange={e => setAulaId(e.target.value)}
              className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C]"
            >
              <option value="">Selecionar aula</option>
              {aulasDaTurma.map(a => <option key={a.id} value={a.id}>{a.data}{a.topico ? ` · ${a.topico}` : ''}</option>)}
            </select>
          </div>
        )}

        {turmaId && (
          <div className="flex items-end">
            <button
              onClick={() => setCriandoAula(!criandoAula)}
              className="bg-[#003B6F] hover:bg-[#002a50] text-white rounded-lg px-4 py-2 text-sm transition-colors"
            >
              + Nova aula
            </button>
          </div>
        )}
      </div>

      {criandoAula && turmaId && (
        <form
          action={async (fd) => {
            fd.append('turmaId', turmaId);
            await criarAulaAction(fd);
            setCriandoAula(false);
          }}
          className="bg-white border border-black/[.06] rounded-xl p-4 flex gap-3"
        >
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">Data</label>
            <input name="data" type="date" className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C]" />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">Tópico (opcional)</label>
            <input name="topico" type="text" placeholder="Ex: Introdução ao SQL" className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C]" />
          </div>
          <div className="flex items-end gap-2">
            <button type="submit" className="bg-[#E8601C] text-white rounded-lg px-4 py-2 text-sm">Criar</button>
            <button type="button" onClick={() => setCriandoAula(false)} className="text-sm text-gray-400">Cancelar</button>
          </div>
        </form>
      )}

      {aulaId && (
        <div className="bg-white border border-black/[.06] rounded-xl p-4">
          <h2 className="text-sm font-medium text-[#003B6F] mb-1">
            Chamada · {aulaSelecionada?.data}
          </h2>
          {alunosDaTurma.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">Nenhum aluno matriculado nesta turma.</p>
          ) : (
            <>
              <div className="flex text-xs text-gray-400 pb-2 border-b border-black/[.05] mt-3">
                <span className="flex-[2]">Aluno</span>
                <span className="flex-1">Matrícula</span>
                <span className="flex-[2]">Presença</span>
              </div>
              {alunosDaTurma.map((a) => {
                const status = getStatus(a.id);
                return (
                  <div key={a.id} className="flex items-center py-2.5 border-b border-black/[.04] last:border-none">
                    <span className="flex-[2] font-medium text-[#003B6F] text-xs">{a.nome}</span>
                    <span className="flex-1 text-xs text-gray-400">{a.matricula}</span>
                    <span className="flex-[2] flex gap-2">
                      {(['presente', 'ausente', 'justificado'] as const).map(s => (
                        <button
                          key={s}
                          disabled={pending}
                          onClick={() => handlePresenca(a.id, s)}
                          className={`text-xs px-2 py-0.5 rounded-full border transition-colors capitalize ${
                            status === s
                              ? s === 'presente' ? 'bg-green-100 text-green-700 border-green-300'
                              : s === 'ausente' ? 'bg-red-100 text-red-600 border-red-300'
                              : 'bg-yellow-100 text-yellow-700 border-yellow-300'
                              : 'border-black/[.1] text-gray-400 hover:border-[#E8601C]'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </span>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
}