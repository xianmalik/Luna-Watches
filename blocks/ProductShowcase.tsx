import Image from "next/image";

interface ProductShowcaseProps {
  image?: string;
  title?: string;
}

export default function ProductShowcase({ image, title }: ProductShowcaseProps) {
  if (!image) return null;

  return (
    <section className="relative w-full aspect-[16/9] bg-neutral-50">
      <Image
        src={image}
        alt={title ?? "Product showcase"}
        fill
        className="object-contain"
      />
    </section>
  );
}
