import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { db } from '@/core/infrastructure/database';
import { turmas } from '@/core/infrastructure/database/schemas/turmas';
import { disciplinas } from '@/core/infrastructure/database/schemas/disciplinas';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

export default async function TurmaDetalhesPage({ params }: { params: Promise<{ id: string }> }) {
  const usuario = await getSession();
  if (!usuario) redirect('/');

  const { id } = await params;

  const resultado = await db.select().from(turmas).where(eq(turmas.id, id)).limit(1);
  const turma = resultado[0];
  if (!turma) redirect('/gestao/turmas');

  const disciplina = turma.disciplinaId
    ? (await db.select().from(disciplinas).where(eq(disciplinas.id, turma.disciplinaId)).limit(1))[0]
    : null;

  const campos = [
    { label: 'Unidade Operativa', valor: usuario.institutionId },
    { label: 'Localidade', valor: turma.localidade ?? '—' },
    { label: 'Estado da Turma', valor: turma.status === 'ativa' ? 'Em Processo' : 'Encerrada' },
    { label: 'Sigla da Turma', valor: turma.sigla ?? turma.codigo },
    { label: 'Data de Início', valor: turma.dataInicio ?? '—' },
    { label: 'Data de Término', valor: turma.dataTermino ?? '—' },
    { label: 'Horário', valor: turma.horario ?? '—' },
    { label: 'Frequência', valor: '—' },
  ];

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Link href="/gestao/turmas" className="text-xs text-gray-400 hover:text-[#E8601C] transition-colors">
          ← Turmas
        </Link>
      </div>

      <div className="bg-white border border-black/[.06] rounded-xl p-5">
        <div className="mb-4">
          <h1 className="text-sm font-medium text-[#003B6F] leading-relaxed">
            Turma {turma.periodo} · {turma.codigo} — {turma.nome}
            {disciplina ? ` — ${disciplina.nome}` : ''}
          </h1>
          <div className="flex gap-2 mt-2">
            {turma.cargaHoraria && (
              <span className="text-xs bg-[#E6EEF5] text-[#003B6F] px-2 py-0.5 rounded-full">
                {turma.cargaHoraria}h
              </span>
            )}
            {turma.modalidade && (
              <span className="text-xs bg-[#E6EEF5] text-[#003B6F] px-2 py-0.5 rounded-full">
                {turma.modalidade}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-8 gap-y-4 border-t border-black/[.05] pt-4">
          {campos.map((c) => (
            <div key={c.label}>
              <p className="text-xs text-gray-400 mb-0.5">{c.label}</p>
              <p className="text-sm text-[#003B6F] font-medium">{c.valor}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}