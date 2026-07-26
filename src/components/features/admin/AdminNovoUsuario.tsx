'use client';

import { useActionState, useRef, useEffect, useState } from 'react';
import { criarUsuarioAction } from '@/actions/admin';

const ROLES = [
  { value: 'professor',  label: 'Professor' },
  { value: 'diretoria',  label: 'Diretoria' },
  { value: 'aluno',      label: 'Aluno' },
  { value: 'admin',      label: 'Administrador' },
];

export default function AdminNovoUsuario({ institutionId }: { institutionId: string }) {
  const [aberto, setAberto] = useState(false);
  const [state, action, pending] = useActionState(criarUsuarioAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state?.sucesso) return;

    formRef.current?.reset();
    const timeout = window.setTimeout(() => setAberto(false), 0);

    return () => window.clearTimeout(timeout);
  }, [state]);

  return (
    <div className="bg-white border border-black/[.06] rounded-xl overflow-hidden">
      <button
        onClick={() => setAberto(!aberto)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[#003B6F] hover:bg-gray-50 transition-colors"
      >
        <span>+ Novo usuário</span>
        <span className="text-gray-400 text-xs">{aberto ? 'Fechar ▲' : 'Abrir ▼'}</span>
      </button>

      {aberto && (
        <div className="border-t border-black/[.05] p-4">
          {state?.erro && (
            <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mb-3">
              {state.erro}
            </div>
          )}

          <form ref={formRef} action={action} className="grid grid-cols-2 gap-3">
            <input type="hidden" name="institutionId" value={institutionId} />

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Nome completo</label>
              <input
                name="nome"
                type="text"
                placeholder="João Silva"
                className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Email</label>
              <input
                name="email"
                type="email"
                placeholder="joao@senac.br"
                className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Senha inicial</label>
              <input
                name="senha"
                type="password"
                placeholder="Minimo 6 caracteres"
                className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Perfil</label>
              <select
                name="role"
                className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C] transition-colors"
              >
                {ROLES.map(r => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2 flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setAberto(false)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={pending}
                className="bg-[#E8601C] hover:bg-[#cf5418] disabled:opacity-60 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              >
                {pending ? 'Criando...' : 'Criar usuário'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}