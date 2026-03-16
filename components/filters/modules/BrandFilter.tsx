"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { FILTER_INITIAL_VISIBLE_COUNT } from "@/lib/app.settings";

interface BrandFilterProps {
  brands: string[];
  selected: string[];
  onChange: (brands: string[]) => void;
}

export default function BrandFilter({
  brands,
  selected,
  onChange,
}: BrandFilterProps) {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = search
    ? brands.filter((b) => b.toLowerCase().includes(search.toLowerCase()))
    : brands;

  const visible = showAll ? filtered : filtered.slice(0, FILTER_INITIAL_VISIBLE_COUNT);
  const hiddenCount = filtered.length - FILTER_INITIAL_VISIBLE_COUNT;

  function toggle(brand: string) {
    onChange(
      selected.includes(brand)
        ? selected.filter((b) => b !== brand)
        : [...selected, brand]
    );
  }

  return (
    <div className="space-y-3">
      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="h-8 text-xs"
      />
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {visible.map((brand) => (
          <label
            key={brand}
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <Checkbox
              checked={selected.includes(brand)}
              onCheckedChange={() => toggle(brand)}
            />
            <span className="text-xs">{brand}</span>
          </label>
        ))}
      </div>
      {!search && hiddenCount > 0 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs text-neutral-500 underline"
        >
          {showAll ? "Show Less" : `See ${hiddenCount} More`}
        </button>
      )}
    </div>
  );
}
