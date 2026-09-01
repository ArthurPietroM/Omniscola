import { pgTable, text } from 'drizzle-orm/pg-core';
import { institutions } from './institutions';

export const cursos = pgTable('cursos', {
  id:            text('id').primaryKey(),
  institutionId: text('institution_id').notNull().references(() => institutions.id),
  nome:          text('nome').notNull(),
  codigo:        text('codigo').notNull(),
  descricao:     text('descricao'),
  createdAt:     text('created_at').notNull(),
});