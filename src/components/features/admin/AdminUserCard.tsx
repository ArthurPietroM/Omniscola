'use client';

import { useActionState, useState } from 'react';
import { atualizarUsuarioAction, resetarSenhaAction, toggleAtivoAction } from '@/actions/admin';

type Usuario = {
  id: string;
  nome: string;
  email: string;
  role: string;
  ativo: boolean | number;
  createdAt: string;
};

const ROLES = [
  { value: 'admin',      label: 'Administrador' },
  { value: 'professor',  label: 'Professor' },
  { value: 'diretoria',  label: 'Diretoria' },
  { value: 'aluno',      label: 'Aluno' },
];

const PERMISSOES: Record<string, string[]> = {
  admin:     ['Ver tudo', 'Editar tudo', 'Gerenciar usuários', 'Gerar boletins'],
  professor: ['Ver suas turmas', 'Lançar presenças', 'Lançar notas', 'Gerar boletins'],
  diretoria: ['Ver todas as turmas', 'Ver relatórios', 'Gerar boletins'],
  aluno:     ['Ver próprias notas', 'Ver próprias presenças'],
};

export default function AdminUserCard({ usuario, adminId }: { usuario: Usuario; adminId: string }) {
  const [expandido, setExpandido] = useState(false);
  const [abaAtiva, setAbaAtiva] = useState<'info' | 'senha' | 'permissoes'>('info');
  const isAtivo = Boolean(usuario.ativo);
  const isSelf = usuario.id === adminId;

  const [stateInfo, actionInfo, pendingInfo] = useActionState(atualizarUsuarioAction, null);
  const [stateSenha, actionSenha, pendingSenha] = useActionState(resetarSenhaAction, null);

  return (
    <div className={`bg-white border rounded-xl overflow-hidden transition-all ${!isAtivo ? 'opacity-60 border-black/[.04]' : 'border-black/[.06]'}`}>
      <div className="flex items-center px-4 py-3 gap-3">
        <div className="w-8 h-8 rounded-full bg-[#E6EEF5] flex items-center justify-center text-xs font-medium text-[#003B6F] shrink-0">
          {usuario.nome.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#003B6F] truncate">{usuario.nome}</p>
          <p className="text-xs text-gray-400 truncate">{usuario.email}</p>
        </div>

        <span className={`text-xs px-2 py-0.5 rounded-full capitalize shrink-0 ${
          usuario.role === 'admin'     ? 'bg-[#E6EEF5] text-[#003B6F]' :
          usuario.role === 'professor' ? 'bg-[#FDF0E8] text-[#E8601C]' :
          usuario.role === 'diretoria' ? 'bg-purple-50 text-purple-700' :
          'bg-green-50 text-green-700'
        }`}>
          {ROLES.find(r => r.value === usuario.role)?.label ?? usuario.role}
        </span>

        <div className="flex items-center gap-2 shrink-0">
          {!isSelf && (
            <form action={toggleAtivoAction.bind(null, usuario.id, isAtivo)}>
              <button
                type="submit"
                className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                  isAtivo
                    ? 'border-red-200 text-red-500 hover:bg-red-50'
                    : 'border-green-200 text-green-600 hover:bg-green-50'
                }`}
              >
                {isAtivo ? 'Bloquear' : 'Ativar'}
              </button>
            </form>
          )}
          <button
            onClick={() => setExpandido(!expandido)}
            className="text-xs text-[#003B6F] hover:underline"
          >
            {expandido ? 'Fechar' : 'Editar'}
          </button>
        </div>
      </div>

      {expandido && (
        <div className="border-t border-black/[.05]">
          <div className="flex border-b border-black/[.05]">
            {(['info', 'senha', 'permissoes'] as const).map((aba) => (
              <button
                key={aba}
                onClick={() => setAbaAtiva(aba)}
                className={`flex-1 py-2 text-xs font-medium transition-colors capitalize ${
                  abaAtiva === aba
                    ? 'text-[#E8601C] border-b-2 border-[#E8601C]'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {aba === 'info' ? 'Informações' : aba === 'senha' ? 'Senha' : 'Permissões'}
              </button>
            ))}
          </div>

          <div className="p-4">
            {abaAtiva === 'info' && (
              <form action={actionInfo} className="flex flex-col gap-3">
                <input type="hidden" name="id" value={usuario.id} />

                {stateInfo?.erro && <div className="bg-red-50 text-red-600 text-xs px-3 py-2 rounded-lg">{stateInfo.erro}</div>}
                {stateInfo?.sucesso && <div className="bg-green-50 text-green-700 text-xs px-3 py-2 rounded-lg">{stateInfo.sucesso}</div>}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Nome</label>
                    <input
                      name="nome"
                      defaultValue={usuario.nome}
                      className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Email</label>
                    <input
                      name="email"
                      type="email"
                      defaultValue={usuario.email}
                      className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C]"
                    />
                  </div>
                </div>

                {!isSelf && (
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Perfil</label>
                    <select
                      name="role"
                      defaultValue={usuario.role}
                      className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C]"
                    >
                      {ROLES.map(r => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={pendingInfo}
                  className="self-start bg-[#E8601C] hover:bg-[#cf5418] disabled:opacity-60 text-white rounded-lg px-4 py-2 text-sm transition-colors"
                >
                  {pendingInfo ? 'Salvando...' : 'Salvar alterações'}
                </button>
              </form>
            )}

            {abaAtiva === 'senha' && (
              <form action={actionSenha} className="flex flex-col gap-3">
                <input type="hidden" name="id" value={usuario.id} />

                {stateSenha?.erro && <div className="bg-red-50 text-red-600 text-xs px-3 py-2 rounded-lg">{stateSenha.erro}</div>}
                {stateSenha?.sucesso && <div className="bg-green-50 text-green-700 text-xs px-3 py-2 rounded-lg">{stateSenha.sucesso}</div>}

                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Nova senha</label>
                  <input
                    name="novaSenha"
                    type="password"
                    placeholder="Minimo 6 caracteres"
                    className="w-full border border-black/[.1] rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:border-[#E8601C]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={pendingSenha}
                  className="self-start bg-[#003B6F] hover:bg-[#002a50] disabled:opacity-60 text-white rounded-lg px-4 py-2 text-sm transition-colors"
                >
                  {pendingSenha ? 'Resetando...' : 'Resetar senha'}
                </button>
              </form>
            )}

            {abaAtiva === 'permissoes' && (
              <div>
                <p className="text-xs text-gray-500 mb-3">
                  Permissões do perfil <strong className="text-[#003B6F]">{ROLES.find(r => r.value === usuario.role)?.label}</strong>:
                </p>
                <div className="flex flex-col gap-1.5">
                  {(PERMISSOES[usuario.role] ?? []).map((p) => (
                    <div key={p} className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="text-green-500">✓</span> {p}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  Para alterar as permissoes, mude o perfil na aba Informacoes.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}