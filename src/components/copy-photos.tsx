"use client";

import { useState } from "react";
import { copyPhotos } from "@/lib/admin-actions";
import { btn } from "@/components/admin-ui";

export function CopyPhotos({ pending }: { pending: number }) {
  const [left, setLeft] = useState(pending);
  const [state, setState] = useState<"idle" | "running" | "done" | "error">("idle");
  const [copied, setCopied] = useState(0);

  async function run() {
    setState("running");
    try {
      for (let guard = 0; guard < 400; guard++) {
        const r = await copyPhotos();
        setCopied((c) => c + r.copied);
        setLeft(r.remaining);
        if (r.remaining === 0) break;
      }
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (pending === 0 && state === "idle") return <p className="text-ink/70">All product photos are stored on this site.</p>;
  return (
    <div>
      <p className="text-ink/80">{left} {left === 1 ? "product has" : "products have"} photos still linked from the old site. Copy them here so they never disappear.</p>
      <button type="button" onClick={run} disabled={state === "running"} className={`${btn} mt-4`}>{state === "running" ? `Copying… ${left} left` : state === "done" ? "Done. Copy again?" : "Copy photos to this site"}</button>
      {state === "error" ? <p className="mt-3 text-red-700">That stopped early. Press the button again to continue.</p> : null}
      {copied > 0 ? <p className="mt-3 text-sm text-ink/70">{copied} photos copied.</p> : null}
    </div>
  );
}
