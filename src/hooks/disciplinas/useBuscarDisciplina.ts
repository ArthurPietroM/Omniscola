import { useState, useCallback } from 'react';
import { Disciplina } from '@/shared/types';

export function useBuscarDisciplina() {
  const [disciplina, setDisciplina] = useState<Disciplina | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDisciplinaById = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/disciplinas/${id}`);
      if (!res.ok) throw new Error((await res.json()).error);
      setDisciplina(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, []);

  return { disciplina, loading, error, fetchDisciplinaById };
}
