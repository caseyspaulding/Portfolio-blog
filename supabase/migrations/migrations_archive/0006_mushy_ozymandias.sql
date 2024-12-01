ALTER TABLE "events" ALTER COLUMN "start_date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "start_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "end_date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "events" ALTER COLUMN "end_date" SET NOT NULL;