import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  className?: string;
  columns?: 2 | 3 | 4;
}

export function ProductGrid({
  products,
  className,
  columns = 4,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-400">No products found.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
