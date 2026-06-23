'use client';

import { useState, useRef, useEffect } from 'react';
import { logout } from '@/actions/auth';

interface UserMenuProps {
  nome: string;
  role: string;
}

export default function UserMenu({ nome, role }: UserMenuProps) {
  const [aberto, setAberto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const iniciais = nome
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  useEffect(() => {
    function fechar(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setAberto(false);
      }
    }
    document.addEventListener('mousedown', fechar);
    return () => document.removeEventListener('mousedown', fechar);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setAberto(!aberto)}
        className="w-9 h-9 rounded-full bg-[#E8601C] text-white text-sm font-medium flex items-center justify-center hover:bg-[#cf5418] transition-colors"
      >
        {iniciais}
      </button>

      {aberto && (
        <div className="absolute right-0 bottom-12 w-56 bg-white border border-black/[.08] rounded-xl shadow-lg overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-black/[.06]">
            <p className="text-sm font-medium text-[#003B6F]">{nome}</p>
            <p className="text-xs text-gray-400 capitalize mt-0.5">{role}</p>
          </div>
          <div className="py-1">
            <form action={logout}>
              <button
                type="submit"
                className="w-full text-left px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <span>↩</span> Sair
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}