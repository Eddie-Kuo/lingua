CREATE TABLE IF NOT EXISTS "conversations" (
	"room_id" text NOT NULL,
	"my_user_id" integer NOT NULL,
	"friend_user_id" integer NOT NULL
);
