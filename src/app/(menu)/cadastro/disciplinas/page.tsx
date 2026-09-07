import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { db } from '@/core/infrastructure/database';
import { disciplinas } from '@/core/infrastructure/database/schemas/disciplinas';
import { eq } from 'drizzle-orm';
import DisciplinaForm from '@/components/features/disciplinas/DisciplinaForm';
import DisciplinaTable from '@/components/features/disciplinas/DisciplinaTable';

export default async function DisciplinasPage() {
  const usuario = await getSession();
  if (!usuario) redirect('/');
  if (usuario.role === 'aluno') redirect('/dashboard');

  const lista = await db.select().from(disciplinas)
    .where(eq(disciplinas.institutionId, usuario.institutionId));

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-base font-medium text-[#003B6F]">Disciplinas</h1>
      <DisciplinaForm institutionId={usuario.institutionId} />
      <DisciplinaTable disciplinas={lista} />
    </div>
  );
}