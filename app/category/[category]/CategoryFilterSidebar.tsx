"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductFilters } from "@/components/filters/types";
import PriceFilter from "@/components/filters/modules/PriceFilter";
import BrandFilter from "@/components/filters/modules/BrandFilter";
import RatingFilter from "@/components/filters/modules/RatingFilter";
import AvailabilityFilter from "@/components/filters/modules/AvailabilityFilter";

interface CategoryFilterSidebarProps {
  filters: ProductFilters;
  onFilterChange: (filters: ProductFilters) => void;
  brands: string[];
  priceMin: number;
  priceMax: number;
  availabilityStatuses: string[];
}

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-neutral-200 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wider"
      >
        {title}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
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
    onFilterChange({ ...filters, ...partial });
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
  );
}
