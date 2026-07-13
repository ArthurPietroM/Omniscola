import Link from 'next/link';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { logout } from '@/actions/auth';

export default async function MenuLayout({ children }: { children: React.ReactNode }) {
  const usuario = await getSession();
  if (!usuario) redirect('/');

  const isAdmin = usuario.role === 'admin';
  const isProfessor = usuario.role === 'professor';
  const isDiretoria = usuario.role === 'diretoria';

  return (
    <div className="flex min-h-screen">
      <aside className="w-52 bg-[#003B6F] flex flex-col shrink-0">
        <div className="px-4 py-5 border-b border-white/10">
          <p className="text-white font-medium text-sm">Omniscola</p>
          <p className="text-white/40 text-xs mt-0.5">Gestão Escolar</p>
        </div>

        <nav className="flex-1 px-2 py-3 overflow-y-auto">
          <p className="text-white/30 text-[10px] uppercase tracking-wider px-2 pb-1">Visão geral</p>
          <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
            Dashboard
          </Link>

          {(isAdmin || isProfessor || isDiretoria) && (
            <>
              <p className="text-white/30 text-[10px] uppercase tracking-wider px-2 pt-3 pb-1">Gestão</p>
              <Link href="/turmas" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
                Turmas
              </Link>
              <Link href="/alunos" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
                Alunos
              </Link>
            </>
          )}

          {(isAdmin || isProfessor) && (
            <>
              <p className="text-white/30 text-[10px] uppercase tracking-wider px-2 pt-3 pb-1">Minha turma</p>
              <Link href="/presencas" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
                Presenças
              </Link>
              <Link href="/notas" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
                Notas
              </Link>
              <Link href="/disciplinas" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
                Disciplinas
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

      <main className="flex-1 flex flex-col bg-[#F5F6FA] min-h-screen overflow-auto">
        {children}
      </main>
    </div>
  );
}