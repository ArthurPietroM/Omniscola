import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { db } from '@/core/infrastructure/database';
import { turmas } from '@/core/infrastructure/database/schemas/turmas';
import { aulas } from '@/core/infrastructure/database/schemas/aulas';
import { presencas } from '@/core/infrastructure/database/schemas/presencas';
import { alunos } from '@/core/infrastructure/database/schemas/alunos';
import { alunoTurmas } from '@/core/infrastructure/database/schemas/alunoTurmas';
import { eq } from 'drizzle-orm';
import PresencaPanel from '@/components/features/presencas/PresencaPanel';

export default async function PresencasPage() {
  const usuario = await getSession();
  if (!usuario) redirect('/');
  if (usuario.role === 'aluno') redirect('/dashboard');

  const listaTurmas = await db.select().from(turmas)
    .where(eq(turmas.institutionId, usuario.institutionId));

  const listaAulas = await db.select().from(aulas);
  const listaAlunos = await db.select().from(alunos)
    .where(eq(alunos.institutionId, usuario.institutionId));
  const listaPresencas = await db.select().from(presencas);
  const listaAlunoTurmas = await db.select().from(alunoTurmas);

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-base font-medium text-[#003B6F]">Presenças</h1>
      <PresencaPanel
        turmas={listaTurmas}
        aulas={listaAulas}
        alunos={listaAlunos}
        presencas={listaPresencas}
        alunoTurmas={listaAlunoTurmas}
        institutionId={usuario.institutionId}
      />
    </div>
  );
}