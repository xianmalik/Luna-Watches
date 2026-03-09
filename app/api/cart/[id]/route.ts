import { dummyjsonFetch } from "@/lib/dummyjson";
import type { Cart, UpdateCartRequest } from "@/types/cart";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const data = await dummyjsonFetch<Cart>(`/carts/${id}`);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body: UpdateCartRequest = await request.json();
    const data = await dummyjsonFetch<Cart>(`/carts/${id}`, {
      method: "PUT",
      body,
    });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const data = await dummyjsonFetch<Cart>(`/carts/${id}`, {
      method: "DELETE",
    });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to delete cart" },
      { status: 500 }
    );
  }
}
