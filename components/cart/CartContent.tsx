"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/button";

export default function CartContent() {
  const cart = useCartStore((state) => state.cart);
  const isLoading = useCartStore((state) => state.isLoading);
  const isHydrated = useCartStore((state) => state.isHydrated);
  const initializeCart = useCartStore((state) => state.initializeCart);

  useEffect(() => {
    if (isHydrated) {
      initializeCart();
    }
  }, [isHydrated, initializeCart]);

  if (!isHydrated || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-neutral-500">Loading cart...</p>
      </div>
    );
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-xl text-neutral-600">Your cart is empty</p>
        <Link href="/products">
          <Button className="uppercase text-sm font-medium tracking-wide">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {cart.products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))}
      </div>
      <div className="lg:col-span-1">
        <CartSummary cart={cart} />
      </div>
    </div>
  );
}
