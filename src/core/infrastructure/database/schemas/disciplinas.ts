import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { institutions } from './institutions'; // Ajuste o nome/caminho se necessário

export const disciplinas = sqliteTable('disciplinas', {
  id: text('id').primaryKey(),
  institutionId: text('institution_id')
    .notNull()
    .references(() => institutions.id),
  nome: text('nome').notNull(),
  codigo: text('codigo').notNull(),
});
