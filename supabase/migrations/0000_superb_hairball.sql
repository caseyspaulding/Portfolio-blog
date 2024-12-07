CREATE TABLE IF NOT EXISTS "authors" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"name" varchar(100) NOT NULL,
	"bio" text,
	"avatar_url" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "authors_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar(255) NOT NULL,
	"title" text NOT NULL,
	"content" text NOT NULL,
	"excerpt" text,
	"author_id" serial NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp,
	"tags" text,
	"featured_image" varchar(255),
	"meta_title" varchar(255),
	"meta_description" text,
	"is_published" boolean DEFAULT false,
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "feedback" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject" varchar(255) NOT NULL,
	"category" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"attachment_url" varchar(255),
	"user_id" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "form_fields" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"form_id" uuid NOT NULL,
	"field_name" text NOT NULL,
	"placeholder" text,
	"field_type" text NOT NULL,
	"options" jsonb,
	"is_required" boolean DEFAULT false,
	"order" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "form_response_details" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"form_response_id" uuid NOT NULL,
	"form_field_id" uuid NOT NULL,
	"field_value" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "form_responses" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"form_id" uuid NOT NULL,
	"org_id" uuid NOT NULL,
	"responder_id" uuid,
	"response_data" jsonb NOT NULL,
	"submitted_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forms" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"org_id" uuid NOT NULL,
	"form_name" text NOT NULL,
	"creator_id" uuid NOT NULL,
	"description" text,
	"status" text DEFAULT 'active',
	"is_archived" boolean DEFAULT false,
	"is_deleted" boolean DEFAULT false,
	"is_draft" boolean DEFAULT false,
	"header_media_url" text,
	"header_media_type" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_invites" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"org_id" uuid NOT NULL,
	"email" text NOT NULL,
	"status" text NOT NULL,
	"inviter_id" uuid,
	"expires_at" timestamp,
	"token" text NOT NULL,
	"role" text,
	"accepted_at" timestamp,
	"is_resent" boolean DEFAULT false,
	"is_revoked" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "org_invites_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "org_members" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"org_id" uuid NOT NULL,
	"tags" jsonb,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"role" text NOT NULL,
	"is_active" boolean DEFAULT true,
	"last_login" timestamp,
	"department" text,
	"permissions" jsonb,
	"joined_date" date NOT NULL,
	"profile_image_url" text,
	"phone_number" text,
	"is_verified" boolean DEFAULT false,
	"is_admin" boolean DEFAULT false,
	"departed_at" timestamp,
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "org_members_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organizations" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" text NOT NULL,
	"contact_phone" text,
	"website" text,
	"address" text,
	"city" text,
	"state" text,
	"country" text,
	"zip_code" text,
	"logo_url" text,
	"industry" text,
	"org_type" text,
	"founded_date" date,
	"number_of_employees" integer,
	"annual_revenue" numeric(15, 2),
	"social_media_links" jsonb,
	"affiliated_organizations" jsonb,
	"is_verified" boolean DEFAULT false,
	"subscription_status" text,
	"last_activity" timestamp,
	"status" text DEFAULT 'active',
	"stripe_account_id" varchar,
	"stripe_connect_linked" boolean,
	"stripe_account_created" timestamp,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "organizations_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_profiles" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"user_id" uuid NOT NULL,
	"org_id" uuid NOT NULL,
	"first_name" text,
	"last_name" text,
	"profile_image_url" text,
	"organization_name" text NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"contact_number" text,
	"bio" text,
	"social_links" jsonb,
	"is_active" boolean DEFAULT true,
	"last_login" timestamp,
	"permissions" jsonb,
	"preferences" jsonb,
	"department" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "form_fields" ADD CONSTRAINT "form_fields_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "form_response_details" ADD CONSTRAINT "form_response_details_form_response_id_form_responses_id_fk" FOREIGN KEY ("form_response_id") REFERENCES "public"."form_responses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "form_response_details" ADD CONSTRAINT "form_response_details_form_field_id_form_fields_id_fk" FOREIGN KEY ("form_field_id") REFERENCES "public"."form_fields"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "form_responses" ADD CONSTRAINT "form_responses_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "form_responses" ADD CONSTRAINT "form_responses_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forms" ADD CONSTRAINT "forms_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forms" ADD CONSTRAINT "forms_creator_id_user_profiles_user_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."user_profiles"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_invites" ADD CONSTRAINT "org_invites_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_invites" ADD CONSTRAINT "org_invites_inviter_id_user_profiles_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "public"."user_profiles"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "org_members" ADD CONSTRAINT "org_members_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_profiles_user_id_unique" ON "user_profiles" USING btree ("user_id");