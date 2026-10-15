import { site } from "@/lib/site";

export type Category = string;

export type Product = {
  slug: string;
  name: string;
  price: number;
  category: Category;
  images: string[];
  badge?: "New" | "Pre-order";
  description?: string;
  /** One-of-one specimens can only be bought once. */
  unique: boolean;
  sold?: boolean;
};

const img = (name: string) => `/images/products/${name}.jpg`;

/**
 * 18 real products with their real photos and prices from the current shop. Categories were assigned by hand from
 * the product names. Run `npm run import:products` with a Wix product export to load the full catalog.
 */
const curated: Product[] = [
  { slug: "book-signing-pre-order", name: "Book Signing Pre-Order", price: 21, category: "Gifts & Books", images: [img("book-signing")], badge: "Pre-order", unique: false },
  { slug: "blind-fantasy-book-hardback", name: "Blind Fantasy Book, Hardback", price: 30, category: "Gifts & Books", images: [img("blind-fantasy-books")], unique: false },
  { slug: "mystery-crystal-dragon", name: "Mystery Crystal Dragon", price: 15, category: "Gift Boxes & Crystal Kits", images: [img("mystery-crystal-dragon")], unique: false },
  { slug: "mystery-crystal-pokemon", name: "Mystery Crystal Pokémon", price: 15, category: "Gift Boxes & Crystal Kits", images: [img("mystery-crystal-pokemon")], unique: false },
  { slug: "veszelyite", name: "Veszelyite", price: 42, category: "Raw Pieces", images: [img("veszelyite")], unique: true },
  { slug: "labradorite-sphere", name: "Labradorite Sphere", price: 111, category: "Spheres", images: [img("labradorite-sphere")], unique: true },
  { slug: "heulandite-cluster", name: "Heulandite Cluster", price: 38, category: "Clusters", images: [img("heulandite-cluster"), img("heulandite-cluster-2")], unique: true },
  { slug: "silver-sheen-obsidian", name: "Silver Sheen Obsidian", price: 18, category: "Carvings", images: [img("silver-sheen-obsidian"), img("silver-sheen-obsidian-2")], unique: false },
  { slug: "pink-agate-wings", name: "Pink Agate Wings", price: 65, category: "Carvings", images: [img("pink-agate-wings")], unique: true },
  { slug: "sugar-cube-apophyllite-chalcedony-cluster", name: "“Sugar Cube” Apophyllite & Chalcedony Cluster", price: 44, category: "Clusters", images: [img("sugar-cube-apophyllite"), img("sugar-cube-apophyllite-2")], badge: "New", unique: true },
  { slug: "amethyst-flower-on-chalcedony", name: "Amethyst Flower on Chalcedony", price: 99, category: "Home & Display", images: [img("amethyst-flower")], badge: "New", unique: true },
  { slug: "green-apophyllite-stilbite-cluster", name: "Green Apophyllite, Stilbite Cluster", price: 99, category: "Clusters", images: [img("green-apophyllite-stillbite")], badge: "New", unique: true },
  { slug: "phantom-quartz-cluster", name: "Phantom Quartz Cluster", price: 72, category: "Clusters", images: [img("phantom-quartz"), img("phantom-quartz-2")], badge: "New", unique: true },
  { slug: "karur-amethyst-black-tourmaline-cluster", name: "Karur Amethyst, Black Tourmaline Cluster", price: 64, category: "Clusters", images: [img("karur-amethyst"), img("karur-amethyst-2")], badge: "New", unique: true },
  { slug: "black-obsidian-bat-wings", name: "Black Obsidian Bat Wings", price: 30, category: "Carvings", images: [img("black-obsidian-bat-wings")], unique: true },
  { slug: "red-pyrite-dolomite", name: "Red Pyrite + Dolomite", price: 72, category: "Raw Pieces", images: [img("red-pyrite-dolomite"), img("red-pyrite-dolomite-2")], unique: true },
  { slug: "smokey-quartz-garden-rutile", name: "Smokey Quartz w/ Garden + Rutile", price: 150, category: "Rare & Statement Pieces", images: [img("smokey-quartz-rutile")], unique: true },
  { slug: "apophyllite-stilbite", name: "Apophyllite + Stilbite", price: 68, category: "Clusters", images: [img("apophyllite-stillbite")], unique: true },
];

export const seedProducts: Product[] = curated;

export const maxQty = 9;


export function money(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

export const shippingNote = site.promo.text;
