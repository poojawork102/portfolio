import { neon } from "@neondatabase/serverless";

/** Neon Postgres client, or null when DATABASE_URL isn't set (local development). */
export const sql = process.env.DATABASE_URL ? neon(process.env.DATABASE_URL) : null;
