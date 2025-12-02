import ProductCard from "@/components/products/ProductCard";

interface Product {
    image: {
        url: string;
        alt: string;
    };
    name: string;
    slug: string;
    brand: string;
    price: {
        original: number;
        sale?: number;
    };
    badge?: string;
}

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
                {products?.map((product, index) => (
                    <ProductCard
                        key={product.slug ?? index}
                        image={product.image}
                        name={product.name}
                        slug={product.slug}
                        brand={product.brand}
                        price={product.price}
                        badge={product.badge}
                    />
                ))}
            </div>
        </section>
    );
}
