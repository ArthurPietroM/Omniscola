import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { db } from '@/core/infrastructure/database';
import { requerimentos } from '@/core/infrastructure/database/schemas/requerimentos';
import { alunos } from '@/core/infrastructure/database/schemas/alunos';
import { eq } from 'drizzle-orm';
import SolicitarDocumento from '@/components/features/requerimentos/SolicitarDocumento';

const TIPOS: Record<string, string> = {
  declaracao_matricula:   'Declaração de Matrícula',
  declaracao_frequencia:  'Declaração de Frequência',
  boletim_parcial:        'Boletim Parcial',
  historico_escolar:      'Histórico Escolar',
  declaracao_nada_consta: 'Declaração de Nada Consta',
  ementario:              'Ementário Escolar',
};

export default async function PortalDocumentosPage() {
  const usuario = await getSession();
  if (!usuario) redirect('/');
  if (usuario.role !== 'aluno') redirect('/dashboard');

  const aluno = await db.select().from(alunos)
    .where(eq(alunos.email, usuario.email)).limit(1);

  if (!aluno[0]) redirect('/dashboard');

  const meusRequerimentos = await db
    .select()
    .from(requerimentos)
    .where(eq(requerimentos.alunoId, aluno[0].id))
    .orderBy(requerimentos.createdAt);

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-base font-medium text-[#003B6F]">Meus Documentos</h1>

      <SolicitarDocumento />

      <div className="bg-white border border-black/[.06] rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-black/[.05]">
          <h2 className="text-sm font-medium text-[#003B6F]">Histórico de Requerimentos</h2>
        </div>

        {meusRequerimentos.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-6">Nenhum requerimento solicitado ainda.</p>
        ) : (
          <div className="px-4">
            <div className="flex text-xs text-gray-400 py-2 border-b border-black/[.05]">
              <span className="flex-1">Protocolo</span>
              <span className="flex-[2]">Requerimento</span>
              <span className="flex-1">Data</span>
              <span className="flex-1">Situação</span>
              <span className="flex-1 text-right">Ações</span>
            </div>
            {meusRequerimentos.map((r) => (
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
        )}
      </div>
    </div>
  );
}