
import { Product } from "@/types/Product";
import ProductSingle from "@/components/shop/ProductSingle";
import { cn } from "@/lib/utils";

interface ProductGridProps {
    title?: string;
    products: Product[];
    classNames?: string;
}

export default function ProductGrid({ title, products, classNames }: ProductGridProps) {
    return (
        <section className={cn(
            classNames,
            "w-full relative"
        )}>
            <div className="container mx-auto px-4 py-12">
                {title && (
                    <h2 className="section--title">{title}</h2>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {products.map((product) => (
                        <ProductSingle product={product} key={product.id} />
                    ))}
                </div>
            </div>
        </section>
    )
}
