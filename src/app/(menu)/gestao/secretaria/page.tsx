import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function SecretariaPage() {
  const usuario = await getSession();
  if (!usuario) redirect('/');
  if (!['admin', 'diretoria'].includes(usuario.role)) redirect('/dashboard');

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-base font-medium text-[#003B6F]">Secretaria</h1>

      <div className="grid grid-cols-2 gap-4">
        <Link href="/gestao/secretaria/alunos" className="bg-white border border-black/[.06] rounded-xl p-6 hover:border-[#E8601C] transition-colors group">
          <div className="text-2xl mb-3">👤</div>
          <h2 className="text-sm font-medium text-[#003B6F] group-hover:text-[#E8601C] transition-colors">Gestão do Aluno</h2>
          <p className="text-xs text-gray-400 mt-1">Visualize e gerencie os dados dos alunos matriculados</p>
        </Link>

        <Link href="/gestao/secretaria/requerimentos" className="bg-white border border-black/[.06] rounded-xl p-6 hover:border-[#E8601C] transition-colors group">
          <div className="text-2xl mb-3">📋</div>
          <h2 className="text-sm font-medium text-[#003B6F] group-hover:text-[#E8601C] transition-colors">Requerimentos</h2>
          <p className="text-xs text-gray-400 mt-1">Histórico de documentos solicitados pelos alunos</p>
        </Link>
      </div>
    </div>
  );
}