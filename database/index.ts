import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as users from "./schemas/users";
import * as friends from "./schemas/friends";
import * as friendRequests from "./schemas/friend_requests";

config({ path: ".env" }); // or .env.local

const connectionString = process.env.EXPO_PUBLIC_DRIZZLE_CONNECTION_POOLER;

export const client = postgres(connectionString!);

export const db = drizzle(client, {
  schema: { ...users, ...friends, ...friendRequests },
});
