import { apiClient } from "@/lib/api-client";
import type {
  Cart,
  CartsResponse,
  AddToCartRequest,
  UpdateCartRequest,
} from "@/types/cart";

export async function getCarts(): Promise<CartsResponse> {
  return apiClient<CartsResponse>("/cart");
}

export async function getCartsByUser(userId: number): Promise<CartsResponse> {
  return apiClient<CartsResponse>("/cart", {
    params: { userId: String(userId) },
  });
}

export async function getCartById(id: number): Promise<Cart> {
  return apiClient<Cart>(`/cart/${id}`);
}

export async function createCart(data: AddToCartRequest): Promise<Cart> {
  return apiClient<Cart>("/cart", {
    method: "POST",
    body: data,
  });
}

export async function updateCart(
  id: number,
  data: UpdateCartRequest
): Promise<Cart> {
  return apiClient<Cart>(`/cart/${id}`, {
    method: "PUT",
    body: data,
  });
}

export async function deleteCart(id: number): Promise<Cart> {
  return apiClient<Cart>(`/cart/${id}`, {
    method: "DELETE",
  });
}
