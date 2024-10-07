ALTER TABLE "conversations" ALTER COLUMN "my_user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "conversations" ALTER COLUMN "friend_user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "friend_requests" ALTER COLUMN "sender_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "friend_requests" ALTER COLUMN "receiver_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "friends" ALTER COLUMN "my_user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "friends" ALTER COLUMN "friend_user_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "sender_id" SET DATA TYPE integer;