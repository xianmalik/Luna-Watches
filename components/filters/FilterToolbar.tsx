"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterToolbarProps {
  filtersVisible: boolean;
  onToggleFilters: () => void;
  sortValue: string;
  onSortChange: (value: string) => void;
  productCount: number;
}

const SORT_OPTIONS = [
  { value: "title-asc", label: "Name: A to Z" },
  { value: "title-desc", label: "Name: Z to A" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating: High to Low" },
];

export default function FilterToolbar({
  filtersVisible,
  onToggleFilters,
  sortValue,
  onSortChange,
  productCount,
}: FilterToolbarProps) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={onToggleFilters}
        className="gap-2 text-xs uppercase tracking-wider font-medium"
      >
        <SlidersHorizontal className="h-4 w-4" />
        {filtersVisible ? "Hide Filters" : "Show Filters"}
      </Button>

      <div className="flex items-center gap-4">
        <Select value={sortValue} onValueChange={onSortChange}>
          <SelectTrigger className="h-8 text-xs uppercase tracking-wider">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value} className="text-xs">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-xs text-neutral-500 uppercase tracking-wider">
          {productCount} Products
        </span>
      </div>
    </div>
  );
}
