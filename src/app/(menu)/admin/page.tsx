import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { db } from '@/core/infrastructure/database';
import { users } from '@/core/infrastructure/database/schemas/users';
import { eq } from 'drizzle-orm';

export default async function AdminPage() {
  const usuario = await getSession();
  if (!usuario) redirect('/');
  if (usuario.role !== 'admin') redirect('/dashboard');

  const listaUsuarios = await db.select({
    id: users.id,
    nome: users.nome,
    email: users.email,
    role: users.role,
    createdAt: users.createdAt,
  }).from(users).where(eq(users.institutionId, usuario.institutionId));

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-base font-medium text-[#003B6F]">Usuários do sistema</h1>

      <div className="bg-white border border-black/[.06] rounded-xl p-4">
        <div className="flex text-xs text-gray-400 pb-2 border-b border-black/[.05]">
          <span className="flex-[2]">Nome</span>
          <span className="flex-[2]">Email</span>
          <span className="flex-1">Perfil</span>
          <span className="flex-1">Desde</span>
        </div>
        {listaUsuarios.map((u) => (
          <div key={u.id} className="flex items-center py-2.5 border-b border-black/[.04] last:border-none">
            <span className="flex-[2] font-medium text-[#003B6F] text-xs">{u.nome}</span>
            <span className="flex-[2] text-xs text-gray-400">{u.email}</span>
            <span className="flex-1">
              <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                u.role === 'admin' ? 'bg-[#E6EEF5] text-[#003B6F]'
                : u.role === 'professor' ? 'bg-[#FDF0E8] text-[#E8601C]'
                : 'bg-gray-100 text-gray-500'
              }`}>
                {u.role}
              </span>
            </span>
            <span className="flex-1 text-xs text-gray-400">
              {new Date(u.createdAt).toLocaleDateString('pt-BR')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}