import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { db } from '@/core/infrastructure/database';
import { turmas } from '@/core/infrastructure/database/schemas/turmas';
import { alunos } from '@/core/infrastructure/database/schemas/alunos';
import { presencas } from '@/core/infrastructure/database/schemas/presencas';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { Users, GraduationCap, TrendingUp, Folder, Plus } from 'lucide-react';

export default async function DashboardPage() {
  const usuario = await getSession();
  if (!usuario) redirect('/');

  const todasTurmas = await db.select().from(turmas)
    .where(eq(turmas.institutionId, usuario.institutionId));
  const turmasAtivas = todasTurmas.filter(t => t.status === 'ativa');
  const todosAlunos = await db.select().from(alunos)
    .where(eq(alunos.institutionId, usuario.institutionId));
  const todasPresencas = await db.select().from(presencas);
  const totalPresencas = todasPresencas.length;
  const presentes = todasPresencas.filter(p => p.status === 'presente').length;
  const frequencia = totalPresencas > 0 ? Math.round((presentes / totalPresencas) * 100) : 0;
  const periodo = turmasAtivas[0]?.periodo ?? null;

  return (
    <div className="flex flex-col gap-8">
      
      {/* 1. Header com Boas-Vindas */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#003B6F] tracking-tight">
            Olá, {usuario.nome.split(' ')[0]} 👋
          </h1>
          <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
            Painel do {usuario.role}
          </p>
        </div>

        {periodo && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400">Período Letivo:</span>
            <span className="text-xs font-bold bg-[#E8601C]/10 text-[#E8601C] border border-[#E8601C]/20 px-3.5 py-1.5 rounded-full">
              {periodo}
            </span>
          </div>
        )}
      </div>

      {/* 2. Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Card: Turmas Ativas */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Turmas Ativas
              </p>
              <p className="text-3xl font-extrabold text-[#003B6F] mt-2">
                {turmasAtivas.length}
              </p>
            </div>
            <div className="p-3 bg-sky-50 text-[#003B6F] rounded-xl">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-emerald-600 font-semibold">
            ● {turmasAtivas.length} turmas em andamento
          </div>
        </div>

        {/* Card: Total de Alunos */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total de Alunos
              </p>
              <p className="text-3xl font-extrabold text-[#003B6F] mt-2">
                {todosAlunos.length}
              </p>
            </div>
            <div className="p-3 bg-sky-50 text-[#003B6F] rounded-xl">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
            Matriculados na instituição
          </div>
        </div>

        {/* Card: Frequência Média */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Frequência Média
              </p>
              <p className="text-3xl font-extrabold text-[#E8601C] mt-2">
                {totalPresencas > 0 ? `${frequencia}%` : '—'}
              </p>
            </div>
            <div className="p-3 bg-orange-50 text-[#E8601C] rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 font-medium">
            Baseado no registro de chamadas
          </div>
        </div>

      </div>

      {/* 3. Tabela de Turmas da Instituição */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        
        {/* Cabeçalho da Tabela com Botão + Nova Turma */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#003B6F]">
              Turmas da Instituição
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Acompanhamento geral de turmas cadastradas
            </p>
          </div>

          <Link
            href="/turmas"
            className="inline-flex items-center gap-2 bg-[#E8601C] hover:bg-[#cf5418] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-[#E8601C]/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Criar Turma</span>
          </Link>
        </div>

        {/* Lista de Turmas */}
        {todasTurmas.length === 0 ? (
          <div className="text-center py-12 px-4">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Folder className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-slate-600">Nenhuma turma cadastrada.</p>
            <Link 
              href="/turmas" 
              className="inline-block mt-3 text-xs font-semibold text-[#E8601C] hover:underline"
            >
              + Criar primeira turma
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Turma / Código</th>
                  <th className="py-3.5 px-6">Período</th>
                  <th className="py-3.5 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {todasTurmas.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 font-semibold text-[#003B6F]">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
                          <Folder className="w-4 h-4" />
                        </div>
                        <div>
                          <span>{t.nome}</span>
                          <span className="text-slate-400 font-normal ml-2">· {t.codigo}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-slate-500 font-medium">
                      {t.periodo}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold ${
                          t.status === 'ativa'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            t.status === 'ativa' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                          }`}
                        />
                        {t.status === 'ativa' ? 'Ativa' : 'Encerrada'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}