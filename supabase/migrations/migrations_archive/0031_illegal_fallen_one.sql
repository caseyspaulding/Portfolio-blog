ALTER TABLE "blog_posts" RENAME COLUMN "author" TO "author_id";--> statement-breakpoint
ALTER TABLE "blog_posts" DROP CONSTRAINT "blog_posts_author_authors_id_fk";
--> statement-breakpoint
ALTER TABLE "blog_posts" ALTER COLUMN "author_id" SET DATA TYPE serial;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
