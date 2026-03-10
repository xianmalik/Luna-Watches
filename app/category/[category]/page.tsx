import Link from "next/link";
import type { Metadata } from "next";
import { dummyjsonFetch } from "@/lib/dummyjson";
import type { ProductsResponse, ProductCategory } from "@/types/products";
import CategoryPageClient from "./CategoryPageClient";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  try {
    const categories = await dummyjsonFetch<ProductCategory[]>(
      "/products/categories"
    );
    const match = categories.find((c) => c.slug === category);
    if (!match) {
      return { title: "Category Not Found | Luna Store" };
    }
    return {
      title: `${match.name} | Luna Store`,
      description: `Browse our ${match.name} collection at Luna Store.`,
    };
  } catch {
    return { title: "Category Not Found | Luna Store" };
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  let categoriesData: ProductCategory[] = [];
  try {
    categoriesData = await dummyjsonFetch<ProductCategory[]>(
      "/products/categories"
    );
  } catch {
    // continue with empty categories
  }

  const match = categoriesData.find((c) => c.slug === category);

  if (!match) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10">
        <nav className="text-sm text-neutral-500 mb-8">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          {" / "}
          <Link href="/category" className="hover:text-black transition-colors">
            Categories
          </Link>
          {" / "}
          <span className="text-black">{category}</span>
        </nav>

        <h1 className="text-2xl font-light uppercase tracking-wider mb-8">
          Category Not Found
        </h1>

        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-sm text-neutral-500 mb-6">
            The category &ldquo;{category}&rdquo; does not exist.
          </p>
          <Link
            href="/products"
            className="text-sm uppercase tracking-wider font-medium underline underline-offset-4 hover:text-neutral-600 transition-colors"
          >
            Browse All Products
          </Link>
        </div>
      </section>
    );
  }

  let productsData: ProductsResponse | null = null;
  try {
    productsData = await dummyjsonFetch<ProductsResponse>(
      `/products/category/${category}`,
      { params: { limit: "194" } }
    );
  } catch {
    // continue with no products
  }

  const allProducts = productsData?.products ?? [];

  const brands = Array.from(
    new Set(allProducts.map((p) => p.brand).filter(Boolean))
  ).sort();

  const prices = allProducts.map((p) => p.price);
  const priceMin = prices.length > 0 ? Math.floor(Math.min(...prices)) : 0;
  const priceMax = prices.length > 0 ? Math.ceil(Math.max(...prices)) : 1000;

  const availabilityStatuses = Array.from(
    new Set(allProducts.map((p) => p.availabilityStatus).filter(Boolean))
  ).sort();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <nav className="text-sm text-neutral-500 mb-8">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        {" / "}
        <Link href="/category" className="hover:text-black transition-colors">
          Categories
        </Link>
        {" / "}
        <span className="text-black">{match.name}</span>
      </nav>

      <h1 className="text-2xl font-light uppercase tracking-wider mb-8">
        {match.name}
      </h1>

      <CategoryPageClient
        allProducts={allProducts}
        brands={brands}
        priceMin={priceMin}
        priceMax={priceMax}
        availabilityStatuses={availabilityStatuses}
      />
    </section>
  );
}
