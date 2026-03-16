'use client'

import FilterSection from './FilterSection'
import AvailabilityFilter from './modules/AvailabilityFilter'
import BrandFilter from './modules/BrandFilter'
import CategoryFilter from './modules/CategoryFilter'
import PriceFilter from './modules/PriceFilter'
import RatingFilter from './modules/RatingFilter'
import type { ProductFilters } from './types'

interface FilterSidebarProps {
  filters: ProductFilters
  onFilterChange: (filters: ProductFilters) => void
  brands: string[]
  categories: { slug: string; name: string; count: number }[]
  priceMin: number
  priceMax: number
  availabilityStatuses: string[]
}

export default function FilterSidebar({
  filters,
  onFilterChange,
  brands,
  categories,
  priceMin,
  priceMax,
  availabilityStatuses,
}: FilterSidebarProps) {
  function update(partial: Partial<ProductFilters>) {
    onFilterChange({ ...filters, ...partial })
  }

  return (
    <aside className="w-64 shrink-0">
      <FilterSection title="Price">
        <PriceFilter
          min={priceMin}
          max={priceMax}
          value={filters.priceRange}
          onChange={(priceRange) => update({ priceRange })}
        />
      </FilterSection>

      <FilterSection title="Brand">
        <BrandFilter
          brands={brands}
          selected={filters.brands}
          onChange={(brands) => update({ brands })}
        />
      </FilterSection>

      <FilterSection title="Category">
        <CategoryFilter
          categories={categories}
          selected={filters.categories}
          onChange={(categories) => update({ categories })}
        />
      </FilterSection>

      <FilterSection title="Rating">
        <RatingFilter
          value={filters.minRating}
          onChange={(minRating) => update({ minRating })}
        />
      </FilterSection>

      <FilterSection title="Availability">
        <AvailabilityFilter
          statuses={availabilityStatuses}
          selected={filters.availability}
          onChange={(availability) => update({ availability })}
        />
      </FilterSection>
    </aside>
  )
}
