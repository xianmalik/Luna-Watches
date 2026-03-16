'use client'

import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CartItem from '@/components/cart/CartItem'
import CartSummary from '@/components/cart/CartSummary'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cart-store'

export default function CartContent() {
  const cart = useCartStore((state) => state.cart)
  const isLoading = useCartStore((state) => state.isLoading)
  const isHydrated = useCartStore((state) => state.isHydrated)
  const initializeCart = useCartStore((state) => state.initializeCart)
  const clearCart = useCartStore((state) => state.clearCart)
  const [isClearing, setIsClearing] = useState(false)

  useEffect(() => {
    if (isHydrated) {
      initializeCart()
    }
  }, [isHydrated, initializeCart])

  const handleClearCart = async () => {
    const confirmed = window.confirm(
      `Remove all ${cart?.totalProducts || 0} items from your cart?`
    )

    if (!confirmed) return

    setIsClearing(true)
    try {
      clearCart()
    } finally {
      setIsClearing(false)
    }
  }

  if (!isHydrated || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-neutral-500">Loading cart...</p>
      </div>
    )
  }

  if (!cart?.products || cart.products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-xl text-neutral-600">Your cart is empty</p>
        <Link href="/products">
          <Button className="uppercase text-sm font-medium tracking-wide">
            Continue Shopping
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-neutral-600">
          {cart.totalProducts} {cart.totalProducts === 1 ? 'item' : 'items'} (
          {cart.totalQuantity} total)
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearCart}
          disabled={isClearing}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          {isClearing ? 'Clearing...' : 'Clear Cart'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.products.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}

          <div className="pt-4 border-t">
            <Link href="/products">
              <Button
                variant="outline"
                className="uppercase text-sm font-medium tracking-wide"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
        <div className="lg:col-span-1">
          <CartSummary cart={cart} />
        </div>
      </div>
    </div>
  )
}
