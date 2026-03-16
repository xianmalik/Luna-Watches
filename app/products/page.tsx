import { dummyjsonFetch } from "@/lib/dummyjson";
import { PRODUCTS_PAGE_LIMIT, SITE_NAME } from "@/lib/app.settings";
import type { ProductsResponse, ProductCategory } from "@/types/products";
import ProductsPageClient from "./ProductsPageClient";

export const metadata = {
  title: `All Products | ${SITE_NAME}`,
  description: "Browse our full collection of products.",
};

export default async function ProductsPage() {
  const [productsData, categoriesData] = await Promise.all([
    dummyjsonFetch<ProductsResponse>("/products", {
      params: { limit: String(PRODUCTS_PAGE_LIMIT) },
    }),
    dummyjsonFetch<ProductCategory[]>("/products/categories"),
  ]);

  const allProducts = productsData.products;

  const brands = Array.from(
    new Set(allProducts.map((p) => p.brand).filter(Boolean))
  ).sort();

  const prices = allProducts.map((p) => p.price);
  const priceMin = Math.floor(Math.min(...prices));
  const priceMax = Math.ceil(Math.max(...prices));

  const categoryCounts = new Map<string, number>();
  for (const p of allProducts) {
    categoryCounts.set(p.category, (categoryCounts.get(p.category) ?? 0) + 1);
  }

  const categories = categoriesData.map((cat) => ({
    slug: cat.slug,
    name: cat.name,
    count: categoryCounts.get(cat.slug) ?? 0,
  }));

  const availabilityStatuses = Array.from(
    new Set(allProducts.map((p) => p.availabilityStatus).filter(Boolean))
  ).sort();

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-light uppercase tracking-wider mb-8">
        All Products
      </h1>
      <ProductsPageClient
        allProducts={allProducts}
        brands={brands}
        categories={categories}
        priceMin={priceMin}
        priceMax={priceMax}
        availabilityStatuses={availabilityStatuses}
      />
    </section>
  );
}
