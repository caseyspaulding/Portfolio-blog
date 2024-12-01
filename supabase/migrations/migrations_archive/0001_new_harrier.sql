CREATE TABLE IF NOT EXISTS "agenda" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"event_id" uuid NOT NULL,
	"title" text NOT NULL,
	"start_time" timestamp,
	"end_time" timestamp,
	"description" text,
	"host_or_artist" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "highlights" text[];--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "faqs" jsonb;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "age_restriction" text;--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "parking_options" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "agenda" ADD CONSTRAINT "agenda_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
