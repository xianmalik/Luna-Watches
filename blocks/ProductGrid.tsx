
import { Product } from "@/types/Product";
import ProductSingle from "@/components/shop/ProductSingle";

interface ProductGridProps {
    title?: string;
    products: Product[];
}

export default function ProductGrid({ title, products }: ProductGridProps) {
    return (
        <section className="container mx-auto px-4 py-12">
            {title && (
                <h2 className="section--title">{title}</h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {products.map((product) => (
                    <ProductSingle product={product} key={product.id} />
                ))}
            </div>
        </section>
    )
}
