import { pgTable, text } from 'drizzle-orm/pg-core';
import { alunos } from './alunos';

export const requerimentos = pgTable('requerimentos', {
  id:          text('id').primaryKey(),
  alunoId:     text('aluno_id').notNull().references(() => alunos.id),
  protocolo:   text('protocolo').notNull().unique(),
  tipo:        text('tipo').notNull(), // 'declaracao_matricula' | 'declaracao_frequencia' | 'boletim_parcial' | 'historico_escolar'
  situacao:    text('situacao').notNull().default('pendente'), // pendente | processando | concluido
  periodoRef:  text('periodo_ref'),
  createdAt:   text('created_at').notNull(),
  concluidoAt: text('concluido_at'),
});