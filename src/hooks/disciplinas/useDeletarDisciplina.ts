import { useState, useCallback } from 'react';

export function useDeletarDisciplina() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteDisciplina = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/disciplinas/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, deleteDisciplina };
}