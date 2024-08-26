import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { usersTable } from "./schemas/users";
import * as users from "./schemas/users";

config({ path: ".env" }); // or .env.local

const connectionString = process.env.EXPO_PUBLIC_SUPABASE_URL;

export const client = postgres(connectionString!, { prepare: false });

export const db = drizzle(client, { schema: { ...users } });
