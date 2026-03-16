"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import OrderSummary from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/button";
import type { ShippingInfo, PaymentMethodType } from "@/types/checkout";

export default function CheckoutForm() {
  const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const isHydrated = useCartStore((state) => state.isHydrated);
  const clearCart = useCartStore((state) => state.clearCart);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ShippingInfo>>({});

  useEffect(() => {
    if (isHydrated && (!cart || cart.products.length === 0)) {
      router.push("/cart");
    }
  }, [isHydrated, cart, router]);

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingInfo> = {};

    if (!shippingInfo.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!shippingInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!shippingInfo.phone.trim()) newErrors.phone = "Phone is required";
    if (!shippingInfo.address.trim()) newErrors.address = "Address is required";
    if (!shippingInfo.city.trim()) newErrors.city = "City is required";
    if (!shippingInfo.state.trim()) newErrors.state = "State is required";
    if (!shippingInfo.zipCode.trim()) newErrors.zipCode = "ZIP code is required";
    if (!shippingInfo.country.trim()) newErrors.country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const order = {
      id: Date.now(),
      shippingInfo,
      paymentMethod,
      cart,
      total: cart?.discountedTotal ?? 0,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));

    setTimeout(() => {
      clearCart();
      router.push("/checkout/success");
    }, 1000);
  };

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-neutral-500">Loading...</p>
      </div>
    );
  }

  if (!cart || cart.products.length === 0) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ShippingForm
            shippingInfo={shippingInfo}
            setShippingInfo={setShippingInfo}
            errors={errors}
          />

          <PaymentMethod
            selectedMethod={paymentMethod}
            setSelectedMethod={setPaymentMethod}
          />
        </div>

        <div className="lg:col-span-1">
          <OrderSummary cart={cart} />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 uppercase text-sm font-medium tracking-wide h-12"
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </Button>
        </div>
      </div>
    </form>
  );
}
