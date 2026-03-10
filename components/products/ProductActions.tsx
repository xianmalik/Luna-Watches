"use client";

import { useState } from "react";
import { Heart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";

interface ProductActionsProps {
  productId?: number;
}

export default function ProductActions({ productId }: ProductActionsProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!productId) return null;

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(productId, 1);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Button
          onClick={handleAddToCart}
          disabled={isAdding || showSuccess}
          className="flex-1 uppercase text-sm font-medium tracking-wide h-12"
        >
          {showSuccess ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Added
            </>
          ) : isAdding ? (
            "Adding..."
          ) : (
            "Add to Cart"
          )}
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
