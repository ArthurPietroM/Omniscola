import { useState, useCallback } from 'react';
import { Disciplina } from '@/shared/types';

export function useListarDisciplinas() {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDisciplinas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/disciplinas');
      if (!res.ok) throw new Error((await res.json()).error);
      setDisciplinas(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, []);

  return { disciplinas, loading, error, fetchDisciplinas };
}