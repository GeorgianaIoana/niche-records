import Link from "next/link";

const categories = [
  { href: "/products", label: "All" },
  { href: "/products/vinyls", label: "Vinyl" },
  { href: "/products/cds", label: "CDs" },
  { href: "/products/dvds", label: "DVDs" },
];

export function CategoryNav() {
  return (
    <section className="border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center gap-12 py-6">
          {categories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="text-sm text-gray-400 hover:text-white transition-colors tracking-wide"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
