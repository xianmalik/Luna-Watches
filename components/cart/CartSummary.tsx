"use client";

import { Button } from "@/components/ui/button";
import type { Cart } from "@/types/cart";

interface CartSummaryProps {
  cart: Cart;
}

export default function CartSummary({ cart }: CartSummaryProps) {
  const subtotal = cart.total ?? 0;
  const discountedTotal = cart.discountedTotal ?? cart.total ?? 0;
  const discount = subtotal - discountedTotal;
  const total = discountedTotal;

  return (
    <div className="border rounded-lg p-6 bg-white sticky top-4">
      <h2 className="text-lg font-medium uppercase tracking-wide mb-4">
        Order Summary
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-neutral-600">Subtotal ({cart.totalProducts} items)</span>
          <span className="font-medium">
            ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span className="font-medium">
              -${discount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-neutral-600">Shipping</span>
          <span className="font-medium">Calculated at checkout</span>
        </div>

        <div className="border-t pt-3 flex justify-between text-base">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">
            ${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <Button className="w-full mt-6 uppercase text-sm font-medium tracking-wide h-12">
        Proceed to Checkout
      </Button>

      <div className="mt-4 text-xs text-center text-neutral-500">
        Taxes and shipping calculated at checkout
      </div>
    </div>
  );
}
