import { redirect } from "next/navigation";
import { AdminShell, btn, field, label } from "@/components/admin-ui";
import { deleteEvent, saveEvent } from "@/lib/admin-actions";
import { isAdmin } from "@/lib/auth";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

type Row = { id: string; title: string; date: string; time: string | null; blurb: string; cta: string };

function EventForm({ e }: { e?: Row }) {
  return (
    <form action={saveEvent} className="grid gap-4 rounded-2xl border border-ink/15 bg-white p-5">
      <input type="hidden" name="id" value={e?.id ?? ""} />
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className={label}>Title</label><input name="title" defaultValue={e?.title} required className={field} /></div>
        <div><label className={label}>Date</label><input name="date" type="date" defaultValue={e?.date} required className={field} /></div>
        <div><label className={label}>Time (optional)</label><input name="time" defaultValue={e?.time ?? ""} placeholder="6:00 – 7:00 pm" className={field} /></div>
        <div><label className={label}>Button</label><select name="cta" defaultValue={e?.cta ?? "tickets"} className={field}><option value="tickets">Buy tickets</option><option value="rsvp">RSVP</option></select></div>
      </div>
      <div><label className={label}>Short description</label><input name="blurb" defaultValue={e?.blurb} className={field} /></div>
      <div className="flex gap-3"><button className={btn}>{e ? "Save changes" : "Add event"}</button>{e ? <button formAction={deleteEvent.bind(null, e.id)} className="h-12 rounded-full border border-red-300 px-5 text-sm text-red-700 hover:bg-red-50">Delete</button> : null}</div>
    </form>
  );
}

export default async function AdminEvents({ searchParams }: { searchParams: Promise<{ saved?: string; deleted?: string; error?: string }> }) {
  if (!(await isAdmin())) redirect("/admin");
  const q = await searchParams;
  const db = sql();
  const rows = db ? ((await db`SELECT id, title, to_char(date, 'YYYY-MM-DD') AS date, time, blurb, cta FROM events ORDER BY date ASC`) as Row[]) : [];
  return (
    <AdminShell title="Events" notice={q.saved ? "Saved." : q.deleted ? "Deleted." : null}>
      {q.error ? <p role="alert" className="mb-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-red-900">Add a title and a date.</p> : null}
      <h2 className="text-3xl">Add an event</h2>
      <div className="mt-4"><EventForm /></div>
      <h2 className="mt-12 text-3xl">Current events</h2>
      {rows.length === 0 ? <p className="mt-3 text-ink/70">No saved events yet. The site is showing the starter events until you add one here, or load the starter catalog from Home.</p> : null}
      <ul className="mt-4 grid gap-4">{rows.map((e) => (<li key={e.id}><EventForm e={e} /></li>))}</ul>
    </AdminShell>
  );
}
