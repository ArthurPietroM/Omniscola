import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { db } from '@/core/infrastructure/database';
import { users } from '@/core/infrastructure/database/schemas/users';
import { eq } from 'drizzle-orm';
import AdminUserCard from '@/components/features/admin/AdminUserCard';

export default async function AdminPage() {
  const usuario = await getSession();
  if (!usuario) redirect('/');
  if (usuario.role !== 'admin') redirect('/dashboard');

  const listaUsuarios = await db.select({
    id:        users.id,
    nome:      users.nome,
    email:     users.email,
    role:      users.role,
    ativo:     users.ativo,
    createdAt: users.createdAt,
  }).from(users).where(eq(users.institutionId, usuario.institutionId));

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-medium text-[#003B6F]">Gerenciar usuários</h1>
        <span className="text-xs bg-[#E6EEF5] text-[#003B6F] px-3 py-1 rounded-full">
          {listaUsuarios.length} usuário{listaUsuarios.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {listaUsuarios.map((u) => (
          <AdminUserCard key={u.id} usuario={u} adminId={usuario.id} />
        ))}
      </div>
    </div>
  );
} 