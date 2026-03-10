"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import type { CartProduct } from "@/types/cart";

interface CartItemProps {
  product: CartProduct;
}

export default function CartItem({ product }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    try {
      await updateQuantity(product.id, newQuantity);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      await removeFromCart(product.id);
    } catch (error) {
      console.error("Failed to remove item:", error);
      setIsUpdating(false);
    }
  };

  const discountedTotal = product.discountedTotal ?? product.price * product.quantity;
  const total = product.total ?? product.price * product.quantity;
  const hasDiscount = product.discountPercentage > 0 && discountedTotal < total;

  return (
    <div className="flex gap-4 p-4 border rounded-lg bg-white">
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover rounded"
        />
      </div>

      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${product.id}`}
          className="font-medium text-sm hover:underline block truncate"
        >
          {product.title}
        </Link>

        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center border rounded">
            <button
              onClick={() => handleQuantityChange(product.quantity - 1)}
              disabled={isUpdating || product.quantity <= 1}
              className="p-2 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="px-3 text-sm font-medium min-w-[2rem] text-center">
              {product.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(product.quantity + 1)}
              disabled={isUpdating}
              className="p-2 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <button
            onClick={handleRemove}
            disabled={isUpdating}
            className="text-neutral-500 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <div className="font-medium">
          ${discountedTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        {hasDiscount && (
          <div className="text-xs text-neutral-400 line-through mt-1">
            ${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        )}
        <div className="text-xs text-neutral-500 mt-1">
          ${product.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} each
        </div>
      </div>
    </div>
  );
}
