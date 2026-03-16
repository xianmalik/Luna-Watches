"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Package, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PAYMENT_METHOD_LABELS } from "@/lib/app.settings";

interface Order {
  id: number;
  shippingInfo: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  total: number;
  createdAt: string;
}

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const orderData = localStorage.getItem("lastOrder");
    if (orderData) {
      setOrder(JSON.parse(orderData));
    }
  }, []);

  if (!order) {
    return (
      <div className="container mx-auto max-w-screen-xl px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-neutral-500">No order found</p>
          <Link href="/" className="mt-4">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const paymentMethodLabel = PAYMENT_METHOD_LABELS[order.paymentMethod] ?? order.paymentMethod;

  return (
    <div className="container mx-auto max-w-screen-md px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
        <h1 className="text-3xl font-medium uppercase tracking-wide mb-2">
          Order Confirmed!
        </h1>
        <p className="text-neutral-600">
          Thank you for your order. We&apos;ve received your order and will process it
          shortly.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-white mb-6">
        <div className="flex items-center justify-between mb-6 pb-6 border-b">
          <div>
            <p className="text-sm text-neutral-500">Order Number</p>
            <p className="text-lg font-medium">#{order.id}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-neutral-500">Order Total</p>
            <p className="text-lg font-medium">${order.total.toFixed(2)}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex gap-4">
            <Package className="h-5 w-5 text-neutral-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium mb-2">Shipping Address</h3>
              <div className="text-sm text-neutral-600 space-y-1">
                <p>{order.shippingInfo.fullName}</p>
                <p>{order.shippingInfo.address}</p>
                <p>
                  {order.shippingInfo.city}, {order.shippingInfo.state}{" "}
                  {order.shippingInfo.zipCode}
                </p>
                <p>{order.shippingInfo.country}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Mail className="h-5 w-5 text-neutral-400 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium mb-2">Contact Information</h3>
              <p className="text-sm text-neutral-600">
                {order.shippingInfo.email}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-5 w-5 flex items-center justify-center text-neutral-400 mt-0.5">
              💳
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-2">Payment Method</h3>
              <p className="text-sm text-neutral-600">{paymentMethodLabel}</p>
              {order.paymentMethod === "bank" && (
                <p className="text-xs text-neutral-500 mt-2">
                  Please complete your bank transfer using order #{order.id} as
                  reference
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-50 border rounded-lg p-6 mb-6">
        <h3 className="font-medium mb-2">What&apos;s Next?</h3>
        <ul className="text-sm text-neutral-600 space-y-2">
          <li>• You will receive an order confirmation email shortly</li>
          <li>
            • We&apos;ll send you a shipping confirmation when your order ships
          </li>
          <li>• Track your order status in your account dashboard</li>
        </ul>
      </div>

      <div className="flex gap-4">
        <Link href="/" className="flex-1">
          <Button variant="outline" className="w-full uppercase text-sm font-medium tracking-wide">
            Continue Shopping
          </Button>
        </Link>
        <Link href="/products" className="flex-1">
          <Button className="w-full uppercase text-sm font-medium tracking-wide">
            View Products
          </Button>
        </Link>
      </div>
    </div>
  );
}
