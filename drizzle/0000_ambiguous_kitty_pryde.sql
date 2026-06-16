CREATE TABLE `alunos` (
	`id` text PRIMARY KEY NOT NULL,
	`institution_id` text NOT NULL,
	`nome` text NOT NULL,
	`email` text NOT NULL,
	`matricula` text NOT NULL,
	FOREIGN KEY (`institution_id`) REFERENCES `institutions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `alunos_email_unique` ON `alunos` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `alunos_matricula_unique` ON `alunos` (`matricula`);--> statement-breakpoint
CREATE TABLE `aluno_turmas` (
	`id` text PRIMARY KEY NOT NULL,
	`aluno_id` text NOT NULL,
	`turma_id` text NOT NULL,
	`status` text DEFAULT 'ativo' NOT NULL,
	FOREIGN KEY (`aluno_id`) REFERENCES `alunos`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`turma_id`) REFERENCES `turmas`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `aulas` (
	`id` text PRIMARY KEY NOT NULL,
	`turma_id` text NOT NULL,
	`data` text NOT NULL,
	`topico` text,
	FOREIGN KEY (`turma_id`) REFERENCES `turmas`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `institutions` (
	`id` text PRIMARY KEY NOT NULL,
	`nome` text NOT NULL,
	`slug` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `institutions_slug_unique` ON `institutions` (`slug`);--> statement-breakpoint
CREATE TABLE `notas` (
	`id` text PRIMARY KEY NOT NULL,
	`turma_id` text NOT NULL,
	`aluno_id` text NOT NULL,
	`avaliacao` text NOT NULL,
	`valor` real NOT NULL,
	FOREIGN KEY (`turma_id`) REFERENCES `turmas`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`aluno_id`) REFERENCES `alunos`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `presencas` (
	`id` text PRIMARY KEY NOT NULL,
	`aula_id` text NOT NULL,
	`aluno_id` text NOT NULL,
	`status` text DEFAULT 'ausente' NOT NULL,
	FOREIGN KEY (`aula_id`) REFERENCES `aulas`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`aluno_id`) REFERENCES `alunos`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `turmas` (
	`id` text PRIMARY KEY NOT NULL,
	`institution_id` text NOT NULL,
	`nome` text NOT NULL,
	`codigo` text NOT NULL,
	`periodo` text NOT NULL,
	`status` text DEFAULT 'ativa' NOT NULL,
	FOREIGN KEY (`institution_id`) REFERENCES `institutions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `turmas_codigo_unique` ON `turmas` (`codigo`);