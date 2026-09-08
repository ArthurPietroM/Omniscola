import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { db } from '@/core/infrastructure/database';
import { matriculas } from '@/core/infrastructure/database/schemas/matriculas';
import { alunos } from '@/core/infrastructure/database/schemas/alunos';
import { cursos } from '@/core/infrastructure/database/schemas/cursos';
import { eq } from 'drizzle-orm';

export default async function MatriculasPage() {
  const usuario = await getSession();
  if (!usuario) redirect('/');
  if (!['admin', 'diretoria'].includes(usuario.role)) redirect('/dashboard');

  const listaMatriculas = await db
    .select({
      id: matriculas.id,
      codigo: matriculas.codigo,
      periodo: matriculas.periodo,
      status: matriculas.status,
      alunoNome: alunos.nome,
      alunoEmail: alunos.email,
      cursoNome: cursos.nome,
      cursoCodigo: cursos.codigo,
    })
    .from(matriculas)
    .leftJoin(alunos, eq(matriculas.alunoId, alunos.id))
    .leftJoin(cursos, eq(matriculas.cursoId, cursos.id));

  const listaAlunos = await db.select().from(alunos)
    .where(eq(alunos.institutionId, usuario.institutionId));

  const listaCursos = await db.select().from(cursos)
    .where(eq(cursos.institutionId, usuario.institutionId));

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-base font-medium text-[#003B6F]">Matrículas</h1>

      {/* Formulário de nova matrícula */}
      <div className="bg-white border border-black/[.06] rounded-xl p-4">
        <h2 className="text-sm font-medium text-[#003B6F] mb-3">Nova matrícula</h2>
        <form className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Aluno</label>
            <select name="alunoId" className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C]">
              <option value="">Selecionar aluno</option>
              {listaAlunos.map(a => (
                <option key={a.id} value={a.id}>{a.nome}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Curso</label>
            <select name="cursoId" className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C]">
              <option value="">Selecionar curso</option>
              {listaCursos.map(c => (
                <option key={c.id} value={c.id}>{c.nome} ({c.codigo})</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full bg-[#E8601C] hover:bg-[#cf5418] text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors">
              + Matricular
            </button>
          </div>
        </form>
      </div>

      {/* Lista de matrículas */}
      <div className="bg-white border border-black/[.06] rounded-xl p-4">
        <h2 className="text-sm font-medium text-[#003B6F] mb-3">Matrículas ativas</h2>
        {listaMatriculas.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">Nenhuma matrícula registrada.</p>
        ) : (
          <>
            <div className="flex text-xs text-gray-400 pb-2 border-b border-black/[.05]">
              <span className="flex-[2]">Aluno</span>
              <span className="flex-[2]">Curso</span>
              <span className="flex-1">Código</span>
              <span className="flex-1">Período</span>
              <span className="flex-1">Status</span>
            </div>
            {listaMatriculas.map((m) => (
              <div key={m.id} className="flex items-center py-2.5 border-b border-black/[.04] last:border-none">
                <span className="flex-[2] text-xs font-medium text-[#003B6F]">{m.alunoNome}</span>
                <span className="flex-[2] text-xs text-gray-400">{m.cursoNome} · {m.cursoCodigo}</span>
                <span className="flex-1 text-xs font-mono text-gray-600">{m.codigo}</span>
                <span className="flex-1 text-xs text-gray-400">{m.periodo}</span>
                <span className="flex-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${m.status === 'ativa' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {m.status}
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