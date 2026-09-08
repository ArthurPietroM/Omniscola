CREATE TABLE "requerimentos" (
	"id" text PRIMARY KEY NOT NULL,
	"aluno_id" text NOT NULL,
	"protocolo" text NOT NULL,
	"tipo" text NOT NULL,
	"situacao" text DEFAULT 'pendente' NOT NULL,
	"periodo_ref" text,
	"created_at" text NOT NULL,
	"concluido_at" text,
	CONSTRAINT "requerimentos_protocolo_unique" UNIQUE("protocolo")
);
--> statement-breakpoint
ALTER TABLE "requerimentos" ADD CONSTRAINT "requerimentos_aluno_id_alunos_id_fk" FOREIGN KEY ("aluno_id") REFERENCES "public"."alunos"("id") ON DELETE no action ON UPDATE no action;