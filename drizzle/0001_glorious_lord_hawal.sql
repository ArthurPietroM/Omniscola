CREATE TABLE `disciplinas` (
	`id` text PRIMARY KEY NOT NULL,
	`institution_id` text NOT NULL,
	`nome` text NOT NULL,
	`codigo` text NOT NULL,
	FOREIGN KEY (`institution_id`) REFERENCES `institutions`(`id`) ON UPDATE no action ON DELETE no action
);
