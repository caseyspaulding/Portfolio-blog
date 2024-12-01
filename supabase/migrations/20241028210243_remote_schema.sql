

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "drizzle";


ALTER SCHEMA "drizzle" OWNER TO "postgres";


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE OR REPLACE FUNCTION "public"."custom_access_token_hook"("event" "jsonb") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    AS $$DECLARE
  claims JSONB;
  user_org_id UUID;
  user_role TEXT;
  organization_name TEXT;
BEGIN
  -- Fetch the user's organization ID, role, and organization name
  SELECT org_id, role, organization_name INTO user_org_id, user_role, organization_name
  FROM public.user_profiles
  WHERE user_id = (event->>'user_id')::UUID;

  -- Initialize claims to an empty JSONB object if not already present
  claims := COALESCE(event->'claims', '{}'::JSONB);

  -- Add org_id to the JWT claims
  IF user_org_id IS NOT NULL THEN
    claims := jsonb_set(claims, '{org_id}', to_jsonb(user_org_id::TEXT), true);
  END IF;

  -- Add role to the JWT claims
  IF user_role IS NOT NULL THEN
    claims := jsonb_set(claims, '{role}', to_jsonb(user_role), true);
  END IF;

  -- Add organization_name to the JWT claims
  IF organization_name IS NOT NULL THEN
    claims := jsonb_set(claims, '{organization_name}', to_jsonb(organization_name), true);
  END IF;

  -- Return the updated event with modified claims
  RETURN jsonb_set(event, '{claims}', claims, true);
END;$$;


ALTER FUNCTION "public"."custom_access_token_hook"("event" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."custom_claims"() RETURNS "json"
    LANGUAGE "plpgsql"
    AS $$DECLARE
  claims JSON;
  user_org_id UUID;
  user_role TEXT;
BEGIN
  -- Fetch the user's organization ID and role from your user_profiles table
  SELECT org_id, role INTO user_org_id, user_role
  FROM public.user_profiles
  WHERE user_id = (event->>'user_id')::UUID;

  -- Initialize claims to an empty JSON object if not already present
  claims := COALESCE(event->'claims', '{}'::JSON);

  -- Add org_id to the JWT claims
  IF user_org_id IS NOT NULL THEN
    claims := json_set(claims, '{org_id}', to_json(user_org_id::TEXT), true);
  END IF;

  -- Add role to the JWT claims
  IF user_role IS NOT NULL THEN
    claims := json_set(claims, '{role}', to_json(user_role), true);
  END IF;

  -- Return the updated event with modified claims
  RETURN json_set(event, '{claims}', claims, true);
END;$$;


ALTER FUNCTION "public"."custom_claims"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."custom_claims_hook"("claims" "jsonb", "user_org_id" "uuid", "user_role" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    AS $$DECLARE
  claims JSONB;
  user_org_id UUID;
  user_role TEXT;
BEGIN
  -- Fetch the user's organization ID and role from your user_profiles table
  SELECT org_id, role INTO user_org_id, user_role
  FROM public.user_profiles
  WHERE user_id = (event->>'user_id')::UUID;

  -- Initialize claims to an empty JSONB object if not already present
  claims := COALESCE(event->'claims', '{}'::JSONB);

  -- Add org_id to the JWT claims
  IF user_org_id IS NOT NULL THEN
    claims := jsonb_set(claims, '{org_id}', to_jsonb(user_org_id::TEXT), true);
  END IF;

  -- Add role to the JWT claims
  IF user_role IS NOT NULL THEN
    claims := jsonb_set(claims, '{role}', to_jsonb(user_role), true);
  END IF;

  -- Return the updated event with modified claims
  RETURN jsonb_set(event, '{claims}', claims, true);
END;$$;


ALTER FUNCTION "public"."custom_claims_hook"("claims" "jsonb", "user_org_id" "uuid", "user_role" "text") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "drizzle"."__drizzle_migrations" (
    "id" integer NOT NULL,
    "hash" "text" NOT NULL,
    "created_at" bigint
);


ALTER TABLE "drizzle"."__drizzle_migrations" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "drizzle"."__drizzle_migrations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "drizzle"."__drizzle_migrations_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "drizzle"."__drizzle_migrations_id_seq" OWNED BY "drizzle"."__drizzle_migrations"."id";



CREATE TABLE IF NOT EXISTS "public"."agenda" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "event_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "start_time" timestamp without time zone,
    "end_time" timestamp without time zone,
    "description" "text",
    "host_or_artist" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."agenda" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."attendees" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "status" "text" DEFAULT 'registered'::"text",
    "check_in_time" timestamp without time zone,
    "notes" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."attendees" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."audience_segments" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "criteria" "jsonb" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."audience_segments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."authors" (
    "id" integer NOT NULL,
    "slug" character varying(255) NOT NULL,
    "name" character varying(100) NOT NULL,
    "bio" "text",
    "avatar_url" character varying(255),
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."authors" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."authors_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."authors_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."authors_id_seq" OWNED BY "public"."authors"."id";



CREATE TABLE IF NOT EXISTS "public"."blog_posts" (
    "id" integer NOT NULL,
    "slug" character varying(255) NOT NULL,
    "title" "text" NOT NULL,
    "content" "text" NOT NULL,
    "excerpt" "text",
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "published_at" timestamp without time zone,
    "tags" "text",
    "featured_image" character varying(255),
    "meta_title" character varying(255),
    "meta_description" "text",
    "is_published" boolean DEFAULT false,
    "author_id" integer NOT NULL
);


ALTER TABLE "public"."blog_posts" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."blog_posts_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."blog_posts_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."blog_posts_id_seq" OWNED BY "public"."blog_posts"."id";



CREATE TABLE IF NOT EXISTS "public"."cal_event_attendees" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "event_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "status" "text" DEFAULT 'confirmed'::"text",
    "response_date" timestamp without time zone,
    "notes" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."cal_event_attendees" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."calendar_event_reminders" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "event_id" "uuid" NOT NULL,
    "remind_at" timestamp without time zone NOT NULL,
    "reminder_type" "text" DEFAULT 'email'::"text",
    "message" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."calendar_event_reminders" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."calendar_events" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "calendar_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "start_date" timestamp without time zone NOT NULL,
    "end_date" timestamp without time zone,
    "all_day" boolean DEFAULT false,
    "location" "text",
    "event_type" "text" DEFAULT 'general'::"text",
    "organizer_id" "uuid",
    "is_recurring" boolean DEFAULT false,
    "recurrence_rule" "text",
    "status" "text" DEFAULT 'confirmed'::"text",
    "notification_settings" "jsonb",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."calendar_events" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."calendar_tasks" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "calendar_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "due_date" timestamp without time zone,
    "is_completed" boolean DEFAULT false,
    "priority" "text" DEFAULT 'medium'::"text",
    "assigned_to" "uuid",
    "status" "text" DEFAULT 'open'::"text",
    "tags" "text"[],
    "notification_settings" "jsonb",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."calendar_tasks" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."calendars" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid",
    "user_id" "uuid",
    "name" "text" NOT NULL,
    "description" "text",
    "color" character varying(7),
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."calendars" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."communication_logs" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "contact_id" "uuid" NOT NULL,
    "contact_type" "text" NOT NULL,
    "event_id" "uuid",
    "communication_type" "text" NOT NULL,
    "subject" "text",
    "content" "text",
    "date" timestamp without time zone DEFAULT "now"(),
    "follow_up_needed" boolean DEFAULT false,
    "follow_up_date" timestamp without time zone,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."communication_logs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."customer_feedback" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "customer_id" "uuid" NOT NULL,
    "event_id" "uuid",
    "session_id" "uuid",
    "rating" integer DEFAULT 0,
    "feedback" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."customer_feedback" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."customer_interactions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "customer_id" "uuid" NOT NULL,
    "org_id" "uuid" NOT NULL,
    "interaction_type" "text" NOT NULL,
    "interaction_date" timestamp without time zone DEFAULT "now"() NOT NULL,
    "notes" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."customer_interactions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."donors" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text",
    "donation_amount" numeric(10,2),
    "donation_date" timestamp without time zone DEFAULT "now"(),
    "donation_type" "text",
    "status" "text" DEFAULT 'active'::"text",
    "notes" "text",
    "acknowledgment_sent" boolean DEFAULT false,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."donors" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."email_campaigns" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "subject" "text" NOT NULL,
    "body" "text" NOT NULL,
    "segment_id" "uuid",
    "scheduled_at" timestamp without time zone,
    "sent_at" timestamp without time zone,
    "status" "text" DEFAULT 'draft'::"text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."email_campaigns" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."email_recipients" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "campaign_id" "uuid" NOT NULL,
    "customer_id" "uuid" NOT NULL,
    "sent_at" timestamp without time zone,
    "opened_at" timestamp without time zone,
    "clicked_at" timestamp without time zone,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."email_recipients" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."email_templates" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "subject" "text" NOT NULL,
    "body" "text" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."email_templates" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_locations" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "event_id" "uuid" NOT NULL,
    "name" "text",
    "address" "text",
    "city" "text",
    "state" "text",
    "country" "text",
    "zip_code" "text",
    "latitude" double precision,
    "longitude" double precision,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."event_locations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_media" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL,
    "type" "text" NOT NULL,
    "url" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."event_media" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_schedules" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "customer_id" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL,
    "session_id" "uuid" NOT NULL,
    "notes" "text",
    "title" "text" NOT NULL,
    "description" "text",
    "start_time" timestamp without time zone,
    "end_time" timestamp without time zone,
    "speaker" "text",
    "location" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."event_schedules" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_sections" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "content" "text" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."event_sections" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_sessions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "event_id" "uuid" NOT NULL,
    "performer_id" "uuid",
    "name" "text" NOT NULL,
    "description" "text",
    "session_date" "date" NOT NULL,
    "start_time" timestamp without time zone NOT NULL,
    "end_time" timestamp without time zone NOT NULL,
    "latitude" double precision,
    "longitude" double precision,
    "location" "text",
    "type" "text",
    "capacity" integer,
    "is_free" boolean DEFAULT true,
    "speaker_id" "uuid",
    "resources" "text"[],
    "tags" "text"[],
    "status" "text" DEFAULT 'scheduled'::"text" NOT NULL,
    "recording_url" "text",
    "notes" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."event_sessions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_speakers" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "event_id" "uuid",
    "name" "text" NOT NULL,
    "title" "text",
    "email" "text" NOT NULL,
    "phone" "text",
    "profile_image_url" "text",
    "bio" "text",
    "talk_title" "text",
    "talk_description" "text",
    "talk_time" timestamp without time zone,
    "status" "text" DEFAULT 'confirmed'::"text",
    "contract_details" "jsonb",
    "social_links" "jsonb",
    "contact_frequency" "text" DEFAULT 'monthly'::"text",
    "last_contacted" timestamp without time zone,
    "next_follow_up" timestamp without time zone,
    "email_group" "text",
    "notes" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"(),
    "tags" "jsonb"
);


ALTER TABLE "public"."event_speakers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."event_tags" (
    "event_id" "uuid" NOT NULL,
    "tag_id" "uuid" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."event_tags" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."events" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "featured_image" character varying(255),
    "slug" "text" NOT NULL,
    "description" "text",
    "start_date" "date" NOT NULL,
    "end_date" "date" NOT NULL,
    "venue" "text",
    "address" "text",
    "city" "text",
    "state" "text",
    "country" "text",
    "zip_code" "text",
    "schedule_details" "text",
    "banner_image" character varying(255),
    "gallery_images" "jsonb" DEFAULT '[]'::"jsonb",
    "video_links" "text"[],
    "organizer_contact" character varying(255),
    "max_attendees" integer,
    "status" "text" DEFAULT 'draft'::"text" NOT NULL,
    "refund_policy" "text",
    "timezone" character varying(50),
    "tags" "text"[],
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"(),
    "highlights" "text"[],
    "faqs" "jsonb",
    "age_restriction" "text",
    "parking_options" "text",
    "notes" "text",
    "event_start_time" time without time zone,
    "event_end_time" time without time zone,
    "venue_description" "text",
    "venue_image" character varying(255),
    "latitude" numeric(9,6),
    "longitude" numeric(9,6),
    "featured_image_gallary" "text"[]
);


