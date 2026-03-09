import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/types/products";

interface ProductCardProps {
    product?: Product;
    onAddToCart?: () => void;
}

export default function ProductCard({
    product,
    onAddToCart
}: ProductCardProps) {
    if (!product) return null;

    const hasDiscount = product.discountPercentage > 0;
    const discountedPrice = hasDiscount
        ? product.price * (1 - product.discountPercentage / 100)
        : null;

    return (
        <Card className="group overflow-hidden border-0 shadow-none">
            <CardContent className="p-0 space-y-4">
                <Link href={`/products/${product.id}`} className="relative block aspect-square overflow-hidden bg-neutral-100">
                    {product.availabilityStatus && product.availabilityStatus !== "In Stock" && (
                        <Badge className="absolute top-4 left-4 z-10 bg-black text-white uppercase text-xs px-3 py-1 rounded-sm">
                            {product.availabilityStatus}
                        </Badge>
                    )}
                    {product.thumbnail && (
                        <Image
                            src={product.thumbnail}
                            alt={product.title ?? "Product"}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    )}
                </Link>

                <div className="space-y-2 text-center">
                    <div>
                        {product.brand && (
                            <p className="text-sm font-medium uppercase tracking-wide">
                                {product.brand}
                            </p>
                        )}
                        <Link href={`/products/${product.id}`}>
                            <h3 className="text-sm text-neutral-600 uppercase mt-1 hover:text-black transition-colors">
                                {product.title}
                            </h3>
                        </Link>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        {discountedPrice ? (
                            <>
                                <span className="text-sm font-medium">
                                    $ {discountedPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                                <span className="text-sm text-neutral-400 line-through">
                                    $ {product.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </>
                        ) : (
                            <span className="text-sm font-medium">
                                $ {product.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        )}
                    </div>

                    <Button
                        variant="outline"
                        className="w-full uppercase text-xs font-medium tracking-wide"
                        onClick={onAddToCart}
                    >
                        Add to cart
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
