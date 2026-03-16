import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import ProductShowcase from '@/blocks/ProductShowcase'
import ProductSpecification from '@/blocks/ProductSpecification'
import ProductsGrid from '@/blocks/ProductsGrid'
import ProductActions from '@/components/products/ProductActions'
import ProductImageGallery from '@/components/products/ProductImageGallery'
import { RELATED_PRODUCTS_LIMIT } from '@/lib/app.settings'
import { dummyjsonFetch } from '@/lib/dummyjson'
import type { Product, ProductsResponse } from '@/types/products'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const data = await dummyjsonFetch<ProductsResponse>('/products', {
    params: { limit: '0', select: 'id' },
  })
  return data.products.map((product) => ({ id: String(product.id) }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params
  try {
    const product = await dummyjsonFetch<Product>(`/products/${id}`)
    return {
      title: `${product.title} | Luna Store`,
      description: product.description,
    }
  } catch {
    return { title: 'Product Not Found | Luna Store' }
  }
}

async function RelatedProducts({
  category,
  currentId,
}: {
  category: string
  currentId: number
}) {
  try {
    const data = await dummyjsonFetch<ProductsResponse>(
      `/products/category/${category}`,
      { params: { limit: String(RELATED_PRODUCTS_LIMIT) } }
    )
    const related = data.products.filter((p) => p.id !== currentId).slice(0, 5)
    if (related.length === 0) return null
    return <ProductsGrid title="You May Also Like" products={related} />
  } catch {
    return null
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params

  let product: Product
  try {
    product = await dummyjsonFetch<Product>(`/products/${id}`)
  } catch {
    notFound()
  }

  const hasDiscount = product.discountPercentage > 0
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : null

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-8">
      <nav className="text-sm text-neutral-500 mb-8">
        <Link href="/" className="hover:text-black transition-colors">
          Home
        </Link>
        {' / '}
        <Link href="/products" className="hover:text-black transition-colors">
          Products
        </Link>
        {' / '}
        <span className="text-black">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <ProductImageGallery images={product.images} title={product.title} />

        <div className="space-y-6">
          {product.brand && (
            <p className="text-lg font-medium uppercase tracking-wide">
              {product.brand}
            </p>
          )}

          <div>
            <h1 className="text-sm text-neutral-600 uppercase">
              {product.title}
            </h1>
            {product.sku && (
              <p className="text-xs text-neutral-400 mt-1">{product.sku}</p>
            )}
          </div>

          <div className="flex items-center gap-3">
            {discountedPrice ? (
              <>
                <span className="text-2xl font-medium">
                  $
                  {discountedPrice.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <span className="text-lg text-neutral-400 line-through">
                  $
                  {product.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </>
            ) : (
              <span className="text-2xl font-medium">
                $
                {product.price.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            )}
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-3">
              Description
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <ProductActions productId={product.id} />
        </div>
      </div>

      <div className="mb-16">
        <ProductSpecification
          weight={product.weight}
          dimensions={product.dimensions}
          warrantyInformation={product.warrantyInformation}
          shippingInformation={product.shippingInformation}
          returnPolicy={product.returnPolicy}
          minimumOrderQuantity={product.minimumOrderQuantity}
          sku={product.sku}
        />
      </div>

      {product.images?.[1] && (
        <div className="mb-16">
          <ProductShowcase image={product.images[1]} title={product.title} />
        </div>
      )}

      <Suspense
        fallback={
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-48 bg-neutral-200 rounded" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Array.from({ length: 5 }, (_, i) => `skeleton-${i}`).map(
                (key) => (
                  <div
                    key={key}
                    className="aspect-square bg-neutral-200 rounded"
                  />
                )
              )}
            </div>
          </div>
        }
      >
        <RelatedProducts category={product.category} currentId={product.id} />
      </Suspense>
    </div>
  )
}