ALTER TABLE "public"."events" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."favorite_events" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."favorite_events" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."favorite_performers" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "visitor_id" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL,
    "performer_id" "uuid" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."favorite_performers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."favorite_sessions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "visitor_id" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL,
    "session_id" "uuid" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."favorite_sessions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."feedback_surveys" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL,
    "respondent_type" "text" NOT NULL,
    "respondent_id" "uuid" NOT NULL,
    "survey_data" "jsonb",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."feedback_surveys" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."festival_map_locations" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "type" "text" NOT NULL,
    "coordinates" "jsonb" NOT NULL,
    "description" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."festival_map_locations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."form_fields" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "form_id" "uuid" NOT NULL,
    "field_name" "text" NOT NULL,
    "field_type" "text" NOT NULL,
    "options" "jsonb",
    "is_required" boolean DEFAULT false,
    "order" integer NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "placeholder" "text"
);


ALTER TABLE "public"."form_fields" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."form_response_details" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "form_response_id" "uuid" NOT NULL,
    "form_field_id" "uuid" NOT NULL,
    "field_value" "jsonb" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."form_response_details" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."form_responses" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "form_id" "uuid" NOT NULL,
    "org_id" "uuid" NOT NULL,
    "responder_id" "uuid",
    "response_data" "jsonb" NOT NULL,
    "submitted_at" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."form_responses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."forms" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "form_name" "text" NOT NULL,
    "description" "text",
    "status" "text" DEFAULT 'active'::"text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"(),
    "is_archived" boolean DEFAULT false,
    "is_deleted" boolean DEFAULT false,
    "is_draft" boolean DEFAULT false,
    "header_media_url" "text",
    "header_media_type" "text",
    "creator_id" "uuid" NOT NULL
);


ALTER TABLE "public"."forms" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."grant_reminders" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "grant_id" "uuid" NOT NULL,
    "reminder_date" timestamp without time zone NOT NULL,
    "message" "text" NOT NULL,
    "email_sent" boolean DEFAULT false,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."grant_reminders" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."grant_reports" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "grant_id" "uuid" NOT NULL,
    "report_date" timestamp without time zone DEFAULT "now"() NOT NULL,
    "report_details" "text",
    "attachments" "jsonb",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."grant_reports" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."grant_reviews" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "grant_id" "uuid" NOT NULL,
    "reviewer_id" "uuid" NOT NULL,
    "review_date" timestamp without time zone DEFAULT "now"() NOT NULL,
    "comments" "text",
    "rating" integer,
    "status_change" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."grant_reviews" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."grant_touchpoints" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "grant_id" "uuid" NOT NULL,
    "contact_person" "text",
    "date" timestamp without time zone NOT NULL,
    "notes" "text",
    "next_touchpoint_date" timestamp without time zone,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."grant_touchpoints" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."grants" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "grant_name" "text" NOT NULL,
    "applicant_organization" "text" NOT NULL,
    "application_date" timestamp without time zone NOT NULL,
    "status" "text" DEFAULT 'submitted'::"text" NOT NULL,
    "amount_requested" numeric(15,2),
    "amount_approved" numeric(15,2),
    "deadline" timestamp without time zone NOT NULL,
    "deliverables" "text",
    "notes" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."grants" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."group_members" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "group_id" "uuid" NOT NULL,
    "participant_id" "uuid" NOT NULL,
    "is_group_leader" boolean DEFAULT false NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."group_members" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."guilds" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "org_id" "uuid" NOT NULL,
    "event_id" "uuid",
    "description" "text",
    "leader_name" "text",
    "leader_contact" "text",
    "leader_email" "text",
    "guild_type" "text",
    "website" "text",
    "profile_image_url" "text",
    "status" "text" DEFAULT 'confirmed'::"text",
    "contract_details" "jsonb",
    "contact_frequency" "text" DEFAULT 'monthly'::"text",
    "last_contacted" timestamp without time zone,
    "next_follow_up" timestamp without time zone,
    "email_group" "text",
    "notes" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"(),
    "tags" "jsonb"
);


ALTER TABLE "public"."guilds" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."kanban_boards" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "created_by" "uuid" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."kanban_boards" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."kanban_card_activities" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "card_id" "uuid" NOT NULL,
    "activity_type" "text" NOT NULL,
    "description" "text",
    "performed_by" "uuid" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."kanban_card_activities" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."kanban_card_comments" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "card_id" "uuid" NOT NULL,
    "comment" "text" NOT NULL,
    "created_by" "uuid" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."kanban_card_comments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."kanban_cards" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "column_id" "uuid" NOT NULL,
    "board_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "assigned_to" "uuid",
    "due_date" timestamp without time zone,
    "position" integer NOT NULL,
    "priority" "text" DEFAULT 'medium'::"text",
    "status" "text" DEFAULT 'open'::"text",
    "tags" "text"[],
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."kanban_cards" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."kanban_columns" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "board_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "position" integer NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."kanban_columns" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."leads" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text",
    "stage_id" "uuid",
    "status" "text" DEFAULT 'new'::"text",
    "notes" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."leads" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."message_templates" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "content" "text" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."message_templates" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."messages" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "group_id" "uuid",
    "participant_id" "uuid",
    "content" "text" NOT NULL,
    "attachment_urls" "jsonb",
    "message_template_id" "uuid",
    "sent_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "delivery_method" "text" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."messages" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."notifications" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "recipient_id" "uuid",
    "notification_type" "text" NOT NULL,
    "message_content" "text" NOT NULL,
    "status" "text" DEFAULT 'pending'::"text" NOT NULL,
    "scheduled_at" timestamp without time zone,
    "read_at" timestamp without time zone,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."notifications" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."org_customers" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text",
    "address" "text",
    "city" "text",
    "state" "text",
    "country" "text",
    "zip_code" "text",
    "profile_image_url" "text",
    "status" "text" DEFAULT 'active'::"text",
    "metadata" "jsonb",
    "notes" "text",
    "favorite_event_id" "uuid",
    "favorite_performer_id" "uuid",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"(),
    "first_name" "text",
    "last_name" "text"
);


ALTER TABLE "public"."org_customers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."org_event_attendance" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "customer_id" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL,
    "org_id" "uuid" NOT NULL,
    "ticket_id" "uuid",
    "check_in_method" "text",
    "checked_in_by" "uuid",
    "attendance_status" "text" DEFAULT 'attended'::"text",
    "duration" integer,
    "feedback_score" integer,
    "additional_notes" "text",
    "attended_at" timestamp without time zone DEFAULT "now"(),
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."org_event_attendance" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."org_event_tickets" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "event_id" "uuid" NOT NULL,
    "org_id" "uuid" NOT NULL,
    "customer_id" "uuid",
    "ticket_type_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "price" numeric(10,2) NOT NULL,
    "currency" "text" NOT NULL,
    "status" "text" DEFAULT 'available'::"text" NOT NULL,
    "valid_from" "date",
    "valid_until" "date",
    "barcode" "text",
    "qr_code" "text",
    "purchase_date" timestamp without time zone,
    "sales_channel" "text",
    "promotion_code" "text",
    "promotion_name" "text",
    "discount_amount" numeric(10,2),
    "final_price" numeric(10,2),
    "seat_number" "text",
    "is_refunded" boolean DEFAULT false,
    "refund_date" timestamp without time zone,
    "check_in_status" boolean DEFAULT false,
    "notes" "text",
    "is_vip" boolean DEFAULT false,
    "access_level" "text",
    "transferred_to_user_id" "uuid",
    "transfer_date" timestamp without time zone,
    "is_transferred" boolean DEFAULT false,
    "loyalty_points_earned" numeric(10,2),
    "loyalty_points_redeemed" numeric(10,2),
    "is_digital_only" boolean DEFAULT true,
    "physical_ticket_status" "text",
    "insurance_provider" "text",
    "insurance_policy_number" "text",
    "is_insured" boolean DEFAULT false,
    "exchange_rate" numeric(15,6),
    "permissions" "jsonb",
    "sales_channel_details" "jsonb",
    "stripe_session_id" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."org_event_tickets" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."org_invites" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "email" "text" NOT NULL,
    "status" "text" NOT NULL,
    "inviter_id" "uuid",
    "expires_at" timestamp without time zone,
    "token" "text" NOT NULL,
    "role" "text",
    "accepted_at" timestamp without time zone,
    "is_resent" boolean DEFAULT false,
    "is_revoked" boolean DEFAULT false,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."org_invites" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."org_members" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "event_id" "uuid",
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "role" "text" NOT NULL,
    "is_active" boolean DEFAULT true,
    "last_login" timestamp without time zone,
    "department" "text",
    "permissions" "jsonb",
    "joined_date" "date" NOT NULL,
    "profile_image_url" "text",
    "phone_number" "text",
    "is_verified" boolean DEFAULT false,
    "is_admin" boolean DEFAULT false,
    "departed_at" timestamp without time zone,
    "notes" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"(),
    "tags" "jsonb"
);


ALTER TABLE "public"."org_members" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."org_payments" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "stripe_account_id" "text" NOT NULL,
    "account_type" "text" DEFAULT 'standard'::"text" NOT NULL,
    "total_payouts" numeric(15,2) DEFAULT 0,
    "last_payout_date" timestamp without time zone,
    "pending_balance" numeric(15,2) DEFAULT 0,
    "available_balance" numeric(15,2) DEFAULT 0,
    "last_transaction_date" timestamp without time zone,
    "total_fees_paid" numeric(15,2) DEFAULT 0,
    "status" "text" DEFAULT 'active'::"text" NOT NULL,
    "country" "text",
    "notes" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."org_payments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."org_performers" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "event_id" "uuid",
    "name" "text" NOT NULL,
    "stage_name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text",
    "profile_image_url" "text",
    "genre" "text",
    "performance_time" timestamp without time zone,
    "status" "text" DEFAULT 'confirmed'::"text",
    "contract_details" "jsonb",
    "social_links" "jsonb",
    "contact_frequency" "text" DEFAULT 'monthly'::"text",
    "last_contacted" timestamp without time zone,
    "next_follow_up" timestamp without time zone,
    "email_group" "text",
    "notes" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"(),
    "tags" "jsonb"
);


