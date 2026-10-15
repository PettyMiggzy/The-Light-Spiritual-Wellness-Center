export type Service = {
  slug: string;
  name: string;
  short: string;
  body: string[];
  art: string;
  action: "book" | "consult" | "remote";
  note?: string;
};

// Copy comes from the shop's current Services page, lightly edited for typos.
export const services: Service[] = [
  {
    slug: "reiki-energy-healing",
    name: "Reiki Energy Healing",
    short: "Release stress and clear blockages with a certified Holy Fire Reiki Master.",
    body: [
      "Energy healing sessions are used to reduce stress and anxiety and promote relaxation. During a Reiki session, a certified Holy Fire Reiki Master will scan your energy field to identify and clear away blockages.",
      "This technique balances the body's energy centers, supporting body, mind, and spirit.",
    ],
    art: "/images/art/reiki.jpg",
    action: "book",
  },
  {
    slug: "vibro-acoustic-sound-bed",
    name: "Vibro-Acoustic Sound Bed",
    short: "Low-frequency sound and music carried straight into the body on a vibroacoustic table.",
    body: [
      "During a Sound Bed session, frequencies fill your body as you relax on a special bed equipped with low-frequency transducers. The treatment uses sinusoidal, low-frequency (30 to 120 Hz) sound pressure waves, blended with music, to carry sound directly into the body.",
      "It is helpful for muscle relaxation, increased circulation, and pain reduction, and it reaches areas of the physical and emotional body where we often carry tension or stress.",
      "Your session is customizable. Depending on its length, you may be able to combine frequencies, such as one for a physical ailment like arthritis and one for spiritual elevation such as “Enlightenment.”",
    ],
    art: "/images/art/sound.jpg",
    action: "book",
  },
  {
    slug: "ultimate-session",
    name: "Ultimate Session",
    short: "Sound bed, crystal light, and Reiki together. An immersive session for the whole body.",
    body: [
      "An Ultimate Session is an immersive experience that stimulates the senses with sound, vibration, color, light, aromatherapy, and energy.",
      "Option one: 60 minutes on the Vibro-Acoustic Sound Bed with a Chakra Balance and Energy Cleanse from our Reiki Master. Essential oils are diffused and crystals are placed on the body to restore body, mind, and spirit.",
      "Option two: the Vibro-Acoustic Sound Bed, the Crystal Light Bed, and Reiki. Healing instruments and crystal layouts may be used as well.",
    ],
    art: "/images/art/ultimate.jpg",
    action: "book",
  },
  {
    slug: "crystal-light-therapy",
    name: "Crystal Light Therapy",
    short: "Quartz crystals and chakra-colored light over your body to cleanse, balance, and align.",
    body: [
      "Our Crystal Light Bed has highly polished quartz crystals suspended about 12 inches above your body. Colored lights, chosen to match the frequencies of the chakra colors, shine through the crystals to each respective chakra.",
      "The lights cleanse, balance, and align your energies, helping remove blockages and lift the vibration of mind, body, and spirit for overall wellness and relaxation.",
    ],
    art: "/images/art/crystal.jpg",
    action: "book",
  },
  {
    slug: "aura-photography",
    name: "Aura Photography",
    short: "See your energy field in real time with the Aura Cloud 3D biofeedback system.",
    body: [
      "Your aura is the energy field that surrounds your body. It can reflect the current stage of your life, your personality traits, and more.",
      "The Aura Cloud 3D system uses biofeedback technology to show your aura live. Your report shows aura colors, “aura power,” yin and yang balance, chakra strength, and more. Detailed reports are available printed or emailed.",
    ],
    art: "/images/art/aura.jpg",
    action: "book",
  },
  {
    slug: "chakra-balance",
    name: "Chakra Balance",
    short: "A check and clear of your chakras by our Reiki Master.",
    body: [
      "Enjoy a chakra balance, check, and clear with our Reiki Master. You’ll leave feeling reconnected to your chakras with balanced energy.",
      "Add a Chakra Balance Guided Meditation on the Vibro-Acoustic Sound Bed, or Chakra Crystal Light Therapy, to your session.",
    ],
    note: "This is not a full energy cleansing of body, mind, and spirit. It is solely a chakra rebalance.",
    art: "/images/art/chakra.jpg",
    action: "book",
  },
  {
    slug: "massage-therapy",
    name: "Massage Therapy",
    short: "Therapeutic massage by LMT Ashley Simpson.",
    body: [
      "Massage manipulates the soft tissues of the body, such as muscles, tendons, and ligaments, with techniques like rubbing, kneading, and stroking. The goal is to promote relaxation, reduce pain and muscle tension, improve circulation, and support overall well-being.",
      "This service is performed by LMT Ashley Simpson.",
    ],
    art: "/images/art/massage.jpg",
    action: "book",
  },
  {
    slug: "tarot-reading",
    name: "Tarot Reading",
    short: "A remote reading from the comfort of your home.",
    body: [
      "Tarot is a form of divination in which a reader uses a deck of 78 cards, the Major and Minor Arcana, to interpret your situation and offer guidance and self-reflection rather than definitive predictions.",
      "These readings are not done in the store. After you purchase, the reader will contact you within 48 hours to schedule your reading.",
    ],
    art: "/images/art/tarot.jpg",
    action: "remote",
  },
  {
    slug: "crystal-cleansing",
    name: "Crystal Cleansing",
    short: "Bring in your own crystals for a fresh start.",
    body: [
      "Bring your personal crystals to The Light to have them energetically cleansed. This removes any energy they hold and gives them a fresh start.",
      "If your crystals aren’t working like they used to, or you feel down around them, it may be due to the energy they’re holding. Salt, smoke, and sound may be used, and each stone is infused with Reiki and white light energy.",
    ],
    art: "/images/art/cleanse.jpg",
    action: "book",
  },
  {
    slug: "home-office-energy-cleansing",
    name: "Home, Office & Business Energy Cleansing",
    short: "Clear lingering energy from your space and fill it with light.",
    body: [
      "Energy cleansings are performed by our Reiki Master and Energy Healer. They remove negative energy lingering in your space and fill it with light. If you love the vibe of The Light when you walk in, this is how you can bring it to your own oasis.",
      "It is a good fit for a new move, marriage, business, or birth, and for after a breakup, a death in the home, or any heavy feelings in the space.",
      "Pricing varies with the size of the location and the extent of the cleansing. Life force energy, smoke, singing bowls, crystals, and more may be used.",
    ],
    art: "/images/art/home.jpg",
    action: "consult",
  },
  {
    slug: "corporate-community-wellness",
    name: "Corporate & Community Wellness",
    short: "Bring spiritual wellness to your office or HOA.",
    body: [
      "Corporate and Community Wellness by The Light is a way to bring spiritual wellness to you. Our programs are uplifting for body, mind, and spirit.",
      "With an array of options, we’re happy to build a customized wellness program for your HOA or office.",
    ],
    art: "/images/art/corporate.jpg",
    action: "consult",
  },
];

export const featuredServiceSlugs = [
  "reiki-energy-healing",
  "vibro-acoustic-sound-bed",
  "crystal-light-therapy",
  "aura-photography",
  "massage-therapy",
  "tarot-reading",
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
