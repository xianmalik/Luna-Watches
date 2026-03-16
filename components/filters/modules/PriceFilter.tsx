'use client'

import { Slider } from '@/components/ui/slider'

interface PriceFilterProps {
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
}

export default function PriceFilter({
  min,
  max,
  value,
  onChange,
}: PriceFilterProps) {
  return (
    <div className="space-y-4">
      <Slider
        min={min}
        max={max}
        step={1}
        value={value}
        onValueChange={(v) => onChange(v as [number, number])}
      />
      <div className="flex items-center justify-between text-xs text-neutral-500">
        <span>$ {value[0].toLocaleString()}</span>
        <span>$ {value[1].toLocaleString()}</span>
      </div>
    </div>
  )
}
