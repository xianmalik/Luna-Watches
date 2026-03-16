import { type NextRequest, NextResponse } from 'next/server'
import { dummyjsonFetch } from '@/lib/dummyjson'
import type { AddToCartRequest, Cart, CartsResponse } from '@/types/cart'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const userId = searchParams.get('userId')

  try {
    if (userId) {
      const data = await dummyjsonFetch<CartsResponse>(`/carts/user/${userId}`)
      return NextResponse.json(data)
    }

    const data = await dummyjsonFetch<CartsResponse>('/carts')
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch carts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: AddToCartRequest = await request.json()
    const data = await dummyjsonFetch<Cart>('/carts/add', {
      method: 'POST',
      body,
    })
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { error: 'Failed to create cart' },
      { status: 500 }
    )
  }
}
