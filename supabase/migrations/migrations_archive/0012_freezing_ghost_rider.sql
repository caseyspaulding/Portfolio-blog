CREATE TABLE IF NOT EXISTS "participant_events" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"participant_id" uuid NOT NULL,
	"event_id" uuid NOT NULL,
	"event_role" text,
	"status" text DEFAULT 'confirmed',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "event_speakers" ALTER COLUMN "event_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "guilds" ALTER COLUMN "event_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "guilds" ALTER COLUMN "leader_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "guilds" ALTER COLUMN "leader_email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "org_members" ALTER COLUMN "event_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "org_performers" ALTER COLUMN "event_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "org_vendors" ALTER COLUMN "event_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "event_speakers" ADD COLUMN "tags" jsonb;--> statement-breakpoint
ALTER TABLE "guilds" ADD COLUMN "tags" jsonb;--> statement-breakpoint
ALTER TABLE "org_members" ADD COLUMN "tags" jsonb;--> statement-breakpoint
ALTER TABLE "org_performers" ADD COLUMN "tags" jsonb;--> statement-breakpoint
ALTER TABLE "org_vendors" ADD COLUMN "tags" jsonb;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "participant_events" ADD CONSTRAINT "participant_events_participant_id_org_performers_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."org_performers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "participant_events" ADD CONSTRAINT "participant_events_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
