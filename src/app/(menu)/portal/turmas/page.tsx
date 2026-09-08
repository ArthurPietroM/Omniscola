import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { db } from '@/core/infrastructure/database';
import { alunoTurmas } from '@/core/infrastructure/database/schemas/alunoTurmas';
import { turmas } from '@/core/infrastructure/database/schemas/turmas';
import { alunos } from '@/core/infrastructure/database/schemas/alunos';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

export default async function PortalTurmasPage() {
  const usuario = await getSession();
  if (!usuario) redirect('/');
  if (usuario.role !== 'aluno') redirect('/dashboard');

  const aluno = await db.select().from(alunos)
    .where(eq(alunos.email, usuario.email)).limit(1);

  if (!aluno[0]) redirect('/dashboard');

  const minhasTurmas = await db
    .select({
      id: turmas.id,
      nome: turmas.nome,
      codigo: turmas.codigo,
      periodo: turmas.periodo,
      status: turmas.status,
      modalidade: turmas.modalidade,
      horario: turmas.horario,
    })
    .from(alunoTurmas)
    .leftJoin(turmas, eq(alunoTurmas.turmaId, turmas.id))
    .where(eq(alunoTurmas.alunoId, aluno[0].id));

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-base font-medium text-[#003B6F]">Minhas Turmas</h1>

      {minhasTurmas.length === 0 ? (
        <div className="bg-white border border-black/[.06] rounded-xl p-8 text-center text-gray-400 text-sm">
          Você ainda não está matriculado em nenhuma turma.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {minhasTurmas.map((t) => (
            <div key={t.id} className="bg-white border border-black/[.06] rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#003B6F]">{t.nome} · {t.codigo}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-xs text-gray-400">{t.periodo}</span>
                  {t.modalidade && <span className="text-xs text-gray-400">· {t.modalidade}</span>}
                  {t.horario && <span className="text-xs text-gray-400">· {t.horario}</span>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full ${t.status === 'ativa' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {t.status === 'ativa' ? 'Em Processo' : 'Encerrada'}
                </span>
                <Link href={`/portal/turmas/${t.id}`} className="text-xs text-[#E8601C] hover:underline">
                  Detalhes
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}