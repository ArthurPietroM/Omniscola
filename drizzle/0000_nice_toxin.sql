CREATE TABLE "alunos" (
	"id" text PRIMARY KEY NOT NULL,
	"institution_id" text NOT NULL,
	"nome" text NOT NULL,
	"email" text NOT NULL,
	"matricula" text NOT NULL,
	CONSTRAINT "alunos_email_unique" UNIQUE("email"),
	CONSTRAINT "alunos_matricula_unique" UNIQUE("matricula")
);
--> statement-breakpoint
CREATE TABLE "aluno_turmas" (
	"id" text PRIMARY KEY NOT NULL,
	"aluno_id" text NOT NULL,
	"turma_id" text NOT NULL,
	"status" text DEFAULT 'ativo' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "aulas" (
	"id" text PRIMARY KEY NOT NULL,
	"turma_id" text NOT NULL,
	"data" text NOT NULL,
	"topico" text
);
--> statement-breakpoint
CREATE TABLE "disciplinas" (
	"id" text PRIMARY KEY NOT NULL,
	"institution_id" text NOT NULL,
	"nome" text NOT NULL,
	"codigo" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "institutions" (
	"id" text PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	"slug" text NOT NULL,
	"created_at" text NOT NULL,
	CONSTRAINT "institutions_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "notas" (
	"id" text PRIMARY KEY NOT NULL,
	"turma_id" text NOT NULL,
	"aluno_id" text NOT NULL,
	"avaliacao" text NOT NULL,
	"valor" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE "presencas" (
	"id" text PRIMARY KEY NOT NULL,
	"aula_id" text NOT NULL,
	"aluno_id" text NOT NULL,
	"status" text DEFAULT 'ausente' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "professor_turmas" (
	"id" text PRIMARY KEY NOT NULL,
	"professor_id" text NOT NULL,
	"turma_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"token" text NOT NULL,
	"expires_at" text NOT NULL,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "turmas" (
	"id" text PRIMARY KEY NOT NULL,
	"institution_id" text NOT NULL,
	"disciplina_id" text,
	"nome" text NOT NULL,
	"codigo" text NOT NULL,
	"periodo" text NOT NULL,
	"status" text DEFAULT 'ativa' NOT NULL,
	CONSTRAINT "turmas_codigo_unique" UNIQUE("codigo")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"institution_id" text NOT NULL,
	"nome" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"role" text DEFAULT 'professor' NOT NULL,
	"ativo" boolean DEFAULT true NOT NULL,
	"created_at" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "alunos" ADD CONSTRAINT "alunos_institution_id_institutions_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "aluno_turmas" ADD CONSTRAINT "aluno_turmas_aluno_id_alunos_id_fk" FOREIGN KEY ("aluno_id") REFERENCES "public"."alunos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "aluno_turmas" ADD CONSTRAINT "aluno_turmas_turma_id_turmas_id_fk" FOREIGN KEY ("turma_id") REFERENCES "public"."turmas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "aulas" ADD CONSTRAINT "aulas_turma_id_turmas_id_fk" FOREIGN KEY ("turma_id") REFERENCES "public"."turmas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "disciplinas" ADD CONSTRAINT "disciplinas_institution_id_institutions_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notas" ADD CONSTRAINT "notas_turma_id_turmas_id_fk" FOREIGN KEY ("turma_id") REFERENCES "public"."turmas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notas" ADD CONSTRAINT "notas_aluno_id_alunos_id_fk" FOREIGN KEY ("aluno_id") REFERENCES "public"."alunos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "presencas" ADD CONSTRAINT "presencas_aula_id_aulas_id_fk" FOREIGN KEY ("aula_id") REFERENCES "public"."aulas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "presencas" ADD CONSTRAINT "presencas_aluno_id_alunos_id_fk" FOREIGN KEY ("aluno_id") REFERENCES "public"."alunos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "professor_turmas" ADD CONSTRAINT "professor_turmas_professor_id_users_id_fk" FOREIGN KEY ("professor_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "professor_turmas" ADD CONSTRAINT "professor_turmas_turma_id_turmas_id_fk" FOREIGN KEY ("turma_id") REFERENCES "public"."turmas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "turmas" ADD CONSTRAINT "turmas_institution_id_institutions_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "turmas" ADD CONSTRAINT "turmas_disciplina_id_disciplinas_id_fk" FOREIGN KEY ("disciplina_id") REFERENCES "public"."disciplinas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_institution_id_institutions_id_fk" FOREIGN KEY ("institution_id") REFERENCES "public"."institutions"("id") ON DELETE no action ON UPDATE no action;