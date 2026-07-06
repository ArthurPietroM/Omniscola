import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { db } from '@/core/infrastructure/database';
import { turmas } from '@/core/infrastructure/database/schemas/turmas';
import { alunos } from '@/core/infrastructure/database/schemas/alunos';
import { presencas } from '@/core/infrastructure/database/schemas/presencas';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

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
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-medium text-[#003B6F]">Olá, {usuario.nome.split(' ')[0]} 👋</h1>
          <p className="text-xs text-gray-400 mt-0.5 capitalize">{usuario.role}</p>
        </div>
        {periodo && (
          <span className="text-xs bg-[#FDF0E8] text-[#E8601C] px-3 py-1 rounded-full">{periodo}</span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#E6EEF5] rounded-lg p-4">
          <p className="text-2xl font-medium text-[#003B6F]">{turmasAtivas.length}</p>
          <p className="text-xs mt-1 text-[#5a7a9a]">Turmas ativas</p>
        </div>
        <div className="bg-[#E6EEF5] rounded-lg p-4">
          <p className="text-2xl font-medium text-[#003B6F]">{todosAlunos.length}</p>
          <p className="text-xs mt-1 text-[#5a7a9a]">Alunos</p>
        </div>
        <div className="bg-[#FDF0E8] rounded-lg p-4">
          <p className="text-2xl font-medium text-[#E8601C]">{totalPresencas > 0 ? `${frequencia}%` : '—'}</p>
          <p className="text-xs mt-1 text-[#a04010]">Frequência média</p>
        </div>
      </div>

      <div className="bg-white border border-black/[.06] rounded-xl p-4">
        <h2 className="text-sm font-medium text-[#003B6F] mb-3">Turmas da instituição</h2>
        {todasTurmas.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            Nenhuma turma cadastrada.{' '}
            <Link href="/turmas" className="text-[#E8601C] hover:underline">Criar turma</Link>
          </div>
        ) : (
          <>
            <div className="flex text-xs text-gray-400 pb-2 border-b border-black/[.05]">
              <span className="flex-[2]">Turma</span>
              <span className="flex-1">Período</span>
              <span className="flex-1">Status</span>
            </div>
            {todasTurmas.map((t) => (
              <div key={t.id} className="flex items-center py-2.5 border-b border-black/[.04] last:border-none">
                <span className="flex-[2] font-medium text-[#003B6F] text-xs">{t.nome} · {t.codigo}</span>
                <span className="flex-1 text-xs text-gray-400">{t.periodo}</span>
                <span className="flex-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${t.status === 'ativa' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {t.status === 'ativa' ? 'Ativa' : 'Encerrada'}
                  </span>
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}