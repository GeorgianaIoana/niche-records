import { ProductGridSkeleton, Skeleton } from "@/components/ui";

export default function ProductsLoading() {
  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header skeleton */}
        <div className="mb-10">
          <Skeleton className="h-10 w-48 mb-4" />
          <Skeleton className="h-5 w-24" />
        </div>

        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
          {/* Sidebar skeleton */}
          <aside className="hidden lg:block space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-40 w-full" />
          </aside>

          {/* Grid skeleton */}
          <div>
            <ProductGridSkeleton count={8} />
          </div>
        </div>
      </div>
    </div>
  );
}
