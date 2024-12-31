CREATE TABLE "ai_interview" (
	"id" serial PRIMARY KEY NOT NULL,
	"json_interview_resp" text NOT NULL,
	"job_position" varchar NOT NULL,
	"job_desc" text NOT NULL,
	"job_experience" varchar NOT NULL,
	"created_by" varchar NOT NULL,
	"created_at" timestamp (6) DEFAULT now(),
	"interview_id" varchar NOT NULL
);
