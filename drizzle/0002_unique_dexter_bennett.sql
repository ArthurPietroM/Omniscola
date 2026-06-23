ALTER TABLE `notas` ADD `disciplina_id` text NOT NULL REFERENCES disciplinas(id);--> statement-breakpoint
ALTER TABLE `turmas` ADD `disciplina_id` text REFERENCES disciplinas(id);