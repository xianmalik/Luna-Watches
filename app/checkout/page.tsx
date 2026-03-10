import type { Metadata } from "next";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout | Luna Store",
  description: "Complete your order",
};

export default function CheckoutPage() {
  return (
    <div className="container mx-auto max-w-screen-xl px-4 py-8">
      <h1 className="text-3xl font-medium uppercase tracking-wide mb-8">
        Checkout
      </h1>
      <CheckoutForm />
    </div>
  );
}
