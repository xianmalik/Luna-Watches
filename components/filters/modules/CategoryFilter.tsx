"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface CategoryFilterProps {
  categories: { slug: string; name: string; count: number }[];
  selected: string[];
  onChange: (categories: string[]) => void;
}

const INITIAL_VISIBLE = 8;

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? categories : categories.slice(0, INITIAL_VISIBLE);
  const hiddenCount = categories.length - INITIAL_VISIBLE;

  function toggle(slug: string) {
    onChange(
      selected.includes(slug)
        ? selected.filter((c) => c !== slug)
        : [...selected, slug]
    );
  }

  return (
    <div className="space-y-2">
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {visible.map((cat) => (
          <label
            key={cat.slug}
            className="flex items-center justify-between gap-2 text-sm cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selected.includes(cat.slug)}
                onCheckedChange={() => toggle(cat.slug)}
              />
              <span className="text-xs capitalize">{cat.name}</span>
            </div>
            <span className="text-xs text-neutral-400">({cat.count})</span>
          </label>
        ))}
      </div>
      {hiddenCount > 0 && (
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
