import { redirect } from "next/navigation";
import { AdminShell, btn } from "@/components/admin-ui";
import { CopyPhotos } from "@/components/copy-photos";
import { importCsv } from "@/lib/admin-actions";
import { isAdmin } from "@/lib/auth";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export default async function AdminImport({ searchParams }: { searchParams: Promise<{ imported?: string; error?: string }> }) {
  if (!(await isAdmin())) redirect("/admin");
  const q = await searchParams;
  const db = sql();
  const pending = db ? ((await db`SELECT count(*)::int AS n FROM products WHERE EXISTS (SELECT 1 FROM jsonb_array_elements_text(images) u WHERE u LIKE 'http%')`) as Array<{ n: number }>)[0].n : 0;
  return (
    <AdminShell title="Import from Wix" notice={q.imported ? `Imported ${q.imported} products. Now copy their photos below.` : null}>
      {q.error ? <p role="alert" className="mb-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-900">{q.error === "2" ? "That file does not look like a Wix products export (no Name and Price columns)." : "Choose a CSV file first."}</p> : null}
      <ol className="max-w-2xl list-decimal space-y-3 pl-5 text-lg text-ink/80">
        <li>In Wix, open <strong>Store Products</strong>, then <strong>More Actions</strong> and <strong>Export</strong>. That downloads a CSV file.</li>
        <li>Choose that file below and press Import. Existing products with the same name are updated, nothing is deleted.</li>
        <li>Press <strong>Copy photos to this site</strong> so the pictures live here and never depend on Wix.</li>
      </ol>
      <form action={importCsv} className="mt-8 max-w-xl rounded-2xl border border-ink/15 bg-white p-6">
        <input type="file" name="csv" accept=".csv,text/csv" required className="block w-full text-sm file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-ivory" />
        <button className={`${btn} mt-5`}>Import products</button>
      </form>
      <div className="mt-8 max-w-xl rounded-2xl border border-ink/15 bg-white p-6"><CopyPhotos pending={pending} /></div>
    </AdminShell>
  );
}
