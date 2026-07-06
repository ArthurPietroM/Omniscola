'use client';

import { useState } from 'react';
import { atualizarTurmaAction, deletarTurmaAction } from '@/actions/turmas';

type Turma = {
  id: string;
  nome: string;
  codigo: string;
  periodo: string;
  status: string;
};

interface TurmaTableProps {
  turmas: Turma[];
}

export default function TurmaTable({ turmas }: TurmaTableProps) {
  const [editandoId, setEditandoId] = useState<string | null>(null);

  if (turmas.length === 0) {
    return (
      <div className="bg-white border border-black/[.06] rounded-xl p-8 text-center text-gray-400 text-sm">
        Nenhuma turma cadastrada ainda.
      </div>
    );
  }

  return (
    <div className="bg-white border border-black/[.06] rounded-xl p-4">
      <h2 className="text-sm font-medium text-[#003B6F] mb-3">Todas as turmas</h2>

      <div className="flex text-xs text-gray-400 pb-2 border-b border-black/[.05]">
        <span className="flex-[2]">Turma</span>
        <span className="flex-1">Período</span>
        <span className="flex-1">Status</span>
        <span className="flex-1 text-right">Ações</span>
      </div>

      {turmas.map((t) => (
        <div key={t.id} className="border-b border-black/[.04] last:border-none">
          {editandoId === t.id ? (
            <FormEdicao turma={t} onCancelar={() => setEditandoId(null)} />
          ) : (
            <div className="flex items-center py-2.5">
              <span className="flex-[2] font-medium text-[#003B6F] text-xs">
                {t.nome} · {t.codigo}
              </span>
              <span className="flex-1 text-xs text-gray-400">{t.periodo}</span>
              <span className="flex-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  t.status === 'ativa'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {t.status === 'ativa' ? 'Ativa' : 'Encerrada'}
                </span>
              </span>
              <span className="flex-1 flex justify-end gap-2">
                <button
                  onClick={() => setEditandoId(t.id)}
                  className="text-xs text-[#003B6F] hover:underline"
                >
                  Editar
                </button>
                <form action={deletarTurmaAction.bind(null, t.id)}>
                  <button type="submit" className="text-xs text-red-500 hover:underline">
                    Excluir
                  </button>
                </form>
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function FormEdicao({ turma, onCancelar }: { turma: Turma; onCancelar: () => void }) {
  return (
    <form
      action={async (formData) => {
        await atualizarTurmaAction(turma.id, formData);
        onCancelar();
      }}
      className="flex items-center gap-2 py-2.5"
    >
      <input
        name="nome"
        defaultValue={turma.nome}
        className="flex-[2] border border-black/[.1] rounded-lg px-2 py-1 text-xs text-gray-800 outline-none focus:border-[#E8601C]"
      />
      <select
        name="status"
        defaultValue={turma.status}
        className="flex-1 border border-black/[.1] rounded-lg px-2 py-1 text-xs text-gray-800 outline-none focus:border-[#E8601C]"
      >
        <option value="ativa">Ativa</option>
        <option value="encerrada">Encerrada</option>
      </select>
      <div className="flex-1 flex justify-end gap-2">
        <button type="submit" className="text-xs text-green-600 hover:underline">Salvar</button>
        <button type="button" onClick={onCancelar} className="text-xs text-gray-400 hover:underline">
          Cancelar
        </button>
      </div>
    </form>
  );
}