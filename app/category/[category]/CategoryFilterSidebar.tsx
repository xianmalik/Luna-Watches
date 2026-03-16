'use client'

import FilterSection from '@/components/filters/FilterSection'
import AvailabilityFilter from '@/components/filters/modules/AvailabilityFilter'
import BrandFilter from '@/components/filters/modules/BrandFilter'
import PriceFilter from '@/components/filters/modules/PriceFilter'
import RatingFilter from '@/components/filters/modules/RatingFilter'
import type { ProductFilters } from '@/components/filters/types'

interface CategoryFilterSidebarProps {
  filters: ProductFilters
  onFilterChange: (filters: ProductFilters) => void
  brands: string[]
  priceMin: number
  priceMax: number
  availabilityStatuses: string[]
}

export default function CategoryFilterSidebar({
  filters,
  onFilterChange,
  brands,
  priceMin,
  priceMax,
  availabilityStatuses,
}: CategoryFilterSidebarProps) {
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
