// src/app/dashboard/layout.tsx
import Link from 'next/link';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { logout } from '@/actions/auth';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Turmas', href: '/turmas' },
  { label: 'Alunos', href: '/alunos' },
  { label: 'Presenças', href: '/presencas' },
  { label: 'Notas', href: '/notas' },
  { label: 'Disciplinas', href: '/disciplinas' },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const usuario = await getSession();
  if (!usuario) redirect('/');

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-52 bg-[#003B6F] flex flex-col shrink-0 fixed top-0 left-0 h-screen">
        <div className="px-4 py-5 border-b border-white/10">
          <p className="text-white font-medium text-sm">Omniscola</p>
          <p className="text-white/40 text-xs mt-0.5">Gestão Escolar</p>
        </div>

        <nav className="flex-1 px-2 py-3 overflow-y-auto">
          <p className="text-white/30 text-[10px] uppercase tracking-wider px-2 pb-1">
            Visão geral
          </p>
          <Link
            href="/dashboard"
            className="flex items-center px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5"
          >
            Dashboard
          </Link>

          <p className="text-white/30 text-[10px] uppercase tracking-wider px-2 pt-3 pb-1">
            Minha turma
          </p>
          {navItems.slice(1, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5"
            >
              {item.label}
            </Link>
          ))}

          <p className="text-white/30 text-[10px] uppercase tracking-wider px-2 pt-3 pb-1">
            Conteúdo
          </p>
          <Link
            href="/disciplinas"
            className="flex items-center px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5"
          >
            Disciplinas
          </Link>
          <div className="px-4 py-3 border-t border-white/10">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-white/70 text-xs">{usuario.nome}</p>
      <p className="text-white/30 text-xs capitalize">{usuario.role}</p>
    </div>
    <form action={logout}>
      <button type="submit" className="text-white/30 hover:text-white/70 text-xs transition-colors">
        Sair
      </button>
    </form>
  </div>
</div>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col ml-52">
        {/* Topbar */}
        {/* Topbar */}
<header className="bg-white border-b border-black/[.06] px-6 py-3 flex items-center justify-end sticky top-0 z-40">
</header>

        {/* Page content */}
        <main className="flex-1 bg-[#F5F6FA]">
          {children}
        </main>
      </div>
    </div>
  );
}