'use client';

import { useActionState } from 'react';
import { login } from '@/actions/auth';

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, null);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-sky-50/50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-8 transition-all">
        
        {/* Cabeçalho do Card */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <span className="w-2.5 h-7 bg-[#E8601C] rounded-full" />
            <h1 className="text-3xl font-extrabold text-[#003B6F] tracking-tight">
              Omniscola
            </h1>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Gestão Escolar · Senac
          </p>
        </div>

        {/* Formulário */}
        <form action={action} className="flex flex-col gap-5">
          {state?.erro && (
            <div className="bg-red-50/80 border border-red-200 text-red-600 text-xs font-medium px-4 py-3 rounded-xl flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              {state.erro}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              E-mail institucional
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="professor@senac.br"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-slate-50/30 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#E8601C] focus:ring-4 focus:ring-[#E8601C]/10 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                Senha
              </label>
            </div>
            <input
              name="senha"
              type="password"
              required
              placeholder="••••••••"
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 bg-slate-50/30 placeholder:text-slate-400 outline-none focus:bg-white focus:border-[#E8601C] focus:ring-4 focus:ring-[#E8601C]/10 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-[#E8601C] hover:bg-[#cf5418] active:scale-[0.98] disabled:opacity-60 text-white rounded-xl py-3 text-sm font-semibold shadow-lg shadow-[#E8601C]/25 transition-all cursor-pointer mt-2"
          >
            {pending ? 'Entrando...' : 'Acessar Conta'}
          </button>
        </form>

        {/* Rodapé do Card */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400">
            Sistema Integrado Fecomércio · Sesc · Senac
          </p>
        </div>

      </div>
    </div>
  );
}