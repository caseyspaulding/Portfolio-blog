CREATE TABLE IF NOT EXISTS "group_members" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"group_id" uuid NOT NULL,
	"participant_id" uuid NOT NULL,
	"is_group_leader" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "message_templates" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" text NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"group_id" uuid,
	"participant_id" uuid,
	"content" text NOT NULL,
	"attachment_urls" jsonb,
	"message_template_id" uuid,
	"sent_at" timestamp DEFAULT now() NOT NULL,
	"delivery_method" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notifications" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"recipient_id" uuid,
	"notification_type" text NOT NULL,
	"message_content" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"scheduled_at" timestamp,
	"read_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "participants" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"signup_sheet_id" uuid NOT NULL,
	"participant_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"time_zone" text,
	"profile_pic_url" text,
	"preferred_method_of_contact" text,
	"participant_role" text DEFAULT 'attendee' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "signup_sheet_groups" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"org_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"settings" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "signup_sheet_responses" DROP CONSTRAINT "signup_sheet_responses_user_id_user_profiles_user_id_fk";
--> statement-breakpoint
ALTER TABLE "signup_sheet_custom_questions" ALTER COLUMN "is_required" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheet_custom_questions" ALTER COLUMN "order" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheet_custom_questions" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheet_responses" ALTER COLUMN "responder_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheet_responses" ALTER COLUMN "responder_email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheet_responses" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheet_slots" ALTER COLUMN "quantity" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheet_slots" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheet_slots" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheets" ALTER COLUMN "is_published" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheets" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheets" ALTER COLUMN "updated_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheet_custom_questions" ADD COLUMN "validation_rules" jsonb;--> statement-breakpoint
ALTER TABLE "signup_sheet_custom_questions" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheet_responses" ADD COLUMN "participant_id" uuid;--> statement-breakpoint
ALTER TABLE "signup_sheet_responses" ADD COLUMN "waitlist_status" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheet_responses" ADD COLUMN "preferred_contact_method" text;--> statement-breakpoint
ALTER TABLE "signup_sheet_responses" ADD COLUMN "last_updated_by" uuid;--> statement-breakpoint
ALTER TABLE "signup_sheet_responses" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheet_slots" ADD COLUMN "group_id" uuid;--> statement-breakpoint
ALTER TABLE "signup_sheet_slots" ADD COLUMN "start_timestamp" timestamp;--> statement-breakpoint
ALTER TABLE "signup_sheet_slots" ADD COLUMN "end_timestamp" timestamp;--> statement-breakpoint
ALTER TABLE "signup_sheet_slots" ADD COLUMN "filled_quantity" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheet_slots" ADD COLUMN "hide_number_wanted" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheet_slots" ADD COLUMN "collect_money" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheet_slots" ADD COLUMN "price" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "signup_sheet_slots" ADD COLUMN "currency" text DEFAULT 'USD';--> statement-breakpoint
ALTER TABLE "signup_sheet_slots" ADD COLUMN "waitlist_capacity" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheets" ADD COLUMN "group_id" uuid;--> statement-breakpoint
ALTER TABLE "signup_sheets" ADD COLUMN "start_date" date;--> statement-breakpoint
ALTER TABLE "signup_sheets" ADD COLUMN "end_date" date;--> statement-breakpoint
ALTER TABLE "signup_sheets" ADD COLUMN "attachment_urls" jsonb;--> statement-breakpoint
ALTER TABLE "signup_sheets" ADD COLUMN "is_archived" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "signup_sheets" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_members" ADD CONSTRAINT "group_members_group_id_signup_sheet_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."signup_sheet_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "group_members" ADD CONSTRAINT "group_members_participant_id_participants_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."participants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_group_id_signup_sheet_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."signup_sheet_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_participant_id_participants_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."participants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_message_template_id_message_templates_id_fk" FOREIGN KEY ("message_template_id") REFERENCES "public"."message_templates"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notifications" ADD CONSTRAINT "notifications_recipient_id_participants_id_fk" FOREIGN KEY ("recipient_id") REFERENCES "public"."participants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "participants" ADD CONSTRAINT "participants_signup_sheet_id_signup_sheets_id_fk" FOREIGN KEY ("signup_sheet_id") REFERENCES "public"."signup_sheets"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "signup_sheet_groups" ADD CONSTRAINT "signup_sheet_groups_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "signup_sheet_responses" ADD CONSTRAINT "signup_sheet_responses_participant_id_participants_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."participants"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "signup_sheet_responses" ADD CONSTRAINT "signup_sheet_responses_last_updated_by_user_profiles_id_fk" FOREIGN KEY ("last_updated_by") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "signup_sheet_slots" ADD CONSTRAINT "signup_sheet_slots_group_id_signup_sheet_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."signup_sheet_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "signup_sheets" ADD CONSTRAINT "signup_sheets_group_id_signup_sheet_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."signup_sheet_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "signup_sheet_responses" DROP COLUMN IF EXISTS "user_id";--> statement-breakpoint
ALTER TABLE "signup_sheet_slots" DROP COLUMN IF EXISTS "date";--> statement-breakpoint
ALTER TABLE "signup_sheet_slots" DROP COLUMN IF EXISTS "start_time";--> statement-breakpoint
ALTER TABLE "signup_sheet_slots" DROP COLUMN IF EXISTS "end_time";--> statement-breakpoint
ALTER TABLE "signup_sheets" ADD CONSTRAINT "signup_sheets_slug_unique" UNIQUE("slug");