'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ProductImageGalleryProps {
  images?: string[]
  title?: string
}

export default function ProductImageGallery({
  images,
  title,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images || images.length === 0) return null

  const selectedImage = images[selectedIndex]

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={cn(
              'relative w-16 h-16 overflow-hidden border transition-colors bg-neutral-50',
              index === selectedIndex
                ? 'border-black'
                : 'border-transparent hover:border-neutral-300'
            )}
          >
            <Image
              src={image}
              alt={`${title ?? 'Product'} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <div className="relative flex-1 aspect-square overflow-hidden bg-neutral-50">
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={title ?? 'Product'}
            fill
            className="object-contain"
            priority
          />
        )}
      </div>
    </div>
  )
}
