import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { dummyjsonFetch } from "@/lib/dummyjson";
import type { ProductCategory, ProductsResponse } from "@/types/products";

export const metadata: Metadata = {
  title: "Categories | Luna Store",
  description: "Browse all product categories at Luna Store.",
};

export default async function CategoriesPage() {
  let categories: ProductCategory[] = [];
  try {
    categories = await dummyjsonFetch<ProductCategory[]>(
      "/products/categories"
    );
  } catch {
    // continue with empty
  }

  const categoryImages = await Promise.all(
    categories.map(async (cat) => {
      try {
        const data = await dummyjsonFetch<ProductsResponse>(
          `/products/category/${cat.slug}`,
          { params: { limit: "1", select: "thumbnail" } }
        );
        return data.products[0]?.thumbnail ?? null;
      } catch {
        return null;
      }
    })
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <nav className="text-sm text-neutral-500 mb-8">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        {" / "}
        <span className="text-black">Categories</span>
      </nav>

      <h1 className="text-2xl font-light uppercase tracking-wider mb-8">
        Categories
      </h1>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, index) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative block aspect-square overflow-hidden rounded-md bg-neutral-100"
            >
              {categoryImages[index] ? (
                <Image
                  src={categoryImages[index]}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
              <span className="absolute top-5 left-5 text-white text-lg font-medium">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-20">
          <p className="text-sm text-neutral-500">
            No categories available.
          </p>
        </div>
      )}
    </section>
  );
}
