'use client';

import { useActionState, useRef, useEffect } from 'react';
import { criarCursoAction } from '@/actions/cursos';

export default function CursoForm({ institutionId }: { institutionId: string }) {
  const [state, action, pending] = useActionState(criarCursoAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.sucesso) formRef.current?.reset();
  }, [state]);

  return (
    <div className="bg-white border border-black/[.06] rounded-xl p-4">
      <h2 className="text-sm font-medium text-[#003B6F] mb-1">Novo curso</h2>
      <p className="text-xs text-gray-400 mb-3">O código numérico é usado na geração automática de matrículas.</p>

      {state?.erro && <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mb-3">{state.erro}</div>}
      {state?.sucesso && <div className="bg-green-50 text-green-700 text-sm px-3 py-2 rounded-lg mb-3">Curso criado com sucesso!</div>}

      <form ref={formRef} action={action} className="grid grid-cols-4 gap-3">
        <input type="hidden" name="institutionId" value={institutionId} />

        <div className="col-span-2">
          <label className="text-xs text-gray-500 mb-1 block">Nome do curso</label>
          <input name="nome" type="text" placeholder="Análise e Desenvolvimento de Sistemas"
            className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C] transition-colors" />
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1 block">Sigla</label>
          <input name="codigo" type="text" placeholder="ADS"
            className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C] transition-colors" />
        </div>

        <div>
          <label className="text-xs text-gray-500 mb-1 block">Código numérico</label>
          <input name="codigoNumerico" type="text" placeholder="01"
            className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C] transition-colors" />
        </div>

        <div className="col-span-4">
          <label className="text-xs text-gray-500 mb-1 block">Descrição (opcional)</label>
          <input name="descricao" type="text" placeholder="Descrição do curso"
            className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C] transition-colors" />
        </div>

        <div className="col-span-4">
          <button type="submit" disabled={pending}
            className="bg-[#E8601C] hover:bg-[#cf5418] disabled:opacity-60 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
            {pending ? 'Criando...' : '+ Criar curso'}
          </button>
        </div>
      </form>
    </div>
  );
}