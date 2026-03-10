"use client";

import { Banknote, Wallet } from "lucide-react";
import type { PaymentMethodType } from "@/components/checkout/CheckoutForm";

interface PaymentMethodProps {
  selectedMethod: PaymentMethodType;
  setSelectedMethod: (method: PaymentMethodType) => void;
}

export default function PaymentMethod({
  selectedMethod,
  setSelectedMethod,
}: PaymentMethodProps) {
  return (
    <div className="border rounded-lg p-6 bg-white">
      <h2 className="text-lg font-medium uppercase tracking-wide mb-6">
        Payment Method
      </h2>

      <div className="space-y-3">
        <div
          onClick={() => setSelectedMethod("cod")}
          className={`border rounded-lg p-4 cursor-pointer transition-all ${
            selectedMethod === "cod"
              ? "border-black bg-neutral-50"
              : "border-neutral-200 hover:border-neutral-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === "cod"
                  ? "border-black"
                  : "border-neutral-300"
              }`}
            >
              {selectedMethod === "cod" && (
                <div className="w-3 h-3 rounded-full bg-black" />
              )}
            </div>
            <Wallet className="h-5 w-5" />
            <div className="flex-1">
              <div className="font-medium">Cash on Delivery</div>
              <div className="text-xs text-neutral-500 mt-1">
                Pay with cash when your order is delivered
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setSelectedMethod("bank")}
          className={`border rounded-lg p-4 cursor-pointer transition-all ${
            selectedMethod === "bank"
              ? "border-black bg-neutral-50"
              : "border-neutral-200 hover:border-neutral-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === "bank"
                  ? "border-black"
                  : "border-neutral-300"
              }`}
            >
              {selectedMethod === "bank" && (
                <div className="w-3 h-3 rounded-full bg-black" />
              )}
            </div>
            <Banknote className="h-5 w-5" />
            <div className="flex-1">
              <div className="font-medium">Bank Transfer</div>
              <div className="text-xs text-neutral-500 mt-1">
                Transfer payment directly to our bank account
              </div>
            </div>
          </div>

          {selectedMethod === "bank" && (
            <div className="mt-4 pt-4 border-t text-sm text-neutral-600 space-y-2">
              <p className="font-medium">Bank Details:</p>
              <div className="bg-neutral-50 p-3 rounded space-y-1 text-xs">
                <p>
                  <span className="font-medium">Bank:</span> Luna Bank
                </p>
                <p>
                  <span className="font-medium">Account Name:</span> Luna Store
                </p>
                <p>
                  <span className="font-medium">Account Number:</span>{" "}
                  1234567890
                </p>
                <p>
                  <span className="font-medium">SWIFT Code:</span> LUNAXXXX
                </p>
              </div>
              <p className="text-xs text-neutral-500 mt-2">
                Please use your order number as reference when making the
                transfer.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
