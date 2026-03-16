import { NextResponse } from 'next/server'
import { dummyjsonFetch } from '@/lib/dummyjson'
import type { ProductCategory } from '@/types/products'

export async function GET() {
  try {
    const data = await dummyjsonFetch<ProductCategory[]>('/products/categories')
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}
