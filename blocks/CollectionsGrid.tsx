import Image from "next/image";
import Link from "next/link";

interface Collection {
  title: string;
  image: string;
  href: string;
}

interface CollectionsGridProps {
  title?: string;
  collections?: Collection[];
}

export default function CollectionsGrid({
  title,
  collections,
}: CollectionsGridProps) {
  if (!collections || collections.length === 0) return null;

  return (
    <section className="container mx-auto max-w-screen-xl px-4 py-16">
      <h2 className="text-3xl font-bold mb-14 uppercase text-center tracking-wide">
        {title ?? "Collections"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {collections.map((collection, index) => (
          <Link
            key={index}
            href={collection.href}
            className="group relative block aspect-square overflow-hidden rounded-md"
          >
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
            <span className="absolute top-5 left-5 text-white text-lg font-medium">
              {collection.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
