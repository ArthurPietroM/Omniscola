import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { db } from '@/core/infrastructure/database';
import { cursos } from '@/core/infrastructure/database/schemas/cursos';
import { eq } from 'drizzle-orm';
import CursoForm from '@/components/features/cursos/CursoForm';
import CursoTable from '@/components/features/cursos/CursoTable';

export default async function CursosPage() {
  const usuario = await getSession();
  if (!usuario) redirect('/');
  if (!['admin', 'diretoria'].includes(usuario.role)) redirect('/dashboard');

  const lista = await db.select().from(cursos)
    .where(eq(cursos.institutionId, usuario.institutionId));

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-base font-medium text-[#003B6F]">Cursos</h1>
      <CursoForm institutionId={usuario.institutionId} />
      <CursoTable cursos={lista} />
    </div>
  );
}