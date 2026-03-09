import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/types/products";

interface ProductsGridProps {
    title?: string;
    products?: Product[];
}

export default function ProductsGrid({ title, products }: ProductsGridProps) {
    return (
        <section className="container mx-auto max-w-screen-xl px-4 py-16">
            <h2 className="text-3xl font-medium mb-8 uppercase text-center">
                {title ?? "New Arrivals"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {products?.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
}
