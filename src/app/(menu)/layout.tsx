import Link from 'next/link';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { logout } from '@/actions/auth';

export default async function MenuLayout({ children }: { children: React.ReactNode }) {
  const usuario = await getSession();
  if (!usuario) redirect('/');

  const isAdmin = usuario.role === 'admin';
  const isDiretoria = usuario.role === 'diretoria';
  const isProfessor = usuario.role === 'professor';
  const isAluno = usuario.role === 'aluno';
  const isGestao = isAdmin || isDiretoria;

  return (
    <div className="flex min-h-screen">
      <aside className="w-52 bg-[#003B6F] flex flex-col shrink-0">
        <div className="px-4 py-5 border-b border-white/10">
          <p className="text-white font-medium text-sm">Omniscola</p>
          <p className="text-white/40 text-xs mt-0.5">Gestão Escolar</p>
        </div>

        <nav className="flex-1 px-2 py-3 overflow-y-auto">
          <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
            Dashboard
          </Link>

          {!isAluno && (
            <>
              <p className="text-white/30 text-[10px] uppercase tracking-wider px-2 pt-3 pb-1">Cadastro</p>
              {isGestao && (
                <>
                  <Link href="/cadastro/alunos" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
                    Alunos
                  </Link>
                  <Link href="/cadastro/cursos" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
                    Cursos
                  </Link>
                  <Link href="/cadastro/disciplinas" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
                    Disciplinas
                  </Link>
                </>
              )}

              <p className="text-white/30 text-[10px] uppercase tracking-wider px-2 pt-3 pb-1">Gestão Educacional</p>
              {isGestao && (
                <>
                  <Link href="/gestao/turmas" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
                    Turmas
                  </Link>
                  <Link href="/gestao/matriculas" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
                    Matrículas
                  </Link>
                  <Link href="/gestao/secretaria" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
                    Secretaria
                  </Link>
                </>
              )}

              {(isProfessor || isAdmin) && (
                <>
                  <p className="text-white/30 text-[10px] uppercase tracking-wider px-2 pt-3 pb-1">Operação</p>
                  <Link href="/presencas" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
                    Presenças
                  </Link>
                  <Link href="/notas" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
                    Notas
                  </Link>
                </>
              )}
            </>
          )}

          {isAluno && (
            <>
              <p className="text-white/30 text-[10px] uppercase tracking-wider px-2 pt-3 pb-1">Meu Portal</p>
              <Link href="/portal/turmas" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
                Minhas Turmas
              </Link>
              <Link href="/portal/documentos" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
                Documentos
              </Link>
            </>
          )}

          {isAdmin && (
            <>
              <p className="text-white/30 text-[10px] uppercase tracking-wider px-2 pt-3 pb-1">Administração</p>
              <Link href="/admin" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
                Usuários
              </Link>
            </>
          )}
        </nav>

        <div className="px-4 py-3 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-xs truncate max-w-[120px]">{usuario.nome}</p>
              <p className="text-white/30 text-xs capitalize">{usuario.role}</p>
            </div>
            <form action={logout}>
              <button type="submit" className="text-white/30 hover:text-white/70 text-xs transition-colors">
                Sair
              </button>
            </form>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-[#F5F6FA] min-h-screen overflow-auto px-2">
        {children}
      </main>
    </div>
  );
}