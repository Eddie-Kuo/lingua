ALTER TABLE "conversations" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "messages" DROP COLUMN IF EXISTS "temp_id";