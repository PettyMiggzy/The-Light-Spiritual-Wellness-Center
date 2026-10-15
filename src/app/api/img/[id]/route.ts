import { sql } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = sql();
  if (!db || !/^[a-z0-9]{8,40}$/.test(id)) return new Response("Not found", { status: 404 });
  const rows = (await db`SELECT mime, data FROM images WHERE id = ${id}`) as Array<{ mime: string; data: Uint8Array | Buffer | string }>;
  const row = rows[0];
  if (!row) return new Response("Not found", { status: 404 });
  const raw = row.data;
  const bytes = typeof raw === "string" ? Buffer.from(raw.replace(/^\\x/, ""), "hex") : Buffer.from(raw);
  return new Response(new Uint8Array(bytes), { headers: { "Content-Type": row.mime, "Cache-Control": "public, max-age=31536000, immutable" } });
}
