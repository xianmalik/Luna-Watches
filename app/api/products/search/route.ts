import { dummyjsonFetch } from "@/lib/dummyjson";
import type { ProductsResponse } from "@/types/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q") ?? "";

  try {
    const data = await dummyjsonFetch<ProductsResponse>("/products/search", {
      params: { q },
    });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to search products" },
      { status: 500 }
    );
  }
}
