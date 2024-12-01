--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "authors" (
  "id" SERIAL PRIMARY KEY,
  "slug" VARCHAR(255) NOT NULL UNIQUE,
  "name" VARCHAR(100) NOT NULL,
  "bio" TEXT,
  "avatar_url" VARCHAR(255),
  "created_at" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updated_at" TIMESTAMP DEFAULT NOW() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blog_posts"
ADD COLUMN IF NOT EXISTS "author_id" INTEGER;
--> statement-breakpoint
INSERT INTO "authors" ("slug", "name", "bio", "avatar_url")
VALUES ('casey-spaulding', 'Casey Spaulding', 'Founder and Lead Developer at EventJacket', '/images/casey.jpg');
--> statement-breakpoint
UPDATE "blog_posts"
SET "author_id" = (SELECT "id" FROM "authors" WHERE "slug" = 'casey-spaulding')
WHERE "author_id" IS NULL;
--> statement-breakpoint
ALTER TABLE "blog_posts"
ALTER COLUMN "author_id" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "blog_posts"
ADD CONSTRAINT "blog_posts_author_id_fkey"
FOREIGN KEY ("author_id") REFERENCES "authors"("id")
ON DELETE NO ACTION ON UPDATE NO ACTION;
