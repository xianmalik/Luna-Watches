"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingFilterProps {
  value: number;
  onChange: (rating: number) => void;
}

const RATINGS = [4, 3, 2, 1];

export default function RatingFilter({ value, onChange }: RatingFilterProps) {
  return (
    <div className="space-y-2">
      {RATINGS.map((rating) => (
        <button
          key={rating}
          onClick={() => onChange(value === rating ? 0 : rating)}
          className={cn(
            "flex items-center gap-2 w-full text-left py-1 transition-colors",
            value === rating ? "text-black" : "text-neutral-400 hover:text-neutral-600"
          )}
        >
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3.5 w-3.5",
                  i < rating ? "fill-current" : "fill-none"
                )}
              />
            ))}
          </div>
          <span className="text-xs">& Up</span>
        </button>
      ))}
    </div>
  );
}
