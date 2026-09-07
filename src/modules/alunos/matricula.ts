import { db } from '@/core/infrastructure/database';
import { alunos } from '@/core/infrastructure/database/schemas/alunos';
import { eq, like, desc } from 'drizzle-orm';

export async function gerarCodigoMatricula(
  institutionId: string,
  periodo: string
): Promise<string> {
  const [ano, semestre] = periodo.split('.');
  const prefixo = `${ano}${semestre}`;

  const ultima = await db
    .select({ matricula: alunos.matricula })
    .from(alunos)
    .where(eq(alunos.institutionId, institutionId))
    .orderBy(desc(alunos.matricula))
    .limit(1);

  let sequencial = 1;
  if (ultima[0]?.matricula?.startsWith(prefixo)) {
    const ultimoSeq = parseInt(ultima[0].matricula.slice(-3));
    sequencial = ultimoSeq + 1;
  }

  return `${prefixo}${String(sequencial).padStart(3, '0')}`;
}