import { apiClient } from '@/lib/api-client'
import type {
  Product,
  ProductCategory,
  ProductsResponse,
} from '@/types/products'

export async function getProducts(
  options: { limit?: number; skip?: number; select?: string } = {}
): Promise<ProductsResponse> {
  const params: Record<string, string> = {}
  if (options.limit !== undefined) params.limit = String(options.limit)
  if (options.skip !== undefined) params.skip = String(options.skip)
  if (options.select) params.select = options.select

  return apiClient<ProductsResponse>('/products', { params })
}

export async function getProductById(id: number): Promise<Product> {
  return apiClient<Product>(`/products/${id}`)
}

export async function searchProducts(query: string): Promise<ProductsResponse> {
  return apiClient<ProductsResponse>('/products/search', {
    params: { q: query },
  })
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  return apiClient<ProductCategory[]>('/products/categories')
}

export async function getProductsByCategory(
  category: string
): Promise<ProductsResponse> {
  return apiClient<ProductsResponse>(`/products/category/${category}`)
}
