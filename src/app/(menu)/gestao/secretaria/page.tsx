import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { db } from '@/core/infrastructure/database';
import { alunos } from '@/core/infrastructure/database/schemas/alunos';
import { matriculas } from '@/core/infrastructure/database/schemas/matriculas';
import { cursos } from '@/core/infrastructure/database/schemas/cursos';
import { alunoTurmas } from '@/core/infrastructure/database/schemas/alunoTurmas';
import { turmas } from '@/core/infrastructure/database/schemas/turmas';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

export default async function SecretariaPage() {
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
      <h1 className="text-base font-medium text-[#003B6F]">Secretaria</h1>

      <div className="grid grid-cols-2 gap-4">
        {/* Gestão do Aluno */}
        <div className="bg-white border border-black/[.06] rounded-xl p-4">
          <h2 className="text-sm font-medium text-[#003B6F] mb-3">Gestão do Aluno</h2>
          <div className="flex text-xs text-gray-400 pb-2 border-b border-black/[.05]">
            <span className="flex-[2]">Nome</span>
            <span className="flex-1">Matrícula</span>
            <span className="flex-1 text-right">Ações</span>
          </div>
          {listaAlunos.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">Nenhum aluno cadastrado.</p>
          ) : (
            listaAlunos.map((a) => (
              <div key={a.id} className="flex items-center py-2.5 border-b border-black/[.04] last:border-none">
                <div className="flex-[2]">
                  <p className="text-xs font-medium text-[#003B6F]">{a.nome}</p>
                  <p className="text-xs text-gray-400">{a.email}</p>
                </div>
                <span className="flex-1 text-xs font-mono text-gray-600">{a.matricula}</span>
                <span className="flex-1 flex justify-end">
                  <Link href={`/gestao/secretaria/${a.id}`} className="text-xs text-[#E8601C] hover:underline">
                    Detalhes
                  </Link>
                </span>
              </div>
            ))
          )}
        </div>

        {/* Requerimentos */}
        <div className="bg-white border border-black/[.06] rounded-xl p-4">
          <h2 className="text-sm font-medium text-[#003B6F] mb-3">Requerimentos</h2>
          <p className="text-xs text-gray-400 mb-4">Selecione um aluno na lista ao lado para gerar documentos.</p>
          <div className="flex flex-col gap-2">
            {[
              { nome: 'Declaração de Frequência', desc: 'Frequência por turma e período' },
              { nome: 'Declaração de Matrícula', desc: 'Comprovante de vínculo institucional' },
              { nome: 'Boletim Parcial', desc: 'Notas e médias por disciplina' },
              { nome: 'Histórico Escolar', desc: 'Registro completo do aluno' },
            ].map((doc) => (
              <div key={doc.nome} className="flex items-center justify-between p-3 border border-black/[.06] rounded-lg">
                <div>
                  <p className="text-xs font-medium text-[#003B6F]">{doc.nome}</p>
                  <p className="text-xs text-gray-400">{doc.desc}</p>
                </div>
                <button disabled className="text-xs text-gray-300 border border-gray-200 rounded-lg px-3 py-1">
                  PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}