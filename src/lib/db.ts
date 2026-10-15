import { neon } from "@neondatabase/serverless";

/** Returns a SQL tagged-template client, or null when no database is configured (the site then uses its built-in starter data). */
export function sql() {
  const url = process.env.DATABASE_URL;
  return url ? neon(url) : null;
}
