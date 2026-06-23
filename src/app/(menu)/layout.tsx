import Link from 'next/link';

const navItems = [
  { label: 'Dashboard', href: '/(menu)', icon: '⊞' },
  { label: 'Turmas', href: '/(menu)/turmas', icon: '◫' },
  { label: 'Alunos', href: '/(menu)/alunos', icon: '◉' },
  { label: 'Presenças', href: '/(menu)/presencas', icon: '☑' },
  { label: 'Notas', href: '/(menu)/notas', icon: '☰' },
  { label: 'Disciplinas', href: '/(menu)/disciplinas', icon: '📖' },
];

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-52 bg-[#003B6F] flex flex-col shrink-0">
        <div className="px-4 py-5 border-b border-white/10">
          <p className="text-white font-medium text-sm">Omniscola</p>
          <p className="text-white/40 text-xs mt-0.5">Gestão Escolar</p>
        </div>

        <nav className="flex-1 px-2 py-3">
          <p className="text-white/30 text-[10px] uppercase tracking-wider px-2 pb-1">Visão geral</p>
          <Link href="/dashboard" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
            Dashboard
          </Link>

          <p className="text-white/30 text-[10px] uppercase tracking-wider px-2 pt-3 pb-1">Minha turma</p>
          {navItems.slice(1, 5).map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
              {item.label}
            </Link>
          ))}

          <p className="text-white/30 text-[10px] uppercase tracking-wider px-2 pt-3 pb-1">Conteúdo</p>
          <Link href="/disciplinas" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors mb-0.5">
            Disciplinas
          </Link>
        </nav>

        <div className="px-4 py-3 border-t border-white/10">
          <p className="text-white/70 text-xs">Prof. Arthur</p>
          <p className="text-white/30 text-xs">Professor</p>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-h-screen">
        {children}
      </main>
    </div>
  );
}