import { db } from '@/core/infrastructure/database';
import { matriculas } from '@/core/infrastructure/database/schemas/matriculas';
import { cursos } from '@/core/infrastructure/database/schemas/cursos';
import { eq, and, like, desc } from 'drizzle-orm';

export async function gerarCodigoMatricula(
  cursoId: string,
  periodo: string // ex: "2026.2"
): Promise<string> {
  const [ano, semestre] = periodo.split('.');

  const curso = await db
    .select({ codigoNumerico: cursos.codigoNumerico })
    .from(cursos)
    .where(eq(cursos.id, cursoId))
    .limit(1);

  if (!curso[0]) throw new Error('Curso não encontrado');

  const codigoCurso = curso[0].codigoNumerico.padStart(2, '0');
  const prefixo = `${ano}${semestre}${codigoCurso}`;

  const ultima = await db
    .select({ codigo: matriculas.codigo })
    .from(matriculas)
    .where(like(matriculas.codigo, `${prefixo}%`))
    .orderBy(desc(matriculas.codigo))
    .limit(1);

  let sequencial = 1;
  if (ultima[0]) {
    const ultimoSeq = parseInt(ultima[0].codigo.slice(-3));
    sequencial = ultimoSeq + 1;
  }

  return `${prefixo}${String(sequencial).padStart(3, '0')}`;
}