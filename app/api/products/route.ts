import { type NextRequest, NextResponse } from 'next/server'
import { dummyjsonFetch } from '@/lib/dummyjson'
import type { ProductsResponse } from '@/types/products'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const limit = searchParams.get('limit') ?? '30'
  const skip = searchParams.get('skip') ?? '0'
  const select = searchParams.get('select')

  const params: Record<string, string> = { limit, skip }
  if (select) params.select = select

  try {
    const data = await dummyjsonFetch<ProductsResponse>('/products', {
      params,
    })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}
