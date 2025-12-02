interface BrandsGridProps {
    title?: string;
    brands?: string[];
}

export default function BrandsGrid({ title, brands }: BrandsGridProps) {
    return (
        <section className="container mx-auto max-w-screen-xl px-4 py-16">
            <h2 className="text-3xl font-medium mb-14 uppercase text-center">
                {title ?? "Popular Brands"}
            </h2>
            <div className="grid grid-cols-5 gap-4">
                {brands?.map((brand, index) => (
                    <div
                        key={index}
                        className="w-full py-4 px-6 bg-[#EFEFEF] rounded-md text-sm leading-6 font-medium uppercase text-center"
                    >
                        {brand}
                    </div>
                ))}
            </div>
        </section>
    );
}
