"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, getCartItemsCount } from "@/stores/cart-store";
import { CART_BADGE_MAX_DISPLAY } from "@/lib/app.settings";

export default function CartIcon() {
  const cartItemsCount = useCartStore(getCartItemsCount);

  return (
    <Link href="/cart">
      <Button variant="ghost" size="icon" className="relative hover:bg-neutral-100">
        <ShoppingCart className="h-5 w-5" />
        {cartItemsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-semibold">
            {cartItemsCount > CART_BADGE_MAX_DISPLAY ? `${CART_BADGE_MAX_DISPLAY}+` : cartItemsCount}
          </span>
        )}
        <span className="sr-only">Shopping cart</span>
      </Button>
    </Link>
  );
}
