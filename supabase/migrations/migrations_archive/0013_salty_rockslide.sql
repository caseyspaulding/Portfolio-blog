ALTER TABLE "blog_posts" ADD COLUMN "meta_title" varchar(255);--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "meta_description" text;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "is_published" boolean DEFAULT false;