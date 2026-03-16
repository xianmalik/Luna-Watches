'use client'

import { Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ADD_TO_CART_SUCCESS_MS } from '@/lib/app.settings'
import { useCartStore } from '@/stores/cart-store'
import type { Product } from '@/types/products'

interface ProductCardProps {
  product?: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart)
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  if (!product) return null

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    setIsAdding(true)
    try {
      await addToCart(product.id, 1)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), ADD_TO_CART_SUCCESS_MS)
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setIsAdding(false)
    }
  }

  const hasDiscount = product.discountPercentage > 0
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : null

  let addButtonLabel: React.ReactNode = 'Add to cart'
  if (isAdding) addButtonLabel = 'Adding...'
  if (showSuccess)
    addButtonLabel = (
      <>
        <Check className="h-3 w-3 mr-2" />
        Added
      </>
    )

  return (
    <Card className="group overflow-hidden border-0 shadow-none">
      <CardContent className="p-0 space-y-4">
        <Link
          href={`/products/${product.id}`}
          className="relative block aspect-square overflow-hidden bg-neutral-100"
        >
          {product.availabilityStatus &&
            product.availabilityStatus !== 'In Stock' && (
              <Badge className="absolute top-4 left-4 z-10 bg-black text-white uppercase text-xs px-3 py-1 rounded-sm">
                {product.availabilityStatus}
              </Badge>
            )}
          {product.thumbnail && (
            <Image
              src={product.thumbnail}
              alt={product.title ?? 'Product'}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </Link>

        <div className="space-y-2 text-center">
          <div>
            {product.brand && (
              <p className="text-sm font-medium uppercase tracking-wide">
                {product.brand}
              </p>
            )}
            <Link href={`/products/${product.id}`}>
              <h3 className="text-sm text-neutral-600 uppercase mt-1 hover:text-black transition-colors">
                {product.title}
              </h3>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2">
            {discountedPrice ? (
              <>
                <span className="text-sm font-medium">
                  ${' '}
                  {discountedPrice.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className="text-sm text-neutral-400 line-through">
                  ${' '}
                  {product.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </>
            ) : (
              <span className="text-sm font-medium">
                ${' '}
                {product.price.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            )}
          </div>

          <Button
            variant="outline"
            className="w-full uppercase text-xs font-medium tracking-wide"
            onClick={handleAddToCart}
            disabled={isAdding || showSuccess}
          >
            {addButtonLabel}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
