'use client';

import { useActionState, useRef, useEffect } from 'react';
import { criarTurmaAction } from '@/actions/turmas';

type Disciplina = { id: string; nome: string };

interface TurmaFormProps {
  institutionId: string;
  disciplinas: Disciplina[];
}

export default function TurmaForm({ institutionId, disciplinas }: TurmaFormProps) {
  const [state, action, pending] = useActionState(criarTurmaAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.sucesso) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <div className="bg-white border border-black/[.06] rounded-xl p-4">
      <h2 className="text-sm font-medium text-[#003B6F] mb-3">Nova turma</h2>

      {state?.erro && (
        <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mb-3">
          {state.erro}
        </div>
      )}
      {state?.sucesso && (
        <div className="bg-green-50 text-green-700 text-sm px-3 py-2 rounded-lg mb-3">
          Turma criada com sucesso!
        </div>
      )}

      <form ref={formRef} action={action} className="grid grid-cols-4 gap-3">
        <input type="hidden" name="institutionId" value={institutionId} />

        <div>
          <label className="text-xs text-gray-500 mb-1 block">Nome</label>
          <input
            name="nome"
            type="text"
            placeholder="Análise e Desenvolvimento"
            className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C] transition-colors"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1 block">Código</label>
          <input
            name="codigo"
            type="text"
            placeholder="ADS01"
            className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C] transition-colors"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1 block">Período</label>
          <input
            name="periodo"
            type="text"
            placeholder="2025.1"
            className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C] transition-colors"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1 block">Disciplina</label>
          <select
            name="disciplinaId"
            className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C] transition-colors"
          >
            <option value="">Nenhuma</option>
            {disciplinas.map((d) => (
              <option key={d.id} value={d.id}>{d.nome}</option>
            ))}
          </select>
        </div>

        <div className="col-span-4">
          <button
            type="submit"
            disabled={pending}
            className="bg-[#E8601C] hover:bg-[#cf5418] disabled:opacity-60 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            {pending ? 'Criando...' : '+ Criar turma'}
          </button>
        </div>
      </form>
    </div>
  );
}