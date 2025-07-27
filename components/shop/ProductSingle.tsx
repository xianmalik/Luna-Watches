import Image from "next/image";
import Link from "next/link";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Product } from "@/types/Product";

export default function ProductSingle({ product }: { product: Product }) {
    return (
        <Link href={`/products/${product.id}`} key={product.id} className="rounded block relative text-center">
            <div className="absolute top-0 left-0 flex items-center z-10">
                {product.isFeatured && (
                    <Badge>Featured</Badge>
                )}
                {product.isPreOwned && (
                    <Badge>Pre-Owned</Badge>
                )}
            </div>
            <AspectRatio ratio={2 / 2.5} className="mb-4">
                <Image src={product.featuredImage.url} alt={product.featuredImage.alt || product.name} height={500} width={400} className="h-full w-full object-contain rounded" loading="lazy" />
            </AspectRatio>
            {product.name && (
                <h3 className="text-lg font-semibold">{product.name}</h3>
            )}
            {product.description && (
                <p className="text-gray-600">{product.description}</p>
            )}
            {product.price && (
                <span className="block mt-2 font-bold">
                    {product.price.current.toLocaleString()} {product.price.currency}
                </span>
            )}
            <Button className="mt-4" variant="secondary" size="sm">
                Add to cart
            </Button>
        </Link>
    )
}