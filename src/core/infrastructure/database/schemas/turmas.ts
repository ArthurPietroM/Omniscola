import { pgTable, text } from 'drizzle-orm/pg-core';
import { institutions } from './institutions';
import { disciplinas } from './disciplinas';

export const turmas = pgTable('turmas', {
  id:           text('id').primaryKey(),
  institutionId: text('institution_id').notNull().references(() => institutions.id),
  disciplinaId:  text('disciplina_id').references(() => disciplinas.id),
  nome:         text('nome').notNull(),
  codigo:       text('codigo').notNull().unique(),
  periodo:      text('periodo').notNull(),
  status:       text('status').notNull().default('ativa'),
});