"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductActionsProps {
  productId?: number;
}

export default function ProductActions({ productId }: ProductActionsProps) {
  if (!productId) return null;

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Button className="flex-1 uppercase text-sm font-medium tracking-wide h-12">
          Add to Cart
        </Button>
        <Button variant="outline" size="icon" className="h-12 w-12 shrink-0">
          <Heart className="h-5 w-5" />
        </Button>
      </div>
      <Button
        variant="outline"
        className="w-full uppercase text-sm font-medium tracking-wide h-12"
      >
        Buy It Now
      </Button>
    </div>
  );
}
