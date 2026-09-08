import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { db } from '@/core/infrastructure/database';
import { alunos } from '@/core/infrastructure/database/schemas/alunos';
import { matriculas } from '@/core/infrastructure/database/schemas/matriculas';
import { cursos } from '@/core/infrastructure/database/schemas/cursos';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

export default async function SecretariaAlunosPage() {
  const usuario = await getSession();
  if (!usuario) redirect('/');
  if (!['admin', 'diretoria'].includes(usuario.role)) redirect('/dashboard');

  const listaAlunos = await db
    .select({
      id: alunos.id,
      nome: alunos.nome,
      email: alunos.email,
      matricula: alunos.matricula,
    })
    .from(alunos)
    .where(eq(alunos.institutionId, usuario.institutionId));

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Link href="/gestao/secretaria" className="text-xs text-gray-400 hover:text-[#E8601C] transition-colors">← Secretaria</Link>
        <h1 className="text-base font-medium text-[#003B6F]">Gestão do Aluno</h1>
      </div>

      <div className="bg-white border border-black/[.06] rounded-xl p-4">
        <div className="flex text-xs text-gray-400 pb-2 border-b border-black/[.05]">
          <span className="flex-[2]">Nome</span>
          <span className="flex-[2]">Email</span>
          <span className="flex-1">Matrícula</span>
          <span className="flex-1 text-right">Ações</span>
        </div>

        {listaAlunos.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">Nenhum aluno cadastrado.</p>
        ) : (
          listaAlunos.map((a) => (
            <div key={a.id} className="flex items-center py-2.5 border-b border-black/[.04] last:border-none">
              <span className="flex-[2] text-xs font-medium text-[#003B6F]">{a.nome}</span>
              <span className="flex-[2] text-xs text-gray-400">{a.email}</span>
              <span className="flex-1 text-xs font-mono text-gray-600">{a.matricula}</span>
              <span className="flex-1 flex justify-end">
                <Link href={`/gestao/secretaria/alunos/${a.id}`} className="text-xs text-[#E8601C] hover:underline">
                  Detalhes
                </Link>
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}