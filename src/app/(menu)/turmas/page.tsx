import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { db } from '@/core/infrastructure/database';
import { turmas } from '@/core/infrastructure/database/schemas/turmas';
import { disciplinas } from '@/core/infrastructure/database/schemas/disciplinas';
import { eq } from 'drizzle-orm';
import TurmaForm from '@/components/features/turmas/TurmaForm';
import TurmaTable from '@/components/features/turmas/TurmaTable';

export default async function TurmasPage() {
  const usuario = await getSession();
  if (!usuario) redirect('/');

  const listaTurmas = await db.select().from(turmas)
    .where(eq(turmas.institutionId, usuario.institutionId));

  const listaDisciplinas = await db.select().from(disciplinas)
    .where(eq(disciplinas.institutionId, usuario.institutionId));

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-medium text-[#003B6F]">Turmas</h1>
      </div>

      <TurmaForm institutionId={usuario.institutionId} disciplinas={listaDisciplinas} />
      <TurmaTable turmas={listaTurmas} />
    </div>
  );
}