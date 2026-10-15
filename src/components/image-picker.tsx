"use client";

import { useRef, useState } from "react";

async function shrink(file: File): Promise<File> {
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 1400 / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/jpeg", 0.82));
    return blob ? new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" }) : file;
  } catch {
    return file;
  }
}

/** Existing photos (reorder or remove) plus new uploads that are shrunk in the browser first. */
export function ImagePicker({ existing }: { existing: string[] }) {
  const [kept, setKept] = useState(existing);
  const [busy, setBusy] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const input = useRef<HTMLInputElement>(null);

  async function onChange() {
    const files = Array.from(input.current?.files ?? []);
    if (!files.length) return setPreviews([]);
    setBusy(true);
    const small = await Promise.all(files.map(shrink));
    const dt = new DataTransfer();
    small.forEach((f) => dt.items.add(f));
    input.current!.files = dt.files;
    setPreviews(small.map((f) => URL.createObjectURL(f)));
    setBusy(false);
  }
  const move = (i: number, d: number) => setKept((k) => { const n = [...k]; const j = i + d; if (j < 0 || j >= n.length) return k; [n[i], n[j]] = [n[j], n[i]]; return n; });

  return (
    <div>
      <p className="mb-1.5 text-sm font-medium">Photos <span className="font-normal text-ink/60">(the first one is the main photo)</span></p>
      {kept.length > 0 ? (
        <ul className="mb-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {kept.map((src, i) => (
            <li key={src} className="rounded-xl border border-ink/15 bg-white p-2">
              <input type="hidden" name="keep" value={src} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="aspect-square w-full rounded-lg object-cover" />
              <div className="mt-2 flex justify-between text-sm">
                <button type="button" onClick={() => move(i, -1)} aria-label="Move earlier" className="px-2 py-1 hover:bg-ink/5">←</button>
                <button type="button" onClick={() => setKept(kept.filter((u) => u !== src))} className="px-2 py-1 text-red-700 hover:bg-red-50">Remove</button>
                <button type="button" onClick={() => move(i, 1)} aria-label="Move later" className="px-2 py-1 hover:bg-ink/5">→</button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
      <input ref={input} type="file" name="photos" accept="image/*" multiple onChange={onChange} className="block w-full rounded-xl border border-dashed border-ink/30 bg-white p-4 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-ivory" />
      {busy ? <p className="mt-2 text-sm text-ink/60">Preparing photos…</p> : null}
      {previews.length > 0 ? (
        <ul className="mt-3 flex flex-wrap gap-2">{previews.map((p) => (
          // eslint-disable-next-line @next/next/no-img-element
          <li key={p}><img src={p} alt="" className="size-16 rounded-lg object-cover" /></li>
        ))}</ul>
      ) : null}
    </div>
  );
}
