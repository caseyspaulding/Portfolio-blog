CREATE TABLE IF NOT EXISTS "feedback" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject" varchar(255) NOT NULL,
	"category" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"attachment_url" varchar(255),
	"user_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
