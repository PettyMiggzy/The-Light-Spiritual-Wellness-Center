export type Energy = "rest" | "clarity" | "release" | "wonder";

export const questions: Array<{ q: string; options: Array<{ label: string; e: Energy }> }> = [
  { q: "What have you been carrying lately?", options: [
    { label: "Stress and a tired body", e: "rest" }, { label: "Big decisions and questions", e: "clarity" },
    { label: "Old heaviness I want gone", e: "release" }, { label: "A feeling that something is next", e: "wonder" } ] },
  { q: "What would feel best right now?", options: [
    { label: "Lying down while someone else does the work", e: "rest" }, { label: "Someone helping me see the path", e: "clarity" },
    { label: "A real reset, mind and space", e: "release" }, { label: "Seeing something I have never seen before", e: "wonder" } ] },
  { q: "Pick the sound that calls you.", options: [
    { label: "Deep humming and singing bowls", e: "rest" }, { label: "Silence, then a single bell", e: "clarity" },
    { label: "Wind and rolling water", e: "release" }, { label: "A shimmering chime", e: "wonder" } ] },
];

export const results: Record<Energy, { title: string; blurb: string; slug: string; cta: string }> = {
  rest: { title: "Restoring energy", blurb: "Your body is asking to be held. Let sound and vibration do the work while you finally let go.", slug: "vibro-acoustic-sound-bed", cta: "Try the Sound Bed" },
  clarity: { title: "Seeking energy", blurb: "You are close to an answer. A reading can help you hear what you already know.", slug: "tarot-reading", cta: "Book a Tarot Reading" },
  release: { title: "Clearing energy", blurb: "You are ready to put something down. A chakra and energy cleanse can lighten the load.", slug: "ultimate-session", cta: "See the Ultimate Session" },
  wonder: { title: "Awakening energy", blurb: "Something in you is opening. See your own energy field come to life in color.", slug: "aura-photography", cta: "Book Aura Photography" },
};
