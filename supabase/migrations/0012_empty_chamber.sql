ALTER TABLE "messages" DROP CONSTRAINT "messages_sender_id_unique";--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "translated_message" SET NOT NULL;