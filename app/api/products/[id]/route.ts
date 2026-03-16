import { NextResponse } from 'next/server'
import { dummyjsonFetch } from '@/lib/dummyjson'
import type { Product } from '@/types/products'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const data = await dummyjsonFetch<Product>(`/products/${id}`)
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
