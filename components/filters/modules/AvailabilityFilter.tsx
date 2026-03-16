'use client'

import { Checkbox } from '@/components/ui/checkbox'

interface AvailabilityFilterProps {
  statuses: string[]
  selected: string[]
  onChange: (statuses: string[]) => void
}

export default function AvailabilityFilter({
  statuses,
  selected,
  onChange,
}: AvailabilityFilterProps) {
  function toggle(status: string) {
    onChange(
      selected.includes(status)
        ? selected.filter((s) => s !== status)
        : [...selected, status]
    )
  }

  return (
    <div className="space-y-2">
      {statuses.map((status) => (
        <label
          key={status}
          htmlFor={`availability-${status}`}
          className="flex items-center gap-2 text-sm cursor-pointer"
        >
          <Checkbox
            id={`availability-${status}`}
            checked={selected.includes(status)}
            onCheckedChange={() => toggle(status)}
          />
          <span className="text-xs">{status}</span>
        </label>
      ))}
    </div>
  )
}
