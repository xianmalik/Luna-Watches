import { Suspense } from 'react'
import BrandsGrid from '@/blocks/BrandsGrid'
import CollectionsGrid from '@/blocks/CollectionsGrid'
import FeaturesGrid from '@/blocks/FeaturesGrid'
import HeroSlider from '@/blocks/HeroSlider'
import ProductsGrid from '@/blocks/ProductsGrid'
import {
  HERO_SLIDES,
  HOME_BRANDS,
  HOME_COLLECTIONS,
  HOME_FEATURES,
  HOME_PRODUCTS_LIMIT,
} from '@/lib/app.settings'
import { dummyjsonFetch } from '@/lib/dummyjson'
import type { ProductsResponse } from '@/types/products'

async function NewArrivals() {
  const { products } = await dummyjsonFetch<ProductsResponse>('/products', {
    params: { limit: String(HOME_PRODUCTS_LIMIT) },
  })
  return <ProductsGrid title="New Arrivals" products={products} />
}

export default function Home() {
  return (
    <>
      <HeroSlider slides={HERO_SLIDES} />
      <BrandsGrid title="Popular Brands" brands={HOME_BRANDS} />
      <CollectionsGrid title="Collections" collections={HOME_COLLECTIONS} />
      <Suspense
        fallback={
          <section className="container mx-auto px-4 py-12">
            <div className="h-6 w-40 bg-neutral-200 rounded animate-pulse mb-8" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Array.from({ length: 5 }, (_, i) => `skeleton-${i}`).map(
                (key) => (
                  <div
                    key={key}
                    className="aspect-square bg-neutral-200 rounded animate-pulse"
                  />
                )
              )}
            </div>
          </section>
        }
      >
        <NewArrivals />
      </Suspense>
      <FeaturesGrid
        title="Trusted Online Shopping Since 2000"
        features={HOME_FEATURES}
      />
    </>
  )
}
