CREATE TABLE "avaliacoes_modelo" (
	"id" text PRIMARY KEY NOT NULL,
	"matriz_id" text NOT NULL,
	"nome" text NOT NULL,
	"peso" real DEFAULT 1 NOT NULL,
	"created_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cursos" (
	"id" text PRIMARY KEY NOT NULL,
	"institution_id" text NOT NULL,
	"nome" text NOT NULL,
	"codigo" text NOT NULL,
	"descricao" text,
	"created_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "matriz_curricular" (
	"id" text PRIMARY KEY NOT NULL,
	"curso_id" text NOT NULL,
	"disciplina_id" text NOT NULL,
	"tipo" text DEFAULT 'obrigatoria' NOT NULL,
	"carga_horaria" text,
	"created_at" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "avaliacoes_modelo" ADD CONSTRAINT "avaliacoes_modelo_matriz_id_matriz_curricular_id_fk" FOREIGN KEY ("matriz_id") REFERENCES "public"."matriz_curricular"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cursos" ADD CONSTRAINT "cursos_institution_id_institutions_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matriz_curricular" ADD CONSTRAINT "matriz_curricular_curso_id_cursos_id_fk" FOREIGN KEY ("curso_id") REFERENCES "public"."cursos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matriz_curricular" ADD CONSTRAINT "matriz_curricular_disciplina_id_disciplinas_id_fk" FOREIGN KEY ("disciplina_id") REFERENCES "public"."disciplinas"("id") ON DELETE no action ON UPDATE no action;