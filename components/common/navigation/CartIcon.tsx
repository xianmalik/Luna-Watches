"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore, getCartItemsCount } from "@/stores/cart-store";

export default function CartIcon() {
  const cartItemsCount = useCartStore(getCartItemsCount);

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart />
      {cartItemsCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {cartItemsCount > 99 ? "99+" : cartItemsCount}
        </span>
      )}
    </Link>
  );
}
