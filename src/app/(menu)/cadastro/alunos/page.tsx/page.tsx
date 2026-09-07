import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { db } from '@/core/infrastructure/database';
import { alunos } from '@/core/infrastructure/database/schemas/alunos';
import { turmas } from '@/core/infrastructure/database/schemas/turmas';
import { alunoTurmas } from '@/core/infrastructure/database/schemas/alunoTurmas';
import { eq } from 'drizzle-orm';
import AlunoForm from '@/components/features/alunos/AlunoForm';
import AlunoTable from '@/components/features/alunos/AlunoTable';

export default async function AlunosPage() {
  const usuario = await getSession();
  if (!usuario) redirect('/');
  if (usuario.role === 'aluno') redirect('/dashboard');

  const listaAlunos = await db.select().from(alunos)
    .where(eq(alunos.institutionId, usuario.institutionId));

  const listaTurmas = await db.select().from(turmas)
    .where(eq(turmas.institutionId, usuario.institutionId));

  const listaMatriculas = await db.select().from(alunoTurmas);

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-base font-medium text-[#003B6F]">Alunos</h1>
      <AlunoForm institutionId={usuario.institutionId} />
      <AlunoTable
        alunos={listaAlunos}
        turmas={listaTurmas}
        matriculas={listaMatriculas}
      />
    </div>
  );
}