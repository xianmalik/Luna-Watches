"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import type { CartProduct } from "@/types/cart";

interface CartItemProps {
  product: CartProduct;
}

const MAX_QUANTITY = 99;

export default function CartItem({ product }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(product.quantity.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEditing) {
      setInputValue(product.quantity.toString());
    }
  }, [product.quantity, isEditing]);

  const handleQuantityChange = async (newQuantity: number) => {
    console.log("handleQuantityChange called:", {
      productId: product.id,
      currentQuantity: product.quantity,
      newQuantity
    });

    if (newQuantity < 1 || newQuantity > MAX_QUANTITY) {
      console.log("Invalid quantity (out of range)");
      return;
    }

    if (newQuantity === product.quantity) {
      console.log("Quantity unchanged, skipping update");
      return;
    }

    setIsUpdating(true);
    try {
      console.log("Calling updateQuantity...");
      await updateQuantity(product.id, newQuantity);
      console.log("Update successful");
      setInputValue(newQuantity.toString());
    } catch (error) {
      console.error("Failed to update quantity:", error);
      setInputValue(product.quantity.toString());
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    const newQuantity = parseInt(inputValue) || 1;
    const clampedQuantity = Math.min(Math.max(newQuantity, 1), MAX_QUANTITY);
    handleQuantityChange(clampedQuantity);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    } else if (e.key === "Escape") {
      setInputValue(product.quantity.toString());
      setIsEditing(false);
    }
  };

  const handleRemove = async () => {
    const confirmed = window.confirm(
      `Remove "${product.title}" from your cart?`
    );

    if (!confirmed) return;

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
          <div className="flex items-center border rounded overflow-hidden">
            <button
              onClick={() => handleQuantityChange(product.quantity - 1)}
              disabled={isUpdating || product.quantity <= 1}
              className="p-2 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3 w-3" />
            </button>

            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={handleInputKeyDown}
                disabled={isUpdating}
                className="w-12 text-center text-sm font-medium border-0 focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-50"
                autoFocus
              />
            ) : (
              <button
                onClick={() => {
                  setIsEditing(true);
                  setInputValue(product.quantity.toString());
                }}
                disabled={isUpdating}
                className="px-3 text-sm font-medium min-w-[2rem] text-center hover:bg-neutral-50 transition-colors disabled:opacity-50"
                aria-label="Edit quantity"
              >
                {isUpdating ? "..." : product.quantity}
              </button>
            )}

            <button
              onClick={() => handleQuantityChange(product.quantity + 1)}
              disabled={isUpdating || product.quantity >= MAX_QUANTITY}
              className="p-2 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          <button
            onClick={handleRemove}
            disabled={isUpdating}
            className="text-neutral-500 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Remove item"
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
