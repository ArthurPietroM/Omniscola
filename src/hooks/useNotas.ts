import { useState, useCallback } from 'react';
import { Nota, CreateNotaDTO, UpdateNotaDTO } from '@/shared/types';

interface UseNotasResult {
  notas: Nota[];
  nota: Nota | null;
  loading: boolean;
  error: string | null;
  fetchNotasByAluno: (alunoId: string) => Promise<void>;
  fetchNotasByTurma: (turmaId: string) => Promise<void>;
  lancarNota: (data: CreateNotaDTO) => Promise<Nota | null>;
  updateNota: (id: string, data: UpdateNotaDTO) => Promise<boolean>;
  deleteNota: (id: string) => Promise<boolean>;
}

export const useNotas = (): UseNotasResult => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [nota, setNota] = useState<Nota | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotasByAluno = useCallback(async (alunoId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/notas/aluno/${alunoId}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Erro ao buscar notas para aluno ${alunoId}`);
      }
      const data: Nota[] = await response.json();
      setNotas(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Erro desconhecido ao buscar notas para aluno ${alunoId}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchNotasByTurma = useCallback(async (turmaId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/notas/turma/${turmaId}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Erro ao buscar notas para turma ${turmaId}`);
      }
      const data: Nota[] = await response.json();
      setNotas(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Erro desconhecido ao buscar notas para turma ${turmaId}`);
    } finally {
      setLoading(false);
    }
  }, []);

  const lancarNota = useCallback(async (data: CreateNotaDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/notas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Erro ao lançar nota');
      }
      const newNota: Nota = await response.json();
      setNotas((prev) => [...prev, newNota]);
      return newNota;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao lançar nota');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateNota = useCallback(async (id: string, data: UpdateNotaDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/notas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Erro ao atualizar nota ${id}`);
      }
      // Como a atualização pode não retornar um corpo, re-buscamos as notas para garantir consistência
      // Ou você pode optar por atualizar o estado localmente se a API retornar o item atualizado
      // fetchNotasByAluno(data.alunoId); // Se você tiver o alunoId disponível aqui
      // fetchNotasByTurma(data.turmaId); // Se você tiver o turmaId disponível aqui
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Erro desconhecido ao atualizar nota ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteNota = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/notas/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || `Erro ao deletar nota ${id}`);
      }
      setNotas((prev) => prev.filter((n) => n.id !== id));
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : `Erro desconhecido ao deletar nota ${id}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    notas,
    nota,
    loading,
    error,
    fetchNotasByAluno,
    fetchNotasByTurma,
    lancarNota,
    updateNota,
    deleteNota,
  };
};
