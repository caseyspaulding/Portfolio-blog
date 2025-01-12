ALTER TABLE "blog_posts" ADD COLUMN "reading_time" integer;--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "difficulty_level" varchar(20);--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "categories" jsonb DEFAULT '[]';--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN "technologies" jsonb DEFAULT '[]';