ALTER TABLE "blog_posts" ALTER COLUMN "difficulty_level" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "blog_posts" ALTER COLUMN "categories" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "blog_posts" ALTER COLUMN "technologies" DROP DEFAULT;