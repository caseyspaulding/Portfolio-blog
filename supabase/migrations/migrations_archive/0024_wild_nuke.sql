ALTER TABLE "forms" DROP CONSTRAINT "forms_creator_id_user_profiles_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forms" ADD CONSTRAINT "forms_creator_id_user_profiles_user_id_fk" FOREIGN KEY ("creator_id") REFERENCES "public"."user_profiles"("user_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
