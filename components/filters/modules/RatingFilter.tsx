'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingFilterProps {
  value: number
  onChange: (rating: number) => void
}

const RATINGS = [4, 3, 2, 1]
const STAR_POSITIONS = [0, 1, 2, 3, 4]

export default function RatingFilter({ value, onChange }: RatingFilterProps) {
  return (
    <div className="space-y-2">
      {RATINGS.map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(value === rating ? 0 : rating)}
          className={cn(
            'flex items-center gap-2 w-full text-left py-1 transition-colors',
            value === rating
              ? 'text-black'
              : 'text-neutral-400 hover:text-neutral-600'
          )}
        >
          <div className="flex items-center gap-0.5">
            {STAR_POSITIONS.map((pos) => (
              <Star
                key={pos}
                className={cn(
                  'h-3.5 w-3.5',
                  pos < rating ? 'fill-current' : 'fill-none'
                )}
              />
            ))}
          </div>
          <span className="text-xs">& Up</span>
        </button>
      ))}
    </div>
  )
}
