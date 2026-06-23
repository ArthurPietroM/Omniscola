import { useState, useCallback } from 'react';
import { Disciplina, CreateDisciplinaDTO, UpdateDisciplinaDTO } from '@/shared/types';

interface UseDisciplinasResult {
  disciplinas: Disciplina[];
  disciplina: Disciplina | null;
  loading: boolean;
  error: string | null;
  fetchDisciplinas: () => Promise<void>;
  fetchDisciplinaById: (id: string) => Promise<void>;
  createDisciplina: (data: CreateDisciplinaDTO) => Promise<Disciplina | null>;
  updateDisciplina: (id: string, data: UpdateDisciplinaDTO) => Promise<boolean>;
  deleteDisciplina: (id: string) => Promise<boolean>;
}

export const useDisciplinas = (): UseDisciplinasResult => {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);
  const [disciplina, setDisciplina] = useState<Disciplina | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDisciplinas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/disciplinas');
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Erro ao buscar disciplinas');
      }
      const data: Disciplina[] = await response.json();
      setDisciplinas(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao buscar disciplinas');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchDisciplinaById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/disciplinas/${id}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Erro ao buscar disciplina ${id}`);
      }
      const data: Disciplina = await response.json();
      setDisciplina(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Erro desconhecido ao buscar disciplina ${id}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createDisciplina = useCallback(async (data: CreateDisciplinaDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/disciplinas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Erro ao criar disciplina');
      }
      const newDisciplina: Disciplina = await response.json();
      setDisciplinas((prev) => [...prev, newDisciplina]);
      return newDisciplina;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao criar disciplina');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateDisciplina = useCallback(async (id: string, data: UpdateDisciplinaDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/disciplinas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Erro ao atualizar disciplina ${id}`);
      }
      fetchDisciplinas();
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Erro desconhecido ao atualizar disciplina ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchDisciplinas]);

  const deleteDisciplina = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/disciplinas/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Erro ao deletar disciplina ${id}`);
      }
      setDisciplinas((prev) => prev.filter((d) => d.id !== id));
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Erro desconhecido ao deletar disciplina ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    disciplinas,
    disciplina,
    loading,
    error,
    fetchDisciplinas,
    fetchDisciplinaById,
    createDisciplina,
    updateDisciplina,
    deleteDisciplina,
  };
};
