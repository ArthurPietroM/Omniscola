'use client';

import { useActionState, useRef, useEffect } from 'react';
import { criarAlunoAction } from '@/actions/alunos';

export default function AlunoForm({ institutionId }: { institutionId: string }) {
  const [state, action, pending] = useActionState(criarAlunoAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.sucesso) formRef.current?.reset();
  }, [state]);

  return (
    <div className="bg-white border border-black/[.06] rounded-xl p-4">
      <h2 className="text-sm font-medium text-[#003B6F] mb-3">Novo aluno</h2>

      {state?.erro && <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mb-3">{state.erro}</div>}
      {state?.sucesso && <div className="bg-green-50 text-green-700 text-sm px-3 py-2 rounded-lg mb-3">Aluno cadastrado com sucesso!</div>}

      <form ref={formRef} action={action} className="grid grid-cols-4 gap-3">
        <input type="hidden" name="institutionId" value={institutionId} />
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Nome completo</label>
          <input name="nome" type="text" placeholder="Ana Lima" className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C] transition-colors" />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Email</label>
          <input name="email" type="email" placeholder="ana@email.com" className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C] transition-colors" />
        </div>
        <div>
          <label className="text-xs text-gray-500 mb-1 block">Matrícula</label>
          <input name="matricula" type="text" placeholder="2025001" className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C] transition-colors" />
        </div>
        <div className="flex items-end">
          <button type="submit" disabled={pending} className="w-full bg-[#E8601C] hover:bg-[#cf5418] disabled:opacity-60 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
            {pending ? 'Cadastrando...' : '+ Cadastrar'}
          </button>
        </div>
      </form>
    </div>
  );
}