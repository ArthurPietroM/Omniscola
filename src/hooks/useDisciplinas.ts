import { useListarDisciplinas } from './disciplinas/useListarDisciplinas';
import { useBuscarDisciplina } from './disciplinas/useBuscarDisciplina';
import { useCriarDisciplina } from './disciplinas/useCriarDisciplina';
import { useAtualizarDisciplina } from './disciplinas/useAtualizarDisciplina';
import { useDeletarDisciplina } from './disciplinas/useDeletarDisciplina';

export function useDisciplinas() {
  const { disciplinas, loading: loadingList, error: errorList, fetchDisciplinas } = useListarDisciplinas();
  const { disciplina, loading: loadingOne, error: errorOne, fetchDisciplinaById } = useBuscarDisciplina();
  const { loading: loadingCreate, error: errorCreate, createDisciplina } = useCriarDisciplina();
  const { loading: loadingUpdate, error: errorUpdate, updateDisciplina } = useAtualizarDisciplina();
  const { loading: loadingDelete, error: errorDelete, deleteDisciplina } = useDeletarDisciplina();

  const loading = loadingList || loadingOne || loadingCreate || loadingUpdate || loadingDelete;
  const error = errorList ?? errorOne ?? errorCreate ?? errorUpdate ?? errorDelete;

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
}