'use client'

import { Loader2, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { SEARCH_DEBOUNCE_MS } from '@/lib/app.settings'
import type { Product } from '@/types/products'

interface SearchCommandProps {
  iconOnly?: boolean
}

export default function SearchCommand({
  iconOnly = false,
}: SearchCommandProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const searchProducts = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setProducts([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch(
        `/api/products/search?q=${encodeURIComponent(searchQuery)}`
      )
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Search error:', error)
      setProducts([])
    } finally {
      setIsSearching(false)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      searchProducts(query)
    }, SEARCH_DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [query, searchProducts])

  const handleSelect = (productId: number) => {
    setOpen(false)
    setQuery('')
    setProducts([])
    router.push(`/products/${productId}`)
  }

  return (
    <>
      <Button
        variant={iconOnly ? 'ghost' : 'outline'}
        size={iconOnly ? 'icon' : 'default'}
        className={
          iconOnly
            ? 'hover:bg-neutral-100'
            : 'relative w-full max-w-sm justify-start text-sm text-neutral-500 hover:text-neutral-900 h-10'
        }
        onClick={() => setOpen(true)}
      >
        <Search className={iconOnly ? 'h-5 w-5' : 'mr-2 h-4 w-4'} />
        {!iconOnly && (
          <>
            <span>Search products...</span>
            <kbd className="pointer-events-none absolute right-2 hidden h-5 select-none items-center gap-1 rounded border bg-neutral-100 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </>
        )}
        <span className="sr-only">Search</span>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search Products"
        description="Search for products in our catalog"
      >
        <CommandInput
          placeholder="Search products..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {isSearching && (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
            </div>
          )}

          {!isSearching && query && products.length === 0 && (
            <CommandEmpty>No products found.</CommandEmpty>
          )}

          {!isSearching && products.length > 0 && (
            <CommandGroup heading="Products">
              {products.map((product) => (
                <CommandItem
                  key={product.id}
                  value={product.title}
                  onSelect={() => handleSelect(product.id)}
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                >
                  <div
                    className="w-12 h-12 bg-neutral-100 rounded flex-shrink-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${product.thumbnail})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{product.title}</p>
                    <p className="text-xs text-neutral-500 truncate">
                      {product.category}
                    </p>
                  </div>
                  <div className="text-sm font-semibold">
                    ${product.price.toFixed(2)}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {!(query || isSearching) && (
            <div className="py-6 text-center text-sm text-neutral-500">
              Start typing to search for products
            </div>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
