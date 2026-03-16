import type { Metadata } from 'next'
import CartContent from '@/components/cart/CartContent'

export const metadata: Metadata = {
  title: 'Shopping Cart | Luna Store',
  description: 'View and manage your shopping cart',
}

export default function CartPage() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-8">
      <h1 className="text-3xl font-medium uppercase tracking-wide mb-8">
        Shopping Cart
      </h1>
      <CartContent />
    </div>
  )
}
