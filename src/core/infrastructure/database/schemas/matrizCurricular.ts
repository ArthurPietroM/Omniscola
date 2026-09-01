import { pgTable, text } from 'drizzle-orm/pg-core';
import { cursos } from './cursos';
import { disciplinas } from './disciplinas';

export const matrizCurricular = pgTable('matriz_curricular', {
  id:           text('id').primaryKey(),
  cursoId:      text('curso_id').notNull().references(() => cursos.id),
  disciplinaId: text('disciplina_id').notNull().references(() => disciplinas.id),
  tipo:         text('tipo').notNull().default('obrigatoria'), // obrigatoria | eletiva
  cargaHoraria: text('carga_horaria'),
  createdAt:    text('created_at').notNull(),
});