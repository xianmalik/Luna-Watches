'use client'

import Image from 'next/image'
import type { Cart } from '@/types/cart'

interface OrderSummaryProps {
  cart: Cart
}

export default function OrderSummary({ cart }: OrderSummaryProps) {
  const subtotal = cart.total ?? 0
  const discountedTotal = cart.discountedTotal ?? cart.total ?? 0
  const discount = subtotal - discountedTotal
  const shipping: number = 0
  const total = discountedTotal + shipping

  return (
    <div className="border rounded-lg p-6 bg-white sticky top-4">
      <h2 className="text-lg font-medium uppercase tracking-wide mb-4">
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        {cart.products.map((product) => (
          <div key={product.id} className="flex gap-3">
            <div className="relative w-16 h-16 flex-shrink-0 bg-neutral-100 rounded">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover rounded"
              />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                {product.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{product.title}</p>
              <p className="text-xs text-neutral-500 mt-1">
                ${product.price.toFixed(2)} × {product.quantity}
              </p>
            </div>
            <div className="text-sm font-medium">
              $
              {(
                product.discountedTotal ?? product.price * product.quantity
              ).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-neutral-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span className="font-medium">-${discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-neutral-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        <div className="border-t pt-3 flex justify-between text-base">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
