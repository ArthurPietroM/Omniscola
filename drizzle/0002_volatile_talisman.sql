CREATE TABLE "matriculas" (
	"id" text PRIMARY KEY NOT NULL,
	"aluno_id" text NOT NULL,
	"curso_id" text NOT NULL,
	"codigo" text NOT NULL,
	"periodo" text NOT NULL,
	"status" text DEFAULT 'ativa' NOT NULL,
	"created_at" text NOT NULL,
	CONSTRAINT "matriculas_codigo_unique" UNIQUE("codigo")
);
--> statement-breakpoint
ALTER TABLE "cursos" ADD COLUMN "codigo_numerico" text NOT NULL;--> statement-breakpoint
ALTER TABLE "turmas" ADD COLUMN "carga_horaria" text;--> statement-breakpoint
ALTER TABLE "turmas" ADD COLUMN "modalidade" text;--> statement-breakpoint
ALTER TABLE "turmas" ADD COLUMN "sigla" text;--> statement-breakpoint
ALTER TABLE "turmas" ADD COLUMN "horario" text;--> statement-breakpoint
ALTER TABLE "turmas" ADD COLUMN "data_inicio" text;--> statement-breakpoint
ALTER TABLE "turmas" ADD COLUMN "data_termino" text;--> statement-breakpoint
ALTER TABLE "turmas" ADD COLUMN "localidade" text;--> statement-breakpoint
ALTER TABLE "matriculas" ADD CONSTRAINT "matriculas_aluno_id_alunos_id_fk" FOREIGN KEY ("aluno_id") REFERENCES "public"."alunos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matriculas" ADD CONSTRAINT "matriculas_curso_id_cursos_id_fk" FOREIGN KEY ("curso_id") REFERENCES "public"."cursos"("id") ON DELETE no action ON UPDATE no action;