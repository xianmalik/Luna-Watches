import BrandsGrid from "@/blocks/BrandsGrid";
import CollectionsGrid from "@/blocks/CollectionsGrid";
import FeaturesGrid from "@/blocks/FeaturesGrid";
import HeroSlider from "@/blocks/HeroSlider";
import ProductsGrid from "@/blocks/ProductsGrid";
import { dummyjsonFetch } from "@/lib/dummyjson";
import {
  HERO_SLIDES,
  HOME_BRANDS,
  HOME_COLLECTIONS,
  HOME_FEATURES,
  HOME_PRODUCTS_LIMIT,
} from "@/lib/app.settings";
import type { ProductsResponse } from "@/types/products";

export default async function Home() {
  const { products } = await dummyjsonFetch<ProductsResponse>("/products", {
    params: { limit: String(HOME_PRODUCTS_LIMIT) },
  });

  return (
    <>
      <HeroSlider slides={HERO_SLIDES} />
      <BrandsGrid title="Popular Brands" brands={HOME_BRANDS} />
      <CollectionsGrid title="Collections" collections={HOME_COLLECTIONS} />
      <ProductsGrid title="New Arrivals" products={products} />
      <FeaturesGrid title="Trusted Online Shopping Since 2000" features={HOME_FEATURES} />
    </>
  );
}
