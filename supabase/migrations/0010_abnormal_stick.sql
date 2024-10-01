CREATE TABLE IF NOT EXISTS "friend_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"sender_id" text NOT NULL,
	"receiver_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "friends" (
	"id" serial PRIMARY KEY NOT NULL,
	"my_user_id" text NOT NULL,
	"friend_user_id" text NOT NULL
);
