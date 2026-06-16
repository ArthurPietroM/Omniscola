import { useState, useCallback } from 'react';
import { Presenca, CreatePresencaDTO, UpdatePresencaDTO } from '@/shared/types';

interface UsePresencasResult {
  presencas: Presenca[];
  presenca: Presenca | null;
  loading: boolean;
  error: string | null;
  fetchPresencasByAula: (aulaId: string) => Promise<void>;
  fetchPresencasByAluno: (alunoId: string) => Promise<void>;
  registrarPresenca: (data: CreatePresencaDTO) => Promise<Presenca | null>;
  updatePresenca: (id: string, data: UpdatePresencaDTO) => Promise<boolean>;
  deletePresenca: (id: string) => Promise<boolean>;
}

export const usePresencas = (): UsePresencasResult => {
  const [presencas, setPresencas] = useState<Presenca[]>([]);
  const [presenca, setPresenca] = useState<Presenca | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPresencasByAula = useCallback(async (aulaId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/presencas/aula/${aulaId}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Erro ao buscar presenças para aula ${aulaId}`);
      }
      const data: Presenca[] = await response.json();
      setPresencas(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Erro desconhecido ao buscar presenças para aula ${aulaId}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPresencasByAluno = useCallback(async (alunoId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/presencas/aluno/${alunoId}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Erro ao buscar presenças para aluno ${alunoId}`);
      }
      const data: Presenca[] = await response.json();
      setPresencas(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Erro desconhecido ao buscar presenças para aluno ${alunoId}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const registrarPresenca = useCallback(async (data: CreatePresencaDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/presencas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Erro ao registrar presença');
      }
      const newPresenca: Presenca = await response.json();
      setPresencas((prev) => [...prev, newPresenca]);
      return newPresenca;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao registrar presença');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePresenca = useCallback(async (id: string, data: UpdatePresencaDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/presencas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Erro ao atualizar presença ${id}`);
      }
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Erro desconhecido ao atualizar presença ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const deletePresenca = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/presencas/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Erro ao deletar presença ${id}`);
      }
      setPresencas((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Erro desconhecido ao deletar presença ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    presencas,
    presenca,
    loading,
    error,
    fetchPresencasByAula,
    fetchPresencasByAluno,
    registrarPresenca,
    updatePresenca,
    deletePresenca,
  };
};
