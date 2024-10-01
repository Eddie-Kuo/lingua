CREATE TABLE IF NOT EXISTS "friend_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"sender_id" text NOT NULL,
	"receiver_id" text NOT NULL
);
