"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductSpecificationProps {
  weight?: number;
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  sku?: string;
}

export default function ProductSpecification({
  weight,
  dimensions,
  warrantyInformation,
  shippingInformation,
  returnPolicy,
  minimumOrderQuantity,
  sku,
}: ProductSpecificationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const specs = [
    sku ? { label: "SKU", value: sku } : null,
    weight ? { label: "Weight", value: `${weight}g` } : null,
    dimensions
      ? {
          label: "Dimensions",
          value: `${dimensions.width} × ${dimensions.height} × ${dimensions.depth} cm`,
        }
      : null,
    warrantyInformation
      ? { label: "Warranty", value: warrantyInformation }
      : null,
    shippingInformation
      ? { label: "Shipping", value: shippingInformation }
      : null,
    returnPolicy ? { label: "Return Policy", value: returnPolicy } : null,
    minimumOrderQuantity
      ? { label: "Min. Order", value: String(minimumOrderQuantity) }
      : null,
  ].filter(Boolean) as { label: string; value: string }[];

  if (specs.length === 0) return null;

  return (
    <div className="border-t border-b border-neutral-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-5 text-left"
      >
        <h2 className="text-lg font-medium uppercase tracking-wide">
          Specification
        </h2>
        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex justify-between border-b border-neutral-100 pb-3"
              >
                <span className="text-sm text-neutral-500 uppercase tracking-wide">
                  {spec.label}
                </span>
                <span className="text-sm font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
