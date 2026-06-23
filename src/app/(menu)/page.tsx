export default function DashboardPage() {
  return (
    <>
      <div className="bg-white border-b border-black/[.06] px-6 py-3 flex items-center justify-between">
        <h1 className="text-base font-medium text-[#003B6F]">Dashboard</h1>
        <span className="text-xs bg-[#FDF0E8] text-[#E8601C] px-3 py-1 rounded-full">2025.1</span>
      </div>

      <div className="p-6 flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Turmas ativas', valor: '3', destaque: false },
            { label: 'Alunos', valor: '74', destaque: false },
            { label: 'Frequência média', valor: '82%', destaque: true },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-lg p-4 ${stat.destaque ? 'bg-[#FDF0E8]' : 'bg-[#E6EEF5]'}`}>
              <p className={`text-2xl font-medium ${stat.destaque ? 'text-[#E8601C]' : 'text-[#003B6F]'}`}>{stat.valor}</p>
              <p className={`text-xs mt-1 ${stat.destaque ? 'text-[#a04010]' : 'text-[#5a7a9a]'}`}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border border-black/[.06] rounded-xl p-4">
          <h2 className="text-sm font-medium text-[#003B6F] mb-3">Minhas turmas</h2>
          <div className="flex text-xs text-gray-400 pb-2 border-b border-black/[.05]">
            <span className="flex-[2]">Turma</span>
            <span className="flex-1">Período</span>
            <span className="flex-1">Alunos</span>
            <span className="flex-1">Status</span>
          </div>
          {[
            { nome: 'Análise e Dev.', codigo: 'ADS01', periodo: '2025.1', alunos: 28, status: 'Ativa' },
            { nome: 'Redes de Comp.', codigo: 'REC02', periodo: '2025.1', alunos: 24, status: 'Ativa' },
            { nome: 'Banco de Dados', codigo: 'BD03', periodo: '2024.2', alunos: 22, status: 'Encerrada' },
          ].map((t) => (
            <div key={t.codigo} className="flex items-center py-2.5 border-b border-black/[.04] text-sm last:border-none">
              <span className="flex-[2] font-medium text-[#003B6F] text-xs">{t.nome} · {t.codigo}</span>
              <span className="flex-1 text-xs text-gray-400">{t.periodo}</span>
              <span className="flex-1 text-xs text-gray-400">{t.alunos}</span>
              <span className="flex-1">
                <span className={`text-xs px-2 py-0.5 rounded-full ${t.status === 'Ativa' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {t.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}