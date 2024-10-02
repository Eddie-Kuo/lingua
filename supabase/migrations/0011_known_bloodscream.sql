CREATE TABLE IF NOT EXISTS "conversations" (
	"room_id" text NOT NULL,
	"my_user_id" text NOT NULL,
	"friend_user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"room_id" text NOT NULL,
	"sender_id" text NOT NULL,
	"original_message" text NOT NULL,
	"original_message_language" text NOT NULL,
	"translated_message" text,
	"translated_message_language" text NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "messages_sender_id_unique" UNIQUE("sender_id")
);
