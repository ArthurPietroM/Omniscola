import { pgTable, text, real } from 'drizzle-orm/pg-core';
import { matrizCurricular } from './matrizCurricular';

export const avaliacoesModelo = pgTable('avaliacoes_modelo', {
  id:        text('id').primaryKey(),
  matrizId:  text('matriz_id').notNull().references(() => matrizCurricular.id),
  nome:      text('nome').notNull(), // ex: "Prova 1", "Trabalho Final"
  peso:      real('peso').notNull().default(1), // peso na média
  createdAt: text('created_at').notNull(),
});