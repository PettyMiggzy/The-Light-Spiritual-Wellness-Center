import { redirect } from "next/navigation";
import { AdminShell, btn, field, label } from "@/components/admin-ui";
import { saveSettings } from "@/lib/admin-actions";
import { isAdmin } from "@/lib/auth";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminSettings({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  if (!(await isAdmin())) redirect("/admin");
  const q = await searchParams;
  const s = await getSettings();
  return (
    <AdminShell title="Site message" notice={q.saved ? "Saved. It shows across the top of the site." : null}>
      <form action={saveSettings} className="grid max-w-xl gap-5">
        <div><label className={label} htmlFor="announcement">Banner text</label><input id="announcement" name="announcement" defaultValue={s.announcement ?? ""} placeholder="New crystals just arrived. Free shipping over $25." className={field} /><p className="mt-2 text-sm text-ink/60">Leave it empty to hide the banner.</p></div>
        <div><button className={btn}>Save</button></div>
      </form>
    </AdminShell>
  );
}
