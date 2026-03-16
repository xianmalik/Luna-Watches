'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { FILTER_INITIAL_VISIBLE_COUNT } from '@/lib/app.settings'

interface CategoryFilterProps {
  categories: { slug: string; name: string; count: number }[]
  selected: string[]
  onChange: (categories: string[]) => void
}

export default function CategoryFilter({
  categories,
  selected,
  onChange,
}: CategoryFilterProps) {
  const [showAll, setShowAll] = useState(false)

  const visible = showAll
    ? categories
    : categories.slice(0, FILTER_INITIAL_VISIBLE_COUNT)
  const hiddenCount = categories.length - FILTER_INITIAL_VISIBLE_COUNT

  function toggle(slug: string) {
    onChange(
      selected.includes(slug)
        ? selected.filter((c) => c !== slug)
        : [...selected, slug]
    )
  }

  return (
    <div className="space-y-2">
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {visible.map((cat) => (
          <label
            key={cat.slug}
            htmlFor={`category-${cat.slug}`}
            className="flex items-center justify-between gap-2 text-sm cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Checkbox
                id={`category-${cat.slug}`}
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
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="text-xs text-neutral-500 underline"
        >
          {showAll ? 'Show Less' : `See ${hiddenCount} More`}
        </button>
      )}
    </div>
  )
}
