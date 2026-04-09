import { Skeleton } from "@/components/ui";

export default function ProductDetailLoading() {
  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link skeleton */}
        <Skeleton className="h-5 w-32 mb-8" />

        {/* Product detail skeleton */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Image skeleton */}
          <Skeleton className="aspect-square rounded-2xl mb-8 lg:mb-0" />

          {/* Info skeleton */}
          <div className="space-y-6">
            <div className="flex gap-3">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
