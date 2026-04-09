import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { ProductGrid } from "@/components/product";
import { getProductBySlug, getProductsByCategory } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const product = getProductBySlug(category, slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href={`/products/${category}`}
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to {category.toUpperCase()}
        </Link>

        {/* Product detail */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#122535] to-[#0d1a28] border border-[#1e3a50]/30 mb-8 lg:mb-0">
            <Image
              src={product.images[0]?.url || "/placeholder.jpg"}
              alt={product.images[0]?.alt || product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-[#030810]/70 flex items-center justify-center">
                <span className="text-lg font-medium text-gray-300">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="gold">{product.format}</Badge>
              {product.genre.map((g) => (
                <Badge key={g} variant="outline">
                  {g}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl lg:text-4xl font-extralight text-white tracking-tight mb-2">
              {product.name}
            </h1>
            <p className="text-xl text-gray-400 mb-6">{product.artist}</p>

            <p className="text-3xl font-medium text-gold mb-8">
              {formatPrice(product.price)}
            </p>

            {product.description && (
              <p className="text-gray-400 leading-relaxed mb-8 font-light">
                {product.description}
              </p>
            )}

            <AddToCartButton product={product} className="mb-8" />

            {/* Details */}
            <div className="border-t border-[#1e3a50]/30 pt-8">
              {product.releaseYear && (
                <div className="flex justify-between py-3 border-b border-[#1e3a50]/30">
                  <span className="text-gray-400">Release Year</span>
                  <span className="text-white">{product.releaseYear}</span>
                </div>
              )}
              <div className="flex justify-between py-3 border-b border-[#1e3a50]/30">
                <span className="text-gray-400">Format</span>
                <span className="text-white">{product.format}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-[#1e3a50]/30">
                <span className="text-gray-400">Availability</span>
                <span className={product.inStock ? "text-green-400" : "text-red-400"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            {/* Tracklist */}
            {product.tracklist && product.tracklist.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-medium text-white mb-4 tracking-wide">
                  Tracklist
                </h2>
                <div className="space-y-2">
                  {product.tracklist.map((track) => (
                    <div
                      key={track.number}
                      className="flex items-center justify-between py-2 border-b border-[#1e3a50]/30 last:border-0"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 w-6">
                          {track.number}
                        </span>
                        <span className="text-gray-300">{track.title}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {track.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20 lg:mt-28">
            <h2 className="text-2xl font-extralight text-white tracking-tight mb-8">
              You May Also Like
            </h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </section>
        )}
      </div>
    </div>
  );
}
