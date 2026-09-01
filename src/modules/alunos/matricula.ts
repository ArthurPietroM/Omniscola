import { db } from '@/core/infrastructure/database';
import { alunos } from '@/core/infrastructure/database/schemas/alunos';
import { eq, like, desc } from 'drizzle-orm';

export async function gerarMatricula(institutionId: string): Promise<string> {
  const agora = new Date();
  const ano = agora.getFullYear();
  const semestre = agora.getMonth() < 6 ? 1 : 2;
  const prefixo = `${ano}0${semestre}`;

  const ultima = await db
    .select({ matricula: alunos.matricula })
    .from(alunos)
    .where(eq(alunos.institutionId, institutionId))
    .orderBy(desc(alunos.matricula))
    .limit(1);

  let sequencial = 1;

  if (ultima[0]) {
    const ultimaMatricula = ultima[0].matricula;
    if (ultimaMatricula.startsWith(prefixo)) {
      const ultimoSeq = parseInt(ultimaMatricula.slice(-3));
      sequencial = ultimoSeq + 1;
    }
  }

  return `${prefixo}${String(sequencial).padStart(3, '0')}`;
}