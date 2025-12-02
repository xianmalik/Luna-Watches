import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
    image?: {
        url: string;
        alt: string;
    };
    name?: string;
    slug?: string;
    brand?: string;
    price?: {
        original: number;
        sale?: number;
    };
    badge?: string;
    onAddToCart?: () => void;
}

export default function ProductCard({
    image,
    name,
    slug,
    brand,
    price,
    badge,
    onAddToCart
}: ProductCardProps) {
    return (
        <Card className="group overflow-hidden border-0 shadow-none">
            <CardContent className="p-0 space-y-4">
                <Link href={`/products/${slug ?? ""}`} className="relative block aspect-square overflow-hidden bg-neutral-100">
                    {badge && (
                        <Badge className="absolute top-4 left-4 z-10 bg-black text-white uppercase text-xs px-3 py-1 rounded-sm">
                            {badge}
                        </Badge>
                    )}
                    {image?.url && (
                        <Image
                            src={image.url}
                            alt={image.alt ?? name ?? "Product"}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    )}
                </Link>

                <div className="space-y-2 text-center">
                    <div>
                        <p className="text-sm font-medium uppercase tracking-wide">
                            {brand}
                        </p>
                        <Link href={`/products/${slug ?? ""}`}>
                            <h3 className="text-sm text-neutral-600 uppercase mt-1 hover:text-black transition-colors">
                                {name}
                            </h3>
                        </Link>
                    </div>

                    <div className="flex items-center justify-center gap-2">
                        {price?.sale ? (
                            <>
                                <span className="text-sm font-medium">
                                    $ {price.sale.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                                <span className="text-sm text-neutral-400 line-through">
                                    $ {price.original.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span>
                            </>
                        ) : (
                            <span className="text-sm font-medium">
                                $ {price?.original.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
