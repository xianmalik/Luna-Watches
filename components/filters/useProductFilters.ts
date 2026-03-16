import { useMemo } from 'react'
import type { Product } from '@/types/products'
import type { ProductFilters } from './types'

export function useProductFilters(
  allProducts: Product[],
  filters: ProductFilters
): Product[] {
  return useMemo(() => {
    let result = allProducts

    result = result.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand))
    }

    if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category))
    }

    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating)
    }

    if (filters.availability.length > 0) {
      result = result.filter((p) =>
        filters.availability.includes(p.availabilityStatus)
      )
    }

    result = [...result].sort((a, b) => {
      const key = filters.sortBy as keyof Product
      const aVal = a[key]
      const bVal = b[key]

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return filters.order === 'asc' ? aVal - bVal : bVal - aVal
      }
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return filters.order === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }
      return 0
    })

    return result
  }, [allProducts, filters])
}
