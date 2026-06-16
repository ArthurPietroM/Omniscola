import { useState, useCallback } from 'react';
import { Aluno, CreateAlunoDTO, UpdateAlunoDTO } from '@/shared/types';

interface UseAlunosResult {
  alunos: Aluno[];
  aluno: Aluno | null;
  loading: boolean;
  error: string | null;
  fetchAlunos: () => Promise<void>;
  fetchAlunoById: (id: string) => Promise<void>;
  createAluno: (data: CreateAlunoDTO) => Promise<Aluno | null>;
  updateAluno: (id: string, data: UpdateAlunoDTO) => Promise<boolean>;
  deleteAluno: (id: string) => Promise<boolean>;
}

export const useAlunos = (): UseAlunosResult => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAlunos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/alunos');
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Erro ao buscar alunos');
      }
      const data: Aluno[] = await response.json();
      setAlunos(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao buscar alunos');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAlunoById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/alunos/${id}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Erro ao buscar aluno ${id}`);
      }
      const data: Aluno = await response.json();
      setAluno(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Erro desconhecido ao buscar aluno ${id}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const createAluno = useCallback(async (data: CreateAlunoDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Erro ao criar aluno');
      }
      const newAluno: Aluno = await response.json();
      setAlunos((prev) => [...prev, newAluno]);
      return newAluno;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao criar aluno');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAluno = useCallback(async (id: string, data: UpdateAlunoDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/alunos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Erro ao atualizar aluno ${id}`);
      }
      fetchAlunos();
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Erro desconhecido ao atualizar aluno ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchAlunos]);

  const deleteAluno = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/alunos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Erro ao deletar aluno ${id}`);
      }
      setAlunos((prev) => prev.filter((a) => a.id !== id));
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Erro desconhecido ao deletar aluno ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    alunos,
    aluno,
    loading,
    error,
    fetchAlunos,
    fetchAlunoById,
    createAluno,
    updateAluno,
    deleteAluno,
  };
};
