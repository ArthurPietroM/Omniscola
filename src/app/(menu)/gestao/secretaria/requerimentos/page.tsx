import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { db } from '@/core/infrastructure/database';
import { requerimentos } from '@/core/infrastructure/database/schemas/requerimentos';
import { alunos } from '@/core/infrastructure/database/schemas/alunos';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

const TIPOS: Record<string, string> = {
  declaracao_matricula:   'Declaração de Matrícula',
  declaracao_frequencia:  'Declaração de Frequência',
  boletim_parcial:        'Boletim Parcial',
  historico_escolar:      'Histórico Escolar',
  declaracao_nada_consta: 'Declaração de Nada Consta',
  ementario:              'Ementário Escolar',
};

export default async function RequerimentosPage() {
  const usuario = await getSession();
  if (!usuario) redirect('/');
  if (!['admin', 'diretoria'].includes(usuario.role)) redirect('/dashboard');

  const lista = await db
    .select({
      id:          requerimentos.id,
      protocolo:   requerimentos.protocolo,
      tipo:        requerimentos.tipo,
      situacao:    requerimentos.situacao,
      periodoRef:  requerimentos.periodoRef,
      createdAt:   requerimentos.createdAt,
      alunoNome:   alunos.nome,
      alunoId:     alunos.id,
    })
    .from(requerimentos)
    .leftJoin(alunos, eq(requerimentos.alunoId, alunos.id))
    .orderBy(requerimentos.createdAt);

  // Agrupar por aluno
  const porAluno: Record<string, { nome: string; id: string; reqs: typeof lista }> = {};
  for (const r of lista) {
    const key = r.alunoId ?? 'desconhecido';
    if (!porAluno[key]) {
      porAluno[key] = { nome: r.alunoNome ?? '—', id: key, reqs: [] };
    }
    porAluno[key].reqs.push(r);
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Link href="/gestao/secretaria" className="text-xs text-gray-400 hover:text-[#E8601C] transition-colors">← Secretaria</Link>
        <h1 className="text-base font-medium text-[#003B6F]">Requerimentos</h1>
      </div>

      {Object.keys(porAluno).length === 0 ? (
        <div className="bg-white border border-black/[.06] rounded-xl p-8 text-center text-gray-400 text-sm">
          Nenhum requerimento solicitado ainda.
        </div>
      ) : (
        Object.values(porAluno).map((grupo) => (
          <div key={grupo.id} className="bg-white border border-black/[.06] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-black/[.05]">
              <span className="text-sm font-medium text-[#003B6F]">{grupo.nome}</span>
              <span className="text-xs text-gray-400">{grupo.reqs.length} requerimento{grupo.reqs.length !== 1 ? 's' : ''}</span>
            </div>

            <div className="px-4">
              <div className="flex text-xs text-gray-400 py-2 border-b border-black/[.05]">
                <span className="flex-1">Protocolo</span>
                <span className="flex-[2]">Requerimento</span>
                <span className="flex-1">Data de Solicitação</span>
                <span className="flex-1">Situação</span>
                <span className="flex-1 text-right">Ações</span>
              </div>

              {grupo.reqs.map((r) => (
                <div key={r.id} className="flex items-center py-2.5 border-b border-black/[.04] last:border-none">
                  <span className="flex-1 text-xs font-mono text-gray-600">{r.protocolo}</span>
                  <span className="flex-[2] text-xs text-[#003B6F]">{TIPOS[r.tipo] ?? r.tipo}</span>
                  <span className="flex-1 text-xs text-gray-400">
                    {new Date(r.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="flex-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      r.situacao === 'concluido' ? 'bg-green-50 text-green-700' :
                      r.situacao === 'processando' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {r.situacao === 'concluido' ? 'Concluído' :
                       r.situacao === 'processando' ? 'Processando' : 'Pendente'}
                    </span>
                  </span>
                  <span className="flex-1 flex justify-end">
                    {r.situacao === 'concluido' && (
                      <button className="text-xs bg-[#003B6F] text-white px-2 py-1 rounded-lg hover:bg-[#002a50] transition-colors">
                        ↓ PDF
                      </button>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}