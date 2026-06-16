import { useState, useCallback } from 'react';
import { Turma, CreateTurmaDTO, UpdateTurmaDTO } from '@/shared/types';

interface UseTurmasResult {
  turmas: Turma[];
  turma: Turma | null;
  loading: boolean;
  error: string | null;
  fetchTurmas: () => Promise<void>;
  fetchTurmaById: (id: string) => Promise<void>;
  createTurma: (data: CreateTurmaDTO) => Promise<Turma | null>;
  updateTurma: (id: string, data: UpdateTurmaDTO) => Promise<boolean>;
  deleteTurma: (id: string) => Promise<boolean>;
}

export const useTurmas = (): UseTurmasResult => {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [turma, setTurma] = useState<Turma | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTurmas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/turmas');
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Erro ao buscar turmas');
      }
      const data: Turma[] = await response.json();
      setTurmas(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao buscar turmas');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTurmaById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/turmas/${id}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Erro ao buscar turma ${id}`);
      }
      const data: Turma = await response.json();
      setTurma(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Erro desconhecido ao buscar turma ${id}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTurma = useCallback(async (data: CreateTurmaDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/turmas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Erro ao criar turma');
      }
      const newTurma: Turma = await response.json();
      setTurmas((prev) => [...prev, newTurma]);
      return newTurma;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao criar turma');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTurma = useCallback(async (id: string, data: UpdateTurmaDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/turmas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Erro ao atualizar turma ${id}`);
      }
      fetchTurmas();
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Erro desconhecido ao atualizar turma ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchTurmas]);

  const deleteTurma = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/turmas/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Erro ao deletar turma ${id}`);
      }
      setTurmas((prev) => prev.filter((t) => t.id !== id));
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Erro desconhecido ao deletar turma ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    turmas,
    turma,
    loading,
    error,
    fetchTurmas,
    fetchTurmaById,
    createTurma,
    updateTurma,
    deleteTurma,
  };
};
