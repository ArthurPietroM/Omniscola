import { useState, useCallback } from 'react';
import { Disciplina, CreateDisciplinaDTO } from '@/shared/types';

export function useCriarDisciplina() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createDisciplina = useCallback(async (data: CreateDisciplinaDTO): Promise<Disciplina | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/disciplinas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      return await res.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, createDisciplina };
}