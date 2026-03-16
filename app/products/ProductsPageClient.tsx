'use client'

import { useState } from 'react'
import FilterSidebar from '@/components/filters/FilterSidebar'
import FilterToolbar from '@/components/filters/FilterToolbar'
import type { ProductFilters } from '@/components/filters/types'
import { createDefaultFilters } from '@/components/filters/types'
import { useProductFilters } from '@/components/filters/useProductFilters'
import ProductCard from '@/components/products/ProductCard'
import type { Product } from '@/types/products'

interface ProductsPageClientProps {
  allProducts: Product[]
  brands: string[]
  categories: { slug: string; name: string; count: number }[]
  priceMin: number
  priceMax: number
  availabilityStatuses: string[]
}

export default function ProductsPageClient({
  allProducts,
  brands,
  categories,
  priceMin,
  priceMax,
  availabilityStatuses,
}: ProductsPageClientProps) {
  const [filters, setFilters] = useState<ProductFilters>(() =>
    createDefaultFilters(priceMin, priceMax)
  )
  const [filtersVisible, setFiltersVisible] = useState(true)

  const filteredProducts = useProductFilters(allProducts, filters)

  const sortValue = `${filters.sortBy}-${filters.order}`

  function handleSortChange(value: string) {
    const [sortBy, order] = value.split('-') as [string, 'asc' | 'desc']
    setFilters((prev) => ({ ...prev, sortBy, order }))
  }

  return (
    <div>
      <FilterToolbar
        filtersVisible={filtersVisible}
        onToggleFilters={() => setFiltersVisible(!filtersVisible)}
        sortValue={sortValue}
        onSortChange={handleSortChange}
        productCount={filteredProducts.length}
      />

      <div className="flex gap-8 mt-6">
        {filtersVisible && (
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            brands={brands}
            categories={categories}
            priceMin={priceMin}
            priceMax={priceMax}
            availabilityStatuses={availabilityStatuses}
          />
        )}

        <div className="flex-1">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-20">
              <p className="text-sm text-neutral-500">
                No products match your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
