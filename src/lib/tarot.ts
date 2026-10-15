// Original short readings for the 22 Major Arcana. For reflection and entertainment, not prediction.
export type Card = { n: string; name: string; glyph: string; keywords: string; message: string };

export const deck: Card[] = [
  { n: "0", name: "The Fool", glyph: "☼", keywords: "Beginnings · Trust · Leap", message: "A fresh start is asking for a little courage. You do not need the whole map, only the next step." },
  { n: "I", name: "The Magician", glyph: "∞", keywords: "Will · Skill · Focus", message: "You already hold what you need. Point your attention at one thing and let it work." },
  { n: "II", name: "The High Priestess", glyph: "☾", keywords: "Intuition · Stillness", message: "The answer is quieter than the noise. Sit with it and listen before you decide." },
  { n: "III", name: "The Empress", glyph: "❀", keywords: "Nurture · Abundance", message: "Tend what you love. Growth comes from care and patience, not force." },
  { n: "IV", name: "The Emperor", glyph: "▲", keywords: "Structure · Steadiness", message: "Build a simple routine around what matters. Order is a kind of freedom." },
  { n: "V", name: "The Hierophant", glyph: "✦", keywords: "Tradition · Guidance", message: "Lean on a teacher, a ritual, or a practice that has already stood the test of time." },
  { n: "VI", name: "The Lovers", glyph: "♡", keywords: "Choice · Alignment", message: "Choose what matches your values, not what is merely easy. Real connection follows honesty." },
  { n: "VII", name: "The Chariot", glyph: "➤", keywords: "Drive · Direction", message: "Hold both reins. Progress comes when your heart and your plan point the same way." },
  { n: "VIII", name: "Strength", glyph: "☉", keywords: "Courage · Gentleness", message: "Soft power wins today. Meet the hard thing with patience and a steady breath." },
  { n: "IX", name: "The Hermit", glyph: "✧", keywords: "Solitude · Insight", message: "Step back for a little while. Your light is clearest when the room is quiet." },
  { n: "X", name: "Wheel of Fortune", glyph: "☸", keywords: "Cycles · Change", message: "Things are turning. What feels stuck is moving, even if you cannot see it yet." },
  { n: "XI", name: "Justice", glyph: "⚖", keywords: "Truth · Balance", message: "Be fair with yourself and with others. Clear facts bring a clear conscience." },
  { n: "XII", name: "The Hanged One", glyph: "⟂", keywords: "Pause · New view", message: "Do not push. Looking at it from another angle may change everything." },
  { n: "XIII", name: "Transformation", glyph: "❋", keywords: "Endings · Renewal", message: "Something is finishing so something truer can begin. Let it go with gratitude." },
  { n: "XIV", name: "Temperance", glyph: "≈", keywords: "Balance · Blend", message: "A little of each, not all of one. Find the middle path and keep your pace." },
  { n: "XV", name: "The Shadow", glyph: "⛧", keywords: "Habits · Release", message: "Notice what you are holding on to out of habit. Naming it loosens its grip." },
  { n: "XVI", name: "The Tower", glyph: "⚡", keywords: "Upheaval · Clarity", message: "What was built on shaky ground may fall. What is true will still be standing." },
  { n: "XVII", name: "The Star", glyph: "✶", keywords: "Hope · Healing", message: "Breathe. Healing is underway, and the sky is clearing. Keep your faith in small things." },
  { n: "XVIII", name: "The Moon", glyph: "☽", keywords: "Dreams · Uncertainty", message: "Not everything is clear yet. Trust your feelings and wait for the morning to show the path." },
  { n: "XIX", name: "The Sun", glyph: "☀", keywords: "Joy · Vitality", message: "Warmth is on the way. Say yes to what lights you up." },
  { n: "XX", name: "Awakening", glyph: "♫", keywords: "Calling · Renewal", message: "You are being called to rise to something. Answer it as the person you are becoming." },
  { n: "XXI", name: "The World", glyph: "◎", keywords: "Completion · Wholeness", message: "A cycle is complete. Honor how far you have come before you begin again." },
];

/** Same card for the same visitor on the same day. */
export function dailyIndex(seed: string, day: string) {
  let h = 2166136261;
  for (const c of seed + day) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return Math.abs(h) % deck.length;
}
