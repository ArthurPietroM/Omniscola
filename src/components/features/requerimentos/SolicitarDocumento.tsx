'use client';

import { useActionState } from 'react';
import { solicitarRequerimentoAction } from '@/actions/requerimentos';

const DOCUMENTOS = [
  { tipo: 'declaracao_matricula',   nome: 'Declaração de Matrícula',   desc: 'Comprovante de vínculo institucional' },
  { tipo: 'declaracao_frequencia',  nome: 'Declaração de Frequência',  desc: 'Frequência por turma e período' },
  { tipo: 'boletim_parcial',        nome: 'Boletim Parcial',           desc: 'Notas e médias por disciplina' },
  { tipo: 'historico_escolar',      nome: 'Histórico Escolar',         desc: 'Registro completo do aluno' },
  { tipo: 'declaracao_nada_consta', nome: 'Declaração de Nada Consta', desc: 'Ausência de pendências' },
  { tipo: 'ementario',              nome: 'Ementário Escolar',         desc: 'Conteúdo programático das disciplinas' },
];

export default function SolicitarDocumento() {
  const [state, action, pending] = useActionState(solicitarRequerimentoAction, null);

  return (
    <div className="bg-white border border-black/[.06] rounded-xl p-4">
      <h2 className="text-sm font-medium text-[#003B6F] mb-1">Solicitar documento</h2>
      <p className="text-xs text-gray-400 mb-4">Selecione o documento que deseja e clique em solicitar.</p>

      {state?.erro && (
        <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mb-3">{state.erro}</div>
      )}
      {state?.sucesso && (
        <div className="bg-green-50 text-green-700 text-sm px-3 py-2 rounded-lg mb-3">
          Requerimento registrado com sucesso!
        </div>
      )}

      <div className="flex flex-col gap-2">
        {DOCUMENTOS.map((doc) => (
          <form key={doc.tipo} action={action} className="flex items-center justify-between p-3 border border-black/[.06] rounded-lg hover:border-[#003B6F]/20 transition-colors">
            <input type="hidden" name="tipo" value={doc.tipo} />
            <div>
              <p className="text-xs font-medium text-[#003B6F]">{doc.nome}</p>
              <p className="text-xs text-gray-400">{doc.desc}</p>
            </div>
            <button
              type="submit"
              disabled={pending}
              className="text-xs bg-[#E8601C] hover:bg-[#cf5418] disabled:opacity-60 text-white rounded-lg px-3 py-1.5 transition-colors shrink-0 ml-4"
            >
              Solicitar
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}