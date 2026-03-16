import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductShowcase from '@/blocks/ProductShowcase'
import ProductSpecification from '@/blocks/ProductSpecification'
import ProductsGrid from '@/blocks/ProductsGrid'
import ProductActions from '@/components/products/ProductActions'
import ProductImageGallery from '@/components/products/ProductImageGallery'
import { dummyjsonFetch } from '@/lib/dummyjson'
import type { Product, ProductsResponse } from '@/types/products'

interface PageProps {
  params: Promise<{ id: string }>
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

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params

  let product: Product
  try {
    product = await dummyjsonFetch<Product>(`/products/${id}`)
  } catch {
    notFound()
  }

  let relatedProducts: Product[] = []
  try {
    const data = await dummyjsonFetch<ProductsResponse>(
      `/products/category/${product.category}`,
      { params: { limit: '6' } }
    )
    relatedProducts = data.products
      .filter((p) => p.id !== product.id)
      .slice(0, 5)
  } catch {
    // ignore
  }

  const hasDiscount = product.discountPercentage > 0
  const discountedPrice = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : null

  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-8">
      {/* Breadcrumb */}
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

      {/* Product Hero: Image Gallery + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left: Image Gallery */}
        <ProductImageGallery images={product.images} title={product.title} />

        {/* Right: Product Info */}
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

          {/* Price */}
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

          {/* Description */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide mb-3">
              Description
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Actions */}
          <ProductActions productId={product.id} />
        </div>
      </div>

      {/* Specification */}
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

      {/* Product Showcase Image */}
      {product.images?.[1] && (
        <div className="mb-16">
          <ProductShowcase image={product.images[1]} title={product.title} />
        </div>
      )}

      {/* You May Also Like */}
      {relatedProducts.length > 0 && (
        <ProductsGrid title="You May Also Like" products={relatedProducts} />
      )}
    </div>
  )
}
