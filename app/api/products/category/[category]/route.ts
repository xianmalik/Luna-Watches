import { NextResponse } from 'next/server'
import { dummyjsonFetch } from '@/lib/dummyjson'
import type { ProductsResponse } from '@/types/products'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  const { category } = await params

  try {
    const data = await dummyjsonFetch<ProductsResponse>(
      `/products/category/${category}`
    )
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch products by category' },
      { status: 500 }
    )
  }
}
