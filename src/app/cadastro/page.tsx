'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { register } from '@/actions/auth';

export default function CadastroPage() {
  const [state, action, pending] = useActionState(register, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F6FA]">
      <div className="bg-white border border-black/[.08] rounded-xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#003B6F]">Criar conta</h1>
          <p className="text-sm text-gray-400 mt-1">Omniscola · Senac</p>
        </div>

        <form action={action} className="flex flex-col gap-4">
          {state?.erro && (
            <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg">
              {state.erro}
            </div>
          )}

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Nome completo</label>
            <input
              name="nome"
              type="text"
              placeholder="Prof. Arthur Pereira"
              className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Email institucional</label>
            <input
              name="email"
              type="email"
              placeholder="professor@senac.br"
              className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Senha</label>
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
              <option value="professor">Professor</option>
              <option value="diretoria">Diretoria</option>
              <option value="aluno">Aluno</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-[#E8601C] hover:bg-[#cf5418] disabled:opacity-60 text-white rounded-lg py-2.5 text-sm font-medium transition-colors mt-2"
          >
            {pending ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Ja tem conta?{' '}
          <Link href="/" className="text-[#E8601C] hover:underline">Entrar</Link>
        </p>
      </div>
    </div>
  );
}