ALTER TABLE "public"."org_performers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."org_referral_programs" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "reward" "text" NOT NULL,
    "status" "text" DEFAULT 'active'::"text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."org_referral_programs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."org_ticket_types" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "event_id" "uuid" NOT NULL,
    "org_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "price" numeric(10,2) NOT NULL,
    "quantity" integer NOT NULL,
    "event_date" "date" NOT NULL,
    "sale_start_date" "date" NOT NULL,
    "sale_end_date" "date" NOT NULL,
    "is_early_bird" boolean DEFAULT false,
    "max_per_customer" integer,
    "is_free" boolean DEFAULT false,
    "category" "text",
    "promo_code_required" boolean DEFAULT false,
    "available_online" boolean DEFAULT true,
    "group_discount_available" boolean DEFAULT false,
    "refundable" boolean DEFAULT true,
    "currency" "text" DEFAULT 'USD'::"text",
    "sales_limit_per_day" integer DEFAULT 0,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"(),
    "gate_open_time" time without time zone,
    "event_start_time" time without time zone,
    "event_end_time" time without time zone
);


ALTER TABLE "public"."org_ticket_types" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."org_transaction_items" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "order_id" "uuid" NOT NULL,
    "ticket_id" "uuid" NOT NULL,
    "quantity" numeric NOT NULL,
    "unit_price" numeric(10,2) NOT NULL,
    "discount_amount" numeric(10,2) DEFAULT 0,
    "tax_amount" numeric(10,2) DEFAULT 0,
    "total_price" numeric(10,2) NOT NULL,
    "transaction_source" "text" DEFAULT 'online'::"text" NOT NULL,
    "item_type" "text" DEFAULT 'ticket'::"text" NOT NULL,
    "promotion_code_used" "text",
    "is_refundable" boolean DEFAULT true,
    "currency" "text" DEFAULT 'USD'::"text" NOT NULL,
    "notes" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."org_transaction_items" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."org_transactions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "customer_id" "uuid" NOT NULL,
    "org_id" "uuid" NOT NULL,
    "description" "text",
    "payment_method" "text",
    "stripe_fee_amount" numeric(10,2) NOT NULL,
    "application_fee_amount" numeric(10,2) DEFAULT 0.50 NOT NULL,
    "net_amount" numeric(10,2),
    "metadata" "jsonb",
    "invoice_id" "text",
    "related_entity_id" "uuid",
    "refund_status" "text",
    "stripe_payment_id" "text",
    "total_amount" numeric(10,2) NOT NULL,
    "currency" "text",
    "transaction_type" "text" NOT NULL,
    "status" "text",
    "stripe_connect_account_id" "text",
    "stripe_transfer_amount" numeric(10,2),
    "stripe_transfer_status" "text",
    "stripe_transfer_id" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."org_transactions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."org_vendors" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "event_id" "uuid",
    "name" "text" NOT NULL,
    "business_name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text",
    "address" "text",
    "city" "text",
    "state" "text",
    "country" "text",
    "zip_code" "text",
    "profile_image_url" "text",
    "vendor_type" "text",
    "status" "text" DEFAULT 'active'::"text",
    "contract_details" "jsonb",
    "website" "text",
    "contact_frequency" "text" DEFAULT 'monthly'::"text",
    "last_contacted" timestamp without time zone,
    "next_follow_up" timestamp without time zone,
    "email_group" "text",
    "notes" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"(),
    "tags" "jsonb"
);


ALTER TABLE "public"."org_vendors" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."organizations" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "contact_phone" "text",
    "website" "text",
    "address" "text",
    "city" "text",
    "state" "text",
    "country" "text",
    "zip_code" "text",
    "logo_url" "text",
    "industry" "text",
    "org_type" "text",
    "founded_date" "date",
    "number_of_employees" integer,
    "annual_revenue" numeric(15,2),
    "social_media_links" "jsonb",
    "affiliated_organizations" "jsonb",
    "is_verified" boolean DEFAULT false,
    "subscription_status" "text",
    "last_activity" timestamp without time zone,
    "status" "text" DEFAULT 'active'::"text",
    "stripe_account_id" character varying,
    "stripe_connect_linked" boolean,
    "stripe_account_created" timestamp without time zone,
    "updated_at" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    "metadata" "jsonb",
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."organizations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."participant_events" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "participant_id" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL,
    "event_role" "text",
    "status" "text" DEFAULT 'confirmed'::"text",
    "created_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."participant_events" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."participants" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "signup_sheet_id" "uuid" NOT NULL,
    "participant_name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text",
    "time_zone" "text",
    "profile_pic_url" "text",
    "preferred_method_of_contact" "text",
    "participant_role" "text" DEFAULT 'attendee'::"text" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."participants" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."payments_invoices" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "contact_id" "uuid" NOT NULL,
    "contact_type" "text" NOT NULL,
    "event_id" "uuid",
    "invoice_number" "text" NOT NULL,
    "amount" numeric(10,2) NOT NULL,
    "currency" "text" DEFAULT 'USD'::"text",
    "payment_status" "text" DEFAULT 'unpaid'::"text",
    "due_date" timestamp without time zone,
    "paid_date" timestamp without time zone,
    "notes" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."payments_invoices" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."performers" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text",
    "genre" "text",
    "performance_time" timestamp without time zone,
    "status" "text" DEFAULT 'confirmed'::"text",
    "contract_details" "jsonb",
    "requirements" "text",
    "notes" "text",
    "social_links" "jsonb",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."performers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."recurring_event_instances" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "event_id" "uuid" NOT NULL,
    "occurrence_date" timestamp without time zone NOT NULL,
    "status" "text" DEFAULT 'confirmed'::"text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."recurring_event_instances" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."sales_pipelines" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."sales_pipelines" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."sales_stages" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "pipeline_id" "uuid" NOT NULL,
    "stage_name" "text" NOT NULL,
    "probability" integer,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."sales_stages" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."signup_sheet_custom_questions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "signup_sheet_id" "uuid" NOT NULL,
    "question_text" "text" NOT NULL,
    "field_type" "text" NOT NULL,
    "options" "jsonb",
    "is_required" boolean DEFAULT false NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "validation_rules" "jsonb",
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."signup_sheet_custom_questions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."signup_sheet_groups" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "settings" "jsonb",
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."signup_sheet_groups" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."signup_sheet_responses" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "signup_sheet_id" "uuid" NOT NULL,
    "slot_id" "uuid" NOT NULL,
    "responder_name" "text",
    "responder_email" "text",
    "response_data" "jsonb",
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "participant_id" "uuid",
    "waitlist_status" boolean DEFAULT false NOT NULL,
    "preferred_contact_method" "text",
    "last_updated_by" "uuid",
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."signup_sheet_responses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."signup_sheet_slots" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "signup_sheet_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "quantity" integer DEFAULT 1 NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "group_id" "uuid",
    "start_timestamp" timestamp without time zone,
    "end_timestamp" timestamp without time zone,
    "filled_quantity" integer DEFAULT 0 NOT NULL,
    "hide_number_wanted" boolean DEFAULT false NOT NULL,
    "collect_money" boolean DEFAULT false NOT NULL,
    "price" numeric(10,2),
    "currency" "text" DEFAULT 'USD'::"text",
    "waitlist_capacity" integer DEFAULT 0 NOT NULL
);


ALTER TABLE "public"."signup_sheet_slots" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."signup_sheets" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "creator_id" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "event_id" "uuid",
    "is_published" boolean DEFAULT false NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "group_id" "uuid",
    "start_date" "date",
    "end_date" "date",
    "attachment_urls" "jsonb",
    "is_archived" boolean DEFAULT false NOT NULL,
    "slug" "text" NOT NULL
);


ALTER TABLE "public"."signup_sheets" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."sponsors" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "contact_name" "text",
    "contact_email" "text",
    "contact_phone" "text",
    "sponsorship_level" "text",
    "contribution" numeric(10,2),
    "benefits" "text",
    "status" "text" DEFAULT 'active'::"text",
    "notes" "text",
    "contract_details" "jsonb",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."sponsors" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."stripe_connect_onboarding" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_profile_id" "uuid" NOT NULL,
    "stripe_account_id" "text" NOT NULL,
    "onboarding_status" "text" NOT NULL,
    "onboarding_url" "text",
    "onboarding_started_at" timestamp without time zone DEFAULT "now"(),
    "onboarding_completed_at" timestamp without time zone,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."stripe_connect_onboarding" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."stripe_connect_payouts" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_profile_id" "uuid" NOT NULL,
    "stripe_payout_id" "text" NOT NULL,
    "amount" numeric(10,2) NOT NULL,
    "currency" "text" NOT NULL,
    "status" "text" NOT NULL,
    "payout_method" "text" NOT NULL,
    "arrival_date" timestamp without time zone,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."stripe_connect_payouts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."subscription_products" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "stripe_product_id" "text" NOT NULL,
    "stripe_price_id" "text" NOT NULL,
    "description" "text",
    "price" numeric(10,2) NOT NULL,
    "billing_interval" "text" NOT NULL,
    "trial_period_days" integer DEFAULT 0,
    "is_popular" boolean DEFAULT false,
    "feature_set" "jsonb",
    "target_audience" "text",
    "is_active" boolean DEFAULT true,
    "sales_count" integer DEFAULT 0,
    "promotion_details" "jsonb",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."subscription_products" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."subscriptions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "user_profile_id" "uuid" NOT NULL,
    "product_id" "uuid" NOT NULL,
    "stripe_customer_id" "text" NOT NULL,
    "stripe_subscription_id" "text" NOT NULL,
    "subscription_status" "text" NOT NULL,
    "subscription_start_date" timestamp without time zone NOT NULL,
    "subscription_end_date" timestamp without time zone,
    "is_stripe_connect_account" boolean DEFAULT false,
    "billing_interval" "text" NOT NULL,
    "trial_end_date" timestamp without time zone,
    "cancel_at_period_end" boolean DEFAULT false,
    "cancellation_date" timestamp without time zone,
    "renewal_count" integer DEFAULT 0,
    "revenue_generated" numeric(15,2) DEFAULT 0,
    "last_payment_date" timestamp without time zone,
    "next_billing_date" timestamp without time zone,
    "notes" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."subscriptions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tags" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."tags" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tasks" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "event_id" "uuid",
    "assigned_to" "uuid" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "due_date" timestamp without time zone,
    "status" "text" DEFAULT 'pending'::"text",
    "priority" "text" DEFAULT 'medium'::"text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."tasks" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ticket_analytics" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "ticket_page_id" "uuid" NOT NULL,
    "views" integer DEFAULT 0,
    "clicks" integer DEFAULT 0,
    "purchases" integer DEFAULT 0,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."ticket_analytics" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ticket_buyer_profiles" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "profile_image_url" "text",
    "contact_number" "text",
    "bio" "text",
    "social_links" "jsonb",
    "is_active" boolean DEFAULT true,
    "last_login" timestamp without time zone,
    "preferences" "jsonb",
    "metadata" "jsonb",
    "notes" "text",
    "favorite_event_id" "uuid",
    "favorite_performer_id" "uuid",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"(),
    "stripe_customer_id" "text",
    "stripe_default_currency" "text"
);


ALTER TABLE "public"."ticket_buyer_profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ticket_pages" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "event_id" "uuid" NOT NULL,
    "org_id" "uuid" NOT NULL,
    "url" "text" NOT NULL,
    "page_title" "text" NOT NULL,
    "description" "text",
    "exit_page" boolean DEFAULT false,
    "bounce_rate" numeric(5,2) DEFAULT 0,
    "device_type" "text" DEFAULT 'desktop'::"text",
    "referral_source" "text",
    "average_time_on_page" numeric(5,2) DEFAULT 0,
    "conversion_rate" numeric(5,2) DEFAULT 0,
    "entry_page" boolean DEFAULT false,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."ticket_pages" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_event_reminders" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL,
    "reminder_time" timestamp without time zone NOT NULL,
    "reminder_method" "text" DEFAULT 'email'::"text",
    "is_sent" boolean DEFAULT false,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_event_reminders" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_profiles" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "org_id" "uuid" NOT NULL,
    "profile_image_url" "text",
    "organization_name" "text" NOT NULL,
    "role" "text" DEFAULT 'user'::"text" NOT NULL,
    "contact_number" "text",
    "bio" "text",
    "social_links" "jsonb",
    "is_active" boolean DEFAULT true,
    "last_login" timestamp without time zone,
    "permissions" "jsonb",
    "preferences" "jsonb",
    "department" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."vendors" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "contact_name" "text",
    "contact_email" "text",
    "contact_phone" "text",
    "vendor_type" "text" NOT NULL,
    "booth_location" "text",
    "products_or_services" "text",
    "status" "text" DEFAULT 'active'::"text",
    "contract_details" "jsonb",
    "payment_status" "text" DEFAULT 'pending'::"text",
    "notes" "text",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."vendors" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."visitor_schedules" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "visitor_id" "uuid" NOT NULL,
    "org_id" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL,
    "session_id" "uuid",
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."visitor_schedules" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."volunteers" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "org_id" "uuid" NOT NULL,
    "event_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text",
    "role" "text" NOT NULL,
    "shift" "text",
    "availability" "text",
    "status" "text" DEFAULT 'active'::"text",
    "notes" "text",
    "emergency_contact" "text",
    "tshirt_size" "text",
    "waiver_signed" boolean DEFAULT false,
    "created_at" timestamp without time zone DEFAULT "now"(),
    "updated_at" timestamp without time zone DEFAULT "now"()
);


ALTER TABLE "public"."volunteers" OWNER TO "postgres";


ALTER TABLE ONLY "drizzle"."__drizzle_migrations" ALTER COLUMN "id" SET DEFAULT "nextval"('"drizzle"."__drizzle_migrations_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."authors" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."authors_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."blog_posts" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."blog_posts_id_seq"'::"regclass");



ALTER TABLE ONLY "drizzle"."__drizzle_migrations"
    ADD CONSTRAINT "__drizzle_migrations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."agenda"
    ADD CONSTRAINT "agenda_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."attendees"
    ADD CONSTRAINT "attendees_email_unique" UNIQUE ("email");



ALTER TABLE ONLY "public"."attendees"
    ADD CONSTRAINT "attendees_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."audience_segments"
    ADD CONSTRAINT "audience_segments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."authors"
    ADD CONSTRAINT "authors_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."authors"
    ADD CONSTRAINT "authors_slug_key" UNIQUE ("slug");



ALTER TABLE ONLY "public"."blog_posts"
    ADD CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."blog_posts"
    ADD CONSTRAINT "blog_posts_slug_unique" UNIQUE ("slug");



ALTER TABLE ONLY "public"."cal_event_attendees"
    ADD CONSTRAINT "cal_event_attendees_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."calendar_event_reminders"
    ADD CONSTRAINT "calendar_event_reminders_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."calendar_events"
    ADD CONSTRAINT "calendar_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."calendar_tasks"
    ADD CONSTRAINT "calendar_tasks_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."calendars"
    ADD CONSTRAINT "calendars_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."communication_logs"
    ADD CONSTRAINT "communication_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."customer_feedback"
    ADD CONSTRAINT "customer_feedback_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."customer_interactions"
    ADD CONSTRAINT "customer_interactions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."donors"
    ADD CONSTRAINT "donors_email_unique" UNIQUE ("email");



ALTER TABLE ONLY "public"."donors"
    ADD CONSTRAINT "donors_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."email_campaigns"
    ADD CONSTRAINT "email_campaigns_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."email_recipients"
    ADD CONSTRAINT "email_recipients_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."email_templates"
    ADD CONSTRAINT "email_templates_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."event_locations"
    ADD CONSTRAINT "event_locations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."event_media"
    ADD CONSTRAINT "event_media_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."event_schedules"
    ADD CONSTRAINT "event_schedules_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."event_sections"
    ADD CONSTRAINT "event_sections_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."event_sessions"
    ADD CONSTRAINT "event_sessions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."event_speakers"
    ADD CONSTRAINT "event_speakers_email_unique" UNIQUE ("email");



ALTER TABLE ONLY "public"."event_speakers"
    ADD CONSTRAINT "event_speakers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_slug_unique" UNIQUE ("slug");



ALTER TABLE ONLY "public"."favorite_events"
    ADD CONSTRAINT "favorite_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."favorite_performers"
    ADD CONSTRAINT "favorite_performers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."favorite_sessions"
    ADD CONSTRAINT "favorite_sessions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."feedback_surveys"
    ADD CONSTRAINT "feedback_surveys_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."festival_map_locations"
    ADD CONSTRAINT "festival_map_locations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."form_fields"
    ADD CONSTRAINT "form_fields_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."form_response_details"
    ADD CONSTRAINT "form_response_details_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."form_responses"
    ADD CONSTRAINT "form_responses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."forms"
    ADD CONSTRAINT "forms_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."grant_reminders"
    ADD CONSTRAINT "grant_reminders_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."grant_reports"
    ADD CONSTRAINT "grant_reports_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."grant_reviews"
    ADD CONSTRAINT "grant_reviews_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."grant_touchpoints"
    ADD CONSTRAINT "grant_touchpoints_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."grants"
    ADD CONSTRAINT "grants_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."group_members"
    ADD CONSTRAINT "group_members_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."guilds"
    ADD CONSTRAINT "guilds_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."kanban_boards"
    ADD CONSTRAINT "kanban_boards_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."kanban_card_activities"
    ADD CONSTRAINT "kanban_card_activities_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."kanban_card_comments"
    ADD CONSTRAINT "kanban_card_comments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."kanban_cards"
    ADD CONSTRAINT "kanban_cards_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."kanban_columns"
    ADD CONSTRAINT "kanban_columns_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."leads"
    ADD CONSTRAINT "leads_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."message_templates"
    ADD CONSTRAINT "message_templates_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."org_customers"
    ADD CONSTRAINT "org_customers_email_unique" UNIQUE ("email");



ALTER TABLE ONLY "public"."org_customers"
    ADD CONSTRAINT "org_customers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."org_event_attendance"
    ADD CONSTRAINT "org_event_attendance_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."org_event_tickets"
    ADD CONSTRAINT "org_event_tickets_barcode_unique" UNIQUE ("barcode");



ALTER TABLE ONLY "public"."org_event_tickets"
    ADD CONSTRAINT "org_event_tickets_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."org_invites"
    ADD CONSTRAINT "org_invites_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."org_invites"
    ADD CONSTRAINT "org_invites_token_unique" UNIQUE ("token");



ALTER TABLE ONLY "public"."org_members"
    ADD CONSTRAINT "org_members_email_unique" UNIQUE ("email");



ALTER TABLE ONLY "public"."org_members"
    ADD CONSTRAINT "org_members_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."org_payments"
    ADD CONSTRAINT "org_payments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."org_payments"
    ADD CONSTRAINT "org_payments_stripe_account_id_unique" UNIQUE ("stripe_account_id");



ALTER TABLE ONLY "public"."org_performers"
    ADD CONSTRAINT "org_performers_email_unique" UNIQUE ("email");



ALTER TABLE ONLY "public"."org_performers"
    ADD CONSTRAINT "org_performers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."org_referral_programs"
    ADD CONSTRAINT "org_referral_programs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."org_ticket_types"
    ADD CONSTRAINT "org_ticket_types_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."org_transaction_items"
    ADD CONSTRAINT "org_transaction_items_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."org_transactions"
    ADD CONSTRAINT "org_transactions_invoice_id_unique" UNIQUE ("invoice_id");



ALTER TABLE ONLY "public"."org_transactions"
    ADD CONSTRAINT "org_transactions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."org_transactions"
    ADD CONSTRAINT "org_transactions_stripe_payment_id_unique" UNIQUE ("stripe_payment_id");



ALTER TABLE ONLY "public"."org_vendors"
    ADD CONSTRAINT "org_vendors_email_unique" UNIQUE ("email");



ALTER TABLE ONLY "public"."org_vendors"
    ADD CONSTRAINT "org_vendors_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."organizations"
    ADD CONSTRAINT "organizations_name_unique" UNIQUE ("name");



ALTER TABLE ONLY "public"."organizations"
    ADD CONSTRAINT "organizations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."participant_events"
    ADD CONSTRAINT "participant_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."participants"
    ADD CONSTRAINT "participants_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."payments_invoices"
    ADD CONSTRAINT "payments_invoices_invoice_number_unique" UNIQUE ("invoice_number");



ALTER TABLE ONLY "public"."payments_invoices"
    ADD CONSTRAINT "payments_invoices_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."performers"
    ADD CONSTRAINT "performers_email_unique" UNIQUE ("email");



ALTER TABLE ONLY "public"."performers"
    ADD CONSTRAINT "performers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."recurring_event_instances"
    ADD CONSTRAINT "recurring_event_instances_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."sales_pipelines"
    ADD CONSTRAINT "sales_pipelines_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."sales_stages"
    ADD CONSTRAINT "sales_stages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."signup_sheet_custom_questions"
    ADD CONSTRAINT "signup_sheet_custom_questions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."signup_sheet_groups"
    ADD CONSTRAINT "signup_sheet_groups_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."signup_sheet_responses"
    ADD CONSTRAINT "signup_sheet_responses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."signup_sheet_slots"
    ADD CONSTRAINT "signup_sheet_slots_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."signup_sheets"
    ADD CONSTRAINT "signup_sheets_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."signup_sheets"
    ADD CONSTRAINT "signup_sheets_slug_unique" UNIQUE ("slug");



ALTER TABLE ONLY "public"."sponsors"
    ADD CONSTRAINT "sponsors_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."stripe_connect_onboarding"
    ADD CONSTRAINT "stripe_connect_onboarding_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."stripe_connect_payouts"
    ADD CONSTRAINT "stripe_connect_payouts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."subscription_products"
    ADD CONSTRAINT "subscription_products_name_unique" UNIQUE ("name");



ALTER TABLE ONLY "public"."subscription_products"
    ADD CONSTRAINT "subscription_products_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."subscription_products"
    ADD CONSTRAINT "subscription_products_stripe_price_id_unique" UNIQUE ("stripe_price_id");



ALTER TABLE ONLY "public"."subscription_products"
    ADD CONSTRAINT "subscription_products_stripe_product_id_unique" UNIQUE ("stripe_product_id");



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tags"
    ADD CONSTRAINT "tags_name_unique" UNIQUE ("name");



ALTER TABLE ONLY "public"."tags"
    ADD CONSTRAINT "tags_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tasks"
    ADD CONSTRAINT "tasks_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ticket_analytics"
    ADD CONSTRAINT "ticket_analytics_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ticket_buyer_profiles"
    ADD CONSTRAINT "ticket_buyer_profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ticket_pages"
    ADD CONSTRAINT "ticket_pages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ticket_pages"
    ADD CONSTRAINT "ticket_pages_url_unique" UNIQUE ("url");



ALTER TABLE ONLY "public"."user_event_reminders"
    ADD CONSTRAINT "user_event_reminders_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_profiles"
    ADD CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_profiles"
    ADD CONSTRAINT "user_profiles_user_id_unique" UNIQUE ("user_id");



ALTER TABLE ONLY "public"."vendors"
    ADD CONSTRAINT "vendors_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."visitor_schedules"
    ADD CONSTRAINT "visitor_schedules_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."volunteers"
    ADD CONSTRAINT "volunteers_email_unique" UNIQUE ("email");



ALTER TABLE ONLY "public"."volunteers"
    ADD CONSTRAINT "volunteers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."agenda"
    ADD CONSTRAINT "agenda_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."attendees"
    ADD CONSTRAINT "attendees_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."attendees"
    ADD CONSTRAINT "attendees_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."audience_segments"
    ADD CONSTRAINT "audience_segments_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."blog_posts"
    ADD CONSTRAINT "blog_posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id");



ALTER TABLE ONLY "public"."cal_event_attendees"
    ADD CONSTRAINT "cal_event_attendees_event_id_calendar_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."calendar_events"("id");



ALTER TABLE ONLY "public"."cal_event_attendees"
    ADD CONSTRAINT "cal_event_attendees_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id");



ALTER TABLE ONLY "public"."calendar_event_reminders"
    ADD CONSTRAINT "calendar_event_reminders_event_id_calendar_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."calendar_events"("id");



ALTER TABLE ONLY "public"."calendar_events"
    ADD CONSTRAINT "calendar_events_calendar_id_calendars_id_fk" FOREIGN KEY ("calendar_id") REFERENCES "public"."calendars"("id");



ALTER TABLE ONLY "public"."calendar_events"
    ADD CONSTRAINT "calendar_events_organizer_id_user_profiles_id_fk" FOREIGN KEY ("organizer_id") REFERENCES "public"."user_profiles"("id");



ALTER TABLE ONLY "public"."calendar_tasks"
    ADD CONSTRAINT "calendar_tasks_assigned_to_user_profiles_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."user_profiles"("id");



ALTER TABLE ONLY "public"."calendar_tasks"
    ADD CONSTRAINT "calendar_tasks_calendar_id_calendars_id_fk" FOREIGN KEY ("calendar_id") REFERENCES "public"."calendars"("id");



ALTER TABLE ONLY "public"."calendars"
    ADD CONSTRAINT "calendars_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."calendars"
    ADD CONSTRAINT "calendars_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id");



ALTER TABLE ONLY "public"."communication_logs"
    ADD CONSTRAINT "communication_logs_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."communication_logs"
    ADD CONSTRAINT "communication_logs_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."customer_feedback"
    ADD CONSTRAINT "customer_feedback_customer_id_org_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."org_customers"("id");



ALTER TABLE ONLY "public"."customer_feedback"
    ADD CONSTRAINT "customer_feedback_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."customer_feedback"
    ADD CONSTRAINT "customer_feedback_session_id_event_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."event_sessions"("id");



ALTER TABLE ONLY "public"."customer_interactions"
    ADD CONSTRAINT "customer_interactions_customer_id_org_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."org_customers"("id");



ALTER TABLE ONLY "public"."customer_interactions"
    ADD CONSTRAINT "customer_interactions_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."donors"
    ADD CONSTRAINT "donors_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."email_campaigns"
    ADD CONSTRAINT "email_campaigns_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."email_campaigns"
    ADD CONSTRAINT "email_campaigns_segment_id_audience_segments_id_fk" FOREIGN KEY ("segment_id") REFERENCES "public"."audience_segments"("id");



ALTER TABLE ONLY "public"."email_recipients"
    ADD CONSTRAINT "email_recipients_campaign_id_email_campaigns_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."email_campaigns"("id");



ALTER TABLE ONLY "public"."email_recipients"
    ADD CONSTRAINT "email_recipients_customer_id_org_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."org_customers"("id");



ALTER TABLE ONLY "public"."email_templates"
    ADD CONSTRAINT "email_templates_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."event_locations"
    ADD CONSTRAINT "event_locations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."event_media"
    ADD CONSTRAINT "event_media_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."event_media"
    ADD CONSTRAINT "event_media_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."event_schedules"
    ADD CONSTRAINT "event_schedules_customer_id_org_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."org_customers"("id");



ALTER TABLE ONLY "public"."event_schedules"
    ADD CONSTRAINT "event_schedules_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."event_schedules"
    ADD CONSTRAINT "event_schedules_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."event_schedules"
    ADD CONSTRAINT "event_schedules_session_id_event_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."event_sessions"("id");



ALTER TABLE ONLY "public"."event_sections"
    ADD CONSTRAINT "event_sections_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."event_sections"
    ADD CONSTRAINT "event_sections_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."event_sessions"
    ADD CONSTRAINT "event_sessions_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."event_sessions"
    ADD CONSTRAINT "event_sessions_performer_id_org_performers_id_fk" FOREIGN KEY ("performer_id") REFERENCES "public"."org_performers"("id");



ALTER TABLE ONLY "public"."event_sessions"
    ADD CONSTRAINT "event_sessions_speaker_id_event_speakers_id_fk" FOREIGN KEY ("speaker_id") REFERENCES "public"."event_speakers"("id");



ALTER TABLE ONLY "public"."event_speakers"
    ADD CONSTRAINT "event_speakers_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."event_speakers"
    ADD CONSTRAINT "event_speakers_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."event_tags"
    ADD CONSTRAINT "event_tags_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."event_tags"
    ADD CONSTRAINT "event_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id");



ALTER TABLE ONLY "public"."events"
    ADD CONSTRAINT "events_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."favorite_events"
    ADD CONSTRAINT "favorite_events_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."favorite_events"
    ADD CONSTRAINT "favorite_events_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id");



ALTER TABLE ONLY "public"."favorite_performers"
    ADD CONSTRAINT "favorite_performers_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."favorite_performers"
    ADD CONSTRAINT "favorite_performers_performer_id_org_performers_id_fk" FOREIGN KEY ("performer_id") REFERENCES "public"."org_performers"("id");



ALTER TABLE ONLY "public"."favorite_performers"
    ADD CONSTRAINT "favorite_performers_visitor_id_org_customers_id_fk" FOREIGN KEY ("visitor_id") REFERENCES "public"."org_customers"("id");



ALTER TABLE ONLY "public"."favorite_sessions"
    ADD CONSTRAINT "favorite_sessions_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."favorite_sessions"
    ADD CONSTRAINT "favorite_sessions_session_id_event_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."event_sessions"("id");



ALTER TABLE ONLY "public"."favorite_sessions"
    ADD CONSTRAINT "favorite_sessions_visitor_id_org_customers_id_fk" FOREIGN KEY ("visitor_id") REFERENCES "public"."org_customers"("id");



ALTER TABLE ONLY "public"."feedback_surveys"
    ADD CONSTRAINT "feedback_surveys_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."feedback_surveys"
    ADD CONSTRAINT "feedback_surveys_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."festival_map_locations"
    ADD CONSTRAINT "festival_map_locations_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."festival_map_locations"
    ADD CONSTRAINT "festival_map_locations_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."form_fields"
    ADD CONSTRAINT "form_fields_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id");



ALTER TABLE ONLY "public"."form_response_details"
    ADD CONSTRAINT "form_response_details_form_field_id_form_fields_id_fk" FOREIGN KEY ("form_field_id") REFERENCES "public"."form_fields"("id");



ALTER TABLE ONLY "public"."form_response_details"
    ADD CONSTRAINT "form_response_details_form_response_id_form_responses_id_fk" FOREIGN KEY ("form_response_id") REFERENCES "public"."form_responses"("id");



ALTER TABLE ONLY "public"."form_responses"
    ADD CONSTRAINT "form_responses_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id");



ALTER TABLE ONLY "public"."form_responses"
    ADD CONSTRAINT "form_responses_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."forms"
    ADD CONSTRAINT "forms_creator_id_user_profiles_user_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."user_profiles"("user_id");



ALTER TABLE ONLY "public"."forms"
    ADD CONSTRAINT "forms_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."grant_reminders"
    ADD CONSTRAINT "grant_reminders_grant_id_grants_id_fk" FOREIGN KEY ("grant_id") REFERENCES "public"."grants"("id");



ALTER TABLE ONLY "public"."grant_reports"
    ADD CONSTRAINT "grant_reports_grant_id_grants_id_fk" FOREIGN KEY ("grant_id") REFERENCES "public"."grants"("id");



ALTER TABLE ONLY "public"."grant_reviews"
    ADD CONSTRAINT "grant_reviews_grant_id_grants_id_fk" FOREIGN KEY ("grant_id") REFERENCES "public"."grants"("id");



ALTER TABLE ONLY "public"."grant_reviews"
    ADD CONSTRAINT "grant_reviews_reviewer_id_user_profiles_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."user_profiles"("id");



ALTER TABLE ONLY "public"."grant_touchpoints"
    ADD CONSTRAINT "grant_touchpoints_grant_id_grants_id_fk" FOREIGN KEY ("grant_id") REFERENCES "public"."grants"("id");



ALTER TABLE ONLY "public"."grants"
    ADD CONSTRAINT "grants_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."group_members"
    ADD CONSTRAINT "group_members_group_id_signup_sheet_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."signup_sheet_groups"("id");



ALTER TABLE ONLY "public"."group_members"
    ADD CONSTRAINT "group_members_participant_id_participants_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."participants"("id");



ALTER TABLE ONLY "public"."guilds"
    ADD CONSTRAINT "guilds_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."guilds"
    ADD CONSTRAINT "guilds_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."kanban_boards"
    ADD CONSTRAINT "kanban_boards_created_by_user_profiles_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user_profiles"("id");



ALTER TABLE ONLY "public"."kanban_boards"
    ADD CONSTRAINT "kanban_boards_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."kanban_card_activities"
    ADD CONSTRAINT "kanban_card_activities_card_id_kanban_cards_id_fk" FOREIGN KEY ("card_id") REFERENCES "public"."kanban_cards"("id");



ALTER TABLE ONLY "public"."kanban_card_activities"
    ADD CONSTRAINT "kanban_card_activities_performed_by_user_profiles_id_fk" FOREIGN KEY ("performed_by") REFERENCES "public"."user_profiles"("id");



ALTER TABLE ONLY "public"."kanban_card_comments"
    ADD CONSTRAINT "kanban_card_comments_card_id_kanban_cards_id_fk" FOREIGN KEY ("card_id") REFERENCES "public"."kanban_cards"("id");



ALTER TABLE ONLY "public"."kanban_card_comments"
    ADD CONSTRAINT "kanban_card_comments_created_by_user_profiles_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user_profiles"("id");



ALTER TABLE ONLY "public"."kanban_cards"
    ADD CONSTRAINT "kanban_cards_assigned_to_user_profiles_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."user_profiles"("id");



ALTER TABLE ONLY "public"."kanban_cards"
    ADD CONSTRAINT "kanban_cards_board_id_kanban_boards_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."kanban_boards"("id");



ALTER TABLE ONLY "public"."kanban_cards"
    ADD CONSTRAINT "kanban_cards_column_id_kanban_columns_id_fk" FOREIGN KEY ("column_id") REFERENCES "public"."kanban_columns"("id");



ALTER TABLE ONLY "public"."kanban_columns"
    ADD CONSTRAINT "kanban_columns_board_id_kanban_boards_id_fk" FOREIGN KEY ("board_id") REFERENCES "public"."kanban_boards"("id");



ALTER TABLE ONLY "public"."leads"
    ADD CONSTRAINT "leads_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."leads"
    ADD CONSTRAINT "leads_stage_id_sales_stages_id_fk" FOREIGN KEY ("stage_id") REFERENCES "public"."sales_stages"("id");



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_group_id_signup_sheet_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."signup_sheet_groups"("id");



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_message_template_id_message_templates_id_fk" FOREIGN KEY ("message_template_id") REFERENCES "public"."message_templates"("id");



ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_participant_id_participants_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."participants"("id");



ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_recipient_id_participants_id_fk" FOREIGN KEY ("recipient_id") REFERENCES "public"."participants"("id");



ALTER TABLE ONLY "public"."org_customers"
    ADD CONSTRAINT "org_customers_favorite_event_id_events_id_fk" FOREIGN KEY ("favorite_event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."org_customers"
    ADD CONSTRAINT "org_customers_favorite_performer_id_org_performers_id_fk" FOREIGN KEY ("favorite_performer_id") REFERENCES "public"."org_performers"("id");



ALTER TABLE ONLY "public"."org_customers"
    ADD CONSTRAINT "org_customers_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."org_event_attendance"
    ADD CONSTRAINT "org_event_attendance_checked_in_by_user_profiles_id_fk" FOREIGN KEY ("checked_in_by") REFERENCES "public"."user_profiles"("id");



ALTER TABLE ONLY "public"."org_event_attendance"
    ADD CONSTRAINT "org_event_attendance_customer_id_org_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."org_customers"("id");



ALTER TABLE ONLY "public"."org_event_attendance"
    ADD CONSTRAINT "org_event_attendance_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."org_event_attendance"
    ADD CONSTRAINT "org_event_attendance_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."org_event_attendance"
    ADD CONSTRAINT "org_event_attendance_ticket_id_org_event_tickets_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."org_event_tickets"("id");



ALTER TABLE ONLY "public"."org_event_tickets"
    ADD CONSTRAINT "org_event_tickets_customer_id_org_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."org_customers"("id");



ALTER TABLE ONLY "public"."org_event_tickets"
    ADD CONSTRAINT "org_event_tickets_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."org_event_tickets"
    ADD CONSTRAINT "org_event_tickets_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."org_event_tickets"
    ADD CONSTRAINT "org_event_tickets_ticket_type_id_org_ticket_types_id_fk" FOREIGN KEY ("ticket_type_id") REFERENCES "public"."org_ticket_types"("id");



ALTER TABLE ONLY "public"."org_invites"
    ADD CONSTRAINT "org_invites_inviter_id_user_profiles_id_fk" FOREIGN KEY ("inviter_id") REFERENCES "public"."user_profiles"("id");



ALTER TABLE ONLY "public"."org_invites"
    ADD CONSTRAINT "org_invites_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."org_members"
    ADD CONSTRAINT "org_members_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."org_members"
    ADD CONSTRAINT "org_members_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."org_payments"
    ADD CONSTRAINT "org_payments_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."org_performers"
    ADD CONSTRAINT "org_performers_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."org_performers"
    ADD CONSTRAINT "org_performers_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."org_referral_programs"
    ADD CONSTRAINT "org_referral_programs_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."org_ticket_types"
    ADD CONSTRAINT "org_ticket_types_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."org_ticket_types"
    ADD CONSTRAINT "org_ticket_types_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."org_transaction_items"
    ADD CONSTRAINT "org_transaction_items_order_id_org_transactions_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."org_transactions"("id");



ALTER TABLE ONLY "public"."org_transaction_items"
    ADD CONSTRAINT "org_transaction_items_ticket_id_org_event_tickets_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "public"."org_event_tickets"("id");



ALTER TABLE ONLY "public"."org_transactions"
    ADD CONSTRAINT "org_transactions_customer_id_org_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."org_customers"("id");



ALTER TABLE ONLY "public"."org_transactions"
    ADD CONSTRAINT "org_transactions_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."org_vendors"
    ADD CONSTRAINT "org_vendors_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."org_vendors"
    ADD CONSTRAINT "org_vendors_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."participant_events"
    ADD CONSTRAINT "participant_events_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."participant_events"
    ADD CONSTRAINT "participant_events_participant_id_org_performers_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."org_performers"("id");



ALTER TABLE ONLY "public"."participants"
    ADD CONSTRAINT "participants_signup_sheet_id_signup_sheets_id_fk" FOREIGN KEY ("signup_sheet_id") REFERENCES "public"."signup_sheets"("id");



ALTER TABLE ONLY "public"."payments_invoices"
    ADD CONSTRAINT "payments_invoices_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."payments_invoices"
    ADD CONSTRAINT "payments_invoices_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."performers"
    ADD CONSTRAINT "performers_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."performers"
    ADD CONSTRAINT "performers_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."recurring_event_instances"
    ADD CONSTRAINT "recurring_event_instances_event_id_calendar_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."calendar_events"("id");



ALTER TABLE ONLY "public"."sales_pipelines"
    ADD CONSTRAINT "sales_pipelines_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."sales_stages"
    ADD CONSTRAINT "sales_stages_pipeline_id_sales_pipelines_id_fk" FOREIGN KEY ("pipeline_id") REFERENCES "public"."sales_pipelines"("id");



ALTER TABLE ONLY "public"."signup_sheet_custom_questions"
    ADD CONSTRAINT "signup_sheet_custom_questions_signup_sheet_id_signup_sheets_id_" FOREIGN KEY ("signup_sheet_id") REFERENCES "public"."signup_sheets"("id");



ALTER TABLE ONLY "public"."signup_sheet_groups"
    ADD CONSTRAINT "signup_sheet_groups_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."signup_sheet_responses"
    ADD CONSTRAINT "signup_sheet_responses_last_updated_by_user_profiles_id_fk" FOREIGN KEY ("last_updated_by") REFERENCES "public"."user_profiles"("id");



ALTER TABLE ONLY "public"."signup_sheet_responses"
    ADD CONSTRAINT "signup_sheet_responses_participant_id_participants_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."participants"("id");



ALTER TABLE ONLY "public"."signup_sheet_responses"
    ADD CONSTRAINT "signup_sheet_responses_signup_sheet_id_signup_sheets_id_fk" FOREIGN KEY ("signup_sheet_id") REFERENCES "public"."signup_sheets"("id");



ALTER TABLE ONLY "public"."signup_sheet_responses"
    ADD CONSTRAINT "signup_sheet_responses_slot_id_signup_sheet_slots_id_fk" FOREIGN KEY ("slot_id") REFERENCES "public"."signup_sheet_slots"("id");



ALTER TABLE ONLY "public"."signup_sheet_slots"
    ADD CONSTRAINT "signup_sheet_slots_group_id_signup_sheet_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."signup_sheet_groups"("id");



ALTER TABLE ONLY "public"."signup_sheet_slots"
    ADD CONSTRAINT "signup_sheet_slots_signup_sheet_id_signup_sheets_id_fk" FOREIGN KEY ("signup_sheet_id") REFERENCES "public"."signup_sheets"("id");



ALTER TABLE ONLY "public"."signup_sheets"
    ADD CONSTRAINT "signup_sheets_creator_id_user_profiles_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."user_profiles"("id");



ALTER TABLE ONLY "public"."signup_sheets"
    ADD CONSTRAINT "signup_sheets_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."signup_sheets"
    ADD CONSTRAINT "signup_sheets_group_id_signup_sheet_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."signup_sheet_groups"("id");



ALTER TABLE ONLY "public"."signup_sheets"
    ADD CONSTRAINT "signup_sheets_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."sponsors"
    ADD CONSTRAINT "sponsors_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."sponsors"
    ADD CONSTRAINT "sponsors_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."stripe_connect_onboarding"
    ADD CONSTRAINT "stripe_connect_onboarding_user_profile_id_user_profiles_id_fk" FOREIGN KEY ("user_profile_id") REFERENCES "public"."user_profiles"("id");



ALTER TABLE ONLY "public"."stripe_connect_payouts"
    ADD CONSTRAINT "stripe_connect_payouts_user_profile_id_user_profiles_id_fk" FOREIGN KEY ("user_profile_id") REFERENCES "public"."user_profiles"("id");



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_product_id_subscription_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."subscription_products"("id");



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_user_profile_id_user_profiles_id_fk" FOREIGN KEY ("user_profile_id") REFERENCES "public"."user_profiles"("id");



ALTER TABLE ONLY "public"."tasks"
    ADD CONSTRAINT "tasks_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."tasks"
    ADD CONSTRAINT "tasks_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."ticket_analytics"
    ADD CONSTRAINT "ticket_analytics_ticket_page_id_ticket_pages_id_fk" FOREIGN KEY ("ticket_page_id") REFERENCES "public"."ticket_pages"("id");



ALTER TABLE ONLY "public"."ticket_buyer_profiles"
    ADD CONSTRAINT "ticket_buyer_profiles_favorite_event_id_events_id_fk" FOREIGN KEY ("favorite_event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."ticket_buyer_profiles"
    ADD CONSTRAINT "ticket_buyer_profiles_favorite_performer_id_org_performers_id_f" FOREIGN KEY ("favorite_performer_id") REFERENCES "public"."org_performers"("id");



ALTER TABLE ONLY "public"."ticket_pages"
    ADD CONSTRAINT "ticket_pages_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."ticket_pages"
    ADD CONSTRAINT "ticket_pages_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."user_event_reminders"
    ADD CONSTRAINT "user_event_reminders_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."user_event_reminders"
    ADD CONSTRAINT "user_event_reminders_user_id_user_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_profiles"("id");



ALTER TABLE ONLY "public"."user_profiles"
    ADD CONSTRAINT "user_profiles_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."vendors"
    ADD CONSTRAINT "vendors_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."vendors"
    ADD CONSTRAINT "vendors_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."visitor_schedules"
    ADD CONSTRAINT "visitor_schedules_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."visitor_schedules"
    ADD CONSTRAINT "visitor_schedules_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");



ALTER TABLE ONLY "public"."visitor_schedules"
    ADD CONSTRAINT "visitor_schedules_session_id_event_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."event_sessions"("id");



ALTER TABLE ONLY "public"."visitor_schedules"
    ADD CONSTRAINT "visitor_schedules_visitor_id_org_customers_id_fk" FOREIGN KEY ("visitor_id") REFERENCES "public"."org_customers"("id");



ALTER TABLE ONLY "public"."volunteers"
    ADD CONSTRAINT "volunteers_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id");



ALTER TABLE ONLY "public"."volunteers"
    ADD CONSTRAINT "volunteers_org_id_organizations_id_fk" FOREIGN KEY ("org_id") REFERENCES "public"."organizations"("id");





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
GRANT USAGE ON SCHEMA "public" TO "postgres";
































































































































































































GRANT ALL ON FUNCTION "public"."custom_access_token_hook"("event" "jsonb") TO "service_role";
GRANT ALL ON FUNCTION "public"."custom_access_token_hook"("event" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."custom_access_token_hook"("event" "jsonb") TO "anon";



GRANT ALL ON FUNCTION "public"."custom_claims"() TO "anon";
GRANT ALL ON FUNCTION "public"."custom_claims"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."custom_claims"() TO "service_role";



GRANT ALL ON FUNCTION "public"."custom_claims_hook"("claims" "jsonb", "user_org_id" "uuid", "user_role" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."custom_claims_hook"("claims" "jsonb", "user_org_id" "uuid", "user_role" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."custom_claims_hook"("claims" "jsonb", "user_org_id" "uuid", "user_role" "text") TO "service_role";





















GRANT ALL ON TABLE "public"."agenda" TO "anon";
GRANT ALL ON TABLE "public"."agenda" TO "authenticated";
GRANT ALL ON TABLE "public"."agenda" TO "service_role";



GRANT ALL ON TABLE "public"."attendees" TO "anon";
GRANT ALL ON TABLE "public"."attendees" TO "authenticated";
GRANT ALL ON TABLE "public"."attendees" TO "service_role";



GRANT ALL ON TABLE "public"."audience_segments" TO "anon";
GRANT ALL ON TABLE "public"."audience_segments" TO "authenticated";
GRANT ALL ON TABLE "public"."audience_segments" TO "service_role";



GRANT ALL ON TABLE "public"."authors" TO "anon";
GRANT ALL ON TABLE "public"."authors" TO "authenticated";
GRANT ALL ON TABLE "public"."authors" TO "service_role";



GRANT ALL ON SEQUENCE "public"."authors_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."authors_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."authors_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."blog_posts" TO "anon";
GRANT ALL ON TABLE "public"."blog_posts" TO "authenticated";
GRANT ALL ON TABLE "public"."blog_posts" TO "service_role";



GRANT ALL ON SEQUENCE "public"."blog_posts_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."blog_posts_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."blog_posts_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."cal_event_attendees" TO "anon";
GRANT ALL ON TABLE "public"."cal_event_attendees" TO "authenticated";
GRANT ALL ON TABLE "public"."cal_event_attendees" TO "service_role";



GRANT ALL ON TABLE "public"."calendar_event_reminders" TO "anon";
GRANT ALL ON TABLE "public"."calendar_event_reminders" TO "authenticated";
GRANT ALL ON TABLE "public"."calendar_event_reminders" TO "service_role";



GRANT ALL ON TABLE "public"."calendar_events" TO "anon";
GRANT ALL ON TABLE "public"."calendar_events" TO "authenticated";
GRANT ALL ON TABLE "public"."calendar_events" TO "service_role";



GRANT ALL ON TABLE "public"."calendar_tasks" TO "anon";
GRANT ALL ON TABLE "public"."calendar_tasks" TO "authenticated";
GRANT ALL ON TABLE "public"."calendar_tasks" TO "service_role";



GRANT ALL ON TABLE "public"."calendars" TO "anon";
GRANT ALL ON TABLE "public"."calendars" TO "authenticated";
GRANT ALL ON TABLE "public"."calendars" TO "service_role";



GRANT ALL ON TABLE "public"."communication_logs" TO "anon";
GRANT ALL ON TABLE "public"."communication_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."communication_logs" TO "service_role";



GRANT ALL ON TABLE "public"."customer_feedback" TO "anon";
GRANT ALL ON TABLE "public"."customer_feedback" TO "authenticated";
GRANT ALL ON TABLE "public"."customer_feedback" TO "service_role";



GRANT ALL ON TABLE "public"."customer_interactions" TO "anon";
GRANT ALL ON TABLE "public"."customer_interactions" TO "authenticated";
GRANT ALL ON TABLE "public"."customer_interactions" TO "service_role";



GRANT ALL ON TABLE "public"."donors" TO "anon";
GRANT ALL ON TABLE "public"."donors" TO "authenticated";
GRANT ALL ON TABLE "public"."donors" TO "service_role";



GRANT ALL ON TABLE "public"."email_campaigns" TO "anon";
GRANT ALL ON TABLE "public"."email_campaigns" TO "authenticated";
GRANT ALL ON TABLE "public"."email_campaigns" TO "service_role";



GRANT ALL ON TABLE "public"."email_recipients" TO "anon";
GRANT ALL ON TABLE "public"."email_recipients" TO "authenticated";
GRANT ALL ON TABLE "public"."email_recipients" TO "service_role";



GRANT ALL ON TABLE "public"."email_templates" TO "anon";
GRANT ALL ON TABLE "public"."email_templates" TO "authenticated";
GRANT ALL ON TABLE "public"."email_templates" TO "service_role";



GRANT ALL ON TABLE "public"."event_locations" TO "anon";
GRANT ALL ON TABLE "public"."event_locations" TO "authenticated";
GRANT ALL ON TABLE "public"."event_locations" TO "service_role";



GRANT ALL ON TABLE "public"."event_media" TO "anon";
GRANT ALL ON TABLE "public"."event_media" TO "authenticated";
GRANT ALL ON TABLE "public"."event_media" TO "service_role";



GRANT ALL ON TABLE "public"."event_schedules" TO "anon";
GRANT ALL ON TABLE "public"."event_schedules" TO "authenticated";
GRANT ALL ON TABLE "public"."event_schedules" TO "service_role";



GRANT ALL ON TABLE "public"."event_sections" TO "anon";
GRANT ALL ON TABLE "public"."event_sections" TO "authenticated";
GRANT ALL ON TABLE "public"."event_sections" TO "service_role";



GRANT ALL ON TABLE "public"."event_sessions" TO "anon";
GRANT ALL ON TABLE "public"."event_sessions" TO "authenticated";
GRANT ALL ON TABLE "public"."event_sessions" TO "service_role";



GRANT ALL ON TABLE "public"."event_speakers" TO "anon";
GRANT ALL ON TABLE "public"."event_speakers" TO "authenticated";
GRANT ALL ON TABLE "public"."event_speakers" TO "service_role";



GRANT ALL ON TABLE "public"."event_tags" TO "anon";
GRANT ALL ON TABLE "public"."event_tags" TO "authenticated";
GRANT ALL ON TABLE "public"."event_tags" TO "service_role";



GRANT ALL ON TABLE "public"."events" TO "anon";
GRANT ALL ON TABLE "public"."events" TO "authenticated";
GRANT ALL ON TABLE "public"."events" TO "service_role";



GRANT ALL ON TABLE "public"."favorite_events" TO "anon";
GRANT ALL ON TABLE "public"."favorite_events" TO "authenticated";
GRANT ALL ON TABLE "public"."favorite_events" TO "service_role";



GRANT ALL ON TABLE "public"."favorite_performers" TO "anon";
GRANT ALL ON TABLE "public"."favorite_performers" TO "authenticated";
GRANT ALL ON TABLE "public"."favorite_performers" TO "service_role";



GRANT ALL ON TABLE "public"."favorite_sessions" TO "anon";
GRANT ALL ON TABLE "public"."favorite_sessions" TO "authenticated";
GRANT ALL ON TABLE "public"."favorite_sessions" TO "service_role";



GRANT ALL ON TABLE "public"."feedback_surveys" TO "anon";
GRANT ALL ON TABLE "public"."feedback_surveys" TO "authenticated";
GRANT ALL ON TABLE "public"."feedback_surveys" TO "service_role";



GRANT ALL ON TABLE "public"."festival_map_locations" TO "anon";
GRANT ALL ON TABLE "public"."festival_map_locations" TO "authenticated";
GRANT ALL ON TABLE "public"."festival_map_locations" TO "service_role";



GRANT ALL ON TABLE "public"."form_fields" TO "anon";
GRANT ALL ON TABLE "public"."form_fields" TO "authenticated";
GRANT ALL ON TABLE "public"."form_fields" TO "service_role";



GRANT ALL ON TABLE "public"."form_response_details" TO "anon";
GRANT ALL ON TABLE "public"."form_response_details" TO "authenticated";
GRANT ALL ON TABLE "public"."form_response_details" TO "service_role";



GRANT ALL ON TABLE "public"."form_responses" TO "anon";
GRANT ALL ON TABLE "public"."form_responses" TO "authenticated";
GRANT ALL ON TABLE "public"."form_responses" TO "service_role";



GRANT ALL ON TABLE "public"."forms" TO "anon";
GRANT ALL ON TABLE "public"."forms" TO "authenticated";
GRANT ALL ON TABLE "public"."forms" TO "service_role";



GRANT ALL ON TABLE "public"."grant_reminders" TO "anon";
GRANT ALL ON TABLE "public"."grant_reminders" TO "authenticated";
GRANT ALL ON TABLE "public"."grant_reminders" TO "service_role";



GRANT ALL ON TABLE "public"."grant_reports" TO "anon";
GRANT ALL ON TABLE "public"."grant_reports" TO "authenticated";
GRANT ALL ON TABLE "public"."grant_reports" TO "service_role";



GRANT ALL ON TABLE "public"."grant_reviews" TO "anon";
GRANT ALL ON TABLE "public"."grant_reviews" TO "authenticated";
GRANT ALL ON TABLE "public"."grant_reviews" TO "service_role";



GRANT ALL ON TABLE "public"."grant_touchpoints" TO "anon";
GRANT ALL ON TABLE "public"."grant_touchpoints" TO "authenticated";
GRANT ALL ON TABLE "public"."grant_touchpoints" TO "service_role";



GRANT ALL ON TABLE "public"."grants" TO "anon";
GRANT ALL ON TABLE "public"."grants" TO "authenticated";
GRANT ALL ON TABLE "public"."grants" TO "service_role";



GRANT ALL ON TABLE "public"."group_members" TO "anon";
GRANT ALL ON TABLE "public"."group_members" TO "authenticated";
GRANT ALL ON TABLE "public"."group_members" TO "service_role";



GRANT ALL ON TABLE "public"."guilds" TO "anon";
GRANT ALL ON TABLE "public"."guilds" TO "authenticated";
GRANT ALL ON TABLE "public"."guilds" TO "service_role";



GRANT ALL ON TABLE "public"."kanban_boards" TO "anon";
GRANT ALL ON TABLE "public"."kanban_boards" TO "authenticated";
GRANT ALL ON TABLE "public"."kanban_boards" TO "service_role";



GRANT ALL ON TABLE "public"."kanban_card_activities" TO "anon";
GRANT ALL ON TABLE "public"."kanban_card_activities" TO "authenticated";
GRANT ALL ON TABLE "public"."kanban_card_activities" TO "service_role";



GRANT ALL ON TABLE "public"."kanban_card_comments" TO "anon";
GRANT ALL ON TABLE "public"."kanban_card_comments" TO "authenticated";
GRANT ALL ON TABLE "public"."kanban_card_comments" TO "service_role";



GRANT ALL ON TABLE "public"."kanban_cards" TO "anon";
GRANT ALL ON TABLE "public"."kanban_cards" TO "authenticated";
GRANT ALL ON TABLE "public"."kanban_cards" TO "service_role";



GRANT ALL ON TABLE "public"."kanban_columns" TO "anon";
GRANT ALL ON TABLE "public"."kanban_columns" TO "authenticated";
GRANT ALL ON TABLE "public"."kanban_columns" TO "service_role";



GRANT ALL ON TABLE "public"."leads" TO "anon";
GRANT ALL ON TABLE "public"."leads" TO "authenticated";
GRANT ALL ON TABLE "public"."leads" TO "service_role";



GRANT ALL ON TABLE "public"."message_templates" TO "anon";
GRANT ALL ON TABLE "public"."message_templates" TO "authenticated";
GRANT ALL ON TABLE "public"."message_templates" TO "service_role";



GRANT ALL ON TABLE "public"."messages" TO "anon";
GRANT ALL ON TABLE "public"."messages" TO "authenticated";
GRANT ALL ON TABLE "public"."messages" TO "service_role";



GRANT ALL ON TABLE "public"."notifications" TO "anon";
GRANT ALL ON TABLE "public"."notifications" TO "authenticated";
GRANT ALL ON TABLE "public"."notifications" TO "service_role";



GRANT ALL ON TABLE "public"."org_customers" TO "anon";
GRANT ALL ON TABLE "public"."org_customers" TO "authenticated";
GRANT ALL ON TABLE "public"."org_customers" TO "service_role";



GRANT ALL ON TABLE "public"."org_event_attendance" TO "anon";
GRANT ALL ON TABLE "public"."org_event_attendance" TO "authenticated";
GRANT ALL ON TABLE "public"."org_event_attendance" TO "service_role";



GRANT ALL ON TABLE "public"."org_event_tickets" TO "anon";
GRANT ALL ON TABLE "public"."org_event_tickets" TO "authenticated";
GRANT ALL ON TABLE "public"."org_event_tickets" TO "service_role";



GRANT ALL ON TABLE "public"."org_invites" TO "anon";
GRANT ALL ON TABLE "public"."org_invites" TO "authenticated";
GRANT ALL ON TABLE "public"."org_invites" TO "service_role";



GRANT ALL ON TABLE "public"."org_members" TO "anon";
GRANT ALL ON TABLE "public"."org_members" TO "authenticated";
GRANT ALL ON TABLE "public"."org_members" TO "service_role";



GRANT ALL ON TABLE "public"."org_payments" TO "anon";
GRANT ALL ON TABLE "public"."org_payments" TO "authenticated";
GRANT ALL ON TABLE "public"."org_payments" TO "service_role";



GRANT ALL ON TABLE "public"."org_performers" TO "anon";
GRANT ALL ON TABLE "public"."org_performers" TO "authenticated";
GRANT ALL ON TABLE "public"."org_performers" TO "service_role";



GRANT ALL ON TABLE "public"."org_referral_programs" TO "anon";
GRANT ALL ON TABLE "public"."org_referral_programs" TO "authenticated";
GRANT ALL ON TABLE "public"."org_referral_programs" TO "service_role";



GRANT ALL ON TABLE "public"."org_ticket_types" TO "anon";
GRANT ALL ON TABLE "public"."org_ticket_types" TO "authenticated";
GRANT ALL ON TABLE "public"."org_ticket_types" TO "service_role";



GRANT ALL ON TABLE "public"."org_transaction_items" TO "anon";
GRANT ALL ON TABLE "public"."org_transaction_items" TO "authenticated";
GRANT ALL ON TABLE "public"."org_transaction_items" TO "service_role";



GRANT ALL ON TABLE "public"."org_transactions" TO "anon";
GRANT ALL ON TABLE "public"."org_transactions" TO "authenticated";
GRANT ALL ON TABLE "public"."org_transactions" TO "service_role";



GRANT ALL ON TABLE "public"."org_vendors" TO "anon";
GRANT ALL ON TABLE "public"."org_vendors" TO "authenticated";
GRANT ALL ON TABLE "public"."org_vendors" TO "service_role";



GRANT ALL ON TABLE "public"."organizations" TO "anon";
GRANT ALL ON TABLE "public"."organizations" TO "authenticated";
GRANT ALL ON TABLE "public"."organizations" TO "service_role";



GRANT ALL ON TABLE "public"."participant_events" TO "anon";
GRANT ALL ON TABLE "public"."participant_events" TO "authenticated";
GRANT ALL ON TABLE "public"."participant_events" TO "service_role";



GRANT ALL ON TABLE "public"."participants" TO "anon";
GRANT ALL ON TABLE "public"."participants" TO "authenticated";
GRANT ALL ON TABLE "public"."participants" TO "service_role";



GRANT ALL ON TABLE "public"."payments_invoices" TO "anon";
GRANT ALL ON TABLE "public"."payments_invoices" TO "authenticated";
GRANT ALL ON TABLE "public"."payments_invoices" TO "service_role";



GRANT ALL ON TABLE "public"."performers" TO "anon";
GRANT ALL ON TABLE "public"."performers" TO "authenticated";
GRANT ALL ON TABLE "public"."performers" TO "service_role";



GRANT ALL ON TABLE "public"."recurring_event_instances" TO "anon";
GRANT ALL ON TABLE "public"."recurring_event_instances" TO "authenticated";
GRANT ALL ON TABLE "public"."recurring_event_instances" TO "service_role";



GRANT ALL ON TABLE "public"."sales_pipelines" TO "anon";
GRANT ALL ON TABLE "public"."sales_pipelines" TO "authenticated";
GRANT ALL ON TABLE "public"."sales_pipelines" TO "service_role";



GRANT ALL ON TABLE "public"."sales_stages" TO "anon";
GRANT ALL ON TABLE "public"."sales_stages" TO "authenticated";
GRANT ALL ON TABLE "public"."sales_stages" TO "service_role";



GRANT ALL ON TABLE "public"."signup_sheet_custom_questions" TO "anon";
GRANT ALL ON TABLE "public"."signup_sheet_custom_questions" TO "authenticated";
GRANT ALL ON TABLE "public"."signup_sheet_custom_questions" TO "service_role";



GRANT ALL ON TABLE "public"."signup_sheet_groups" TO "anon";
GRANT ALL ON TABLE "public"."signup_sheet_groups" TO "authenticated";
GRANT ALL ON TABLE "public"."signup_sheet_groups" TO "service_role";



GRANT ALL ON TABLE "public"."signup_sheet_responses" TO "anon";
GRANT ALL ON TABLE "public"."signup_sheet_responses" TO "authenticated";
GRANT ALL ON TABLE "public"."signup_sheet_responses" TO "service_role";



GRANT ALL ON TABLE "public"."signup_sheet_slots" TO "anon";
GRANT ALL ON TABLE "public"."signup_sheet_slots" TO "authenticated";
GRANT ALL ON TABLE "public"."signup_sheet_slots" TO "service_role";



GRANT ALL ON TABLE "public"."signup_sheets" TO "anon";
GRANT ALL ON TABLE "public"."signup_sheets" TO "authenticated";
GRANT ALL ON TABLE "public"."signup_sheets" TO "service_role";



GRANT ALL ON TABLE "public"."sponsors" TO "anon";
GRANT ALL ON TABLE "public"."sponsors" TO "authenticated";
GRANT ALL ON TABLE "public"."sponsors" TO "service_role";



GRANT ALL ON TABLE "public"."stripe_connect_onboarding" TO "anon";
GRANT ALL ON TABLE "public"."stripe_connect_onboarding" TO "authenticated";
GRANT ALL ON TABLE "public"."stripe_connect_onboarding" TO "service_role";



GRANT ALL ON TABLE "public"."stripe_connect_payouts" TO "anon";
GRANT ALL ON TABLE "public"."stripe_connect_payouts" TO "authenticated";
GRANT ALL ON TABLE "public"."stripe_connect_payouts" TO "service_role";



GRANT ALL ON TABLE "public"."subscription_products" TO "anon";
GRANT ALL ON TABLE "public"."subscription_products" TO "authenticated";
GRANT ALL ON TABLE "public"."subscription_products" TO "service_role";



GRANT ALL ON TABLE "public"."subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."subscriptions" TO "service_role";



GRANT ALL ON TABLE "public"."tags" TO "anon";
GRANT ALL ON TABLE "public"."tags" TO "authenticated";
GRANT ALL ON TABLE "public"."tags" TO "service_role";



GRANT ALL ON TABLE "public"."tasks" TO "anon";
GRANT ALL ON TABLE "public"."tasks" TO "authenticated";
GRANT ALL ON TABLE "public"."tasks" TO "service_role";



GRANT ALL ON TABLE "public"."ticket_analytics" TO "anon";
GRANT ALL ON TABLE "public"."ticket_analytics" TO "authenticated";
GRANT ALL ON TABLE "public"."ticket_analytics" TO "service_role";



GRANT ALL ON TABLE "public"."ticket_buyer_profiles" TO "anon";
GRANT ALL ON TABLE "public"."ticket_buyer_profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."ticket_buyer_profiles" TO "service_role";



GRANT ALL ON TABLE "public"."ticket_pages" TO "anon";
GRANT ALL ON TABLE "public"."ticket_pages" TO "authenticated";
GRANT ALL ON TABLE "public"."ticket_pages" TO "service_role";



GRANT ALL ON TABLE "public"."user_event_reminders" TO "anon";
GRANT ALL ON TABLE "public"."user_event_reminders" TO "authenticated";
GRANT ALL ON TABLE "public"."user_event_reminders" TO "service_role";



GRANT ALL ON TABLE "public"."user_profiles" TO "anon";
GRANT ALL ON TABLE "public"."user_profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."user_profiles" TO "service_role";



GRANT ALL ON TABLE "public"."vendors" TO "anon";
GRANT ALL ON TABLE "public"."vendors" TO "authenticated";
GRANT ALL ON TABLE "public"."vendors" TO "service_role";



GRANT ALL ON TABLE "public"."visitor_schedules" TO "anon";
GRANT ALL ON TABLE "public"."visitor_schedules" TO "authenticated";
GRANT ALL ON TABLE "public"."visitor_schedules" TO "service_role";



GRANT ALL ON TABLE "public"."volunteers" TO "anon";
GRANT ALL ON TABLE "public"."volunteers" TO "authenticated";
GRANT ALL ON TABLE "public"."volunteers" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
