CREATE TABLE IF NOT EXISTS "signup_sheet_custom_questions" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"signup_sheet_id" uuid NOT NULL,
	"question_text" text NOT NULL,
	"field_type" text NOT NULL,
	"options" jsonb,
	"is_required" boolean DEFAULT false,
	"order" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "signup_sheet_responses" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"signup_sheet_id" uuid NOT NULL,
	"slot_id" uuid NOT NULL,
	"user_id" uuid,
	"responder_name" text NOT NULL,
	"responder_email" text NOT NULL,
	"response_data" jsonb,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "signup_sheet_slots" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"signup_sheet_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"date" date,
	"start_time" time,
	"end_time" time,
	"quantity" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "signup_sheets" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"org_id" uuid NOT NULL,
	"creator_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"event_id" uuid,
	"is_published" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "signup_sheet_custom_questions" ADD CONSTRAINT "signup_sheet_custom_questions_signup_sheet_id_signup_sheets_id_fk" FOREIGN KEY ("signup_sheet_id") REFERENCES "public"."signup_sheets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "signup_sheet_responses" ADD CONSTRAINT "signup_sheet_responses_signup_sheet_id_signup_sheets_id_fk" FOREIGN KEY ("signup_sheet_id") REFERENCES "public"."signup_sheets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "signup_sheet_responses" ADD CONSTRAINT "signup_sheet_responses_slot_id_signup_sheet_slots_id_fk" FOREIGN KEY ("slot_id") REFERENCES "public"."signup_sheet_slots"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "signup_sheet_responses" ADD CONSTRAINT "signup_sheet_responses_user_id_user_profiles_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "signup_sheet_slots" ADD CONSTRAINT "signup_sheet_slots_signup_sheet_id_signup_sheets_id_fk" FOREIGN KEY ("signup_sheet_id") REFERENCES "public"."signup_sheets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "signup_sheets" ADD CONSTRAINT "signup_sheets_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "signup_sheets" ADD CONSTRAINT "signup_sheets_creator_id_user_profiles_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "signup_sheets" ADD CONSTRAINT "signup_sheets_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
