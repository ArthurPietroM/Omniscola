import { useState, useCallback } from 'react';
import { UpdateDisciplinaDTO } from '@/shared/types';

export function useAtualizarDisciplina() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateDisciplina = useCallback(async (id: string, data: UpdateDisciplinaDTO): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/disciplinas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, updateDisciplina };
}