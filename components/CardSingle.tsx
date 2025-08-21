import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CardSingleProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
}

export default function CardSingle({ title, description, buttonText, buttonLink, imageUrl }: CardSingleProps) {
  return (
    <div className="group relative overflow-hidden bg-white shadow-lg transition-all duration-300 hover:shadow-xl p-8">
      {/* Background Image with Zoom Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/60" />
      
      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 text-white">
        {/* Title - Always Visible */}
        <div className="mb-4">
          <h3 className="text-2xl md:text-4xl font-bold">{title}</h3>
        </div>
        
        {/* Description and Button - Hidden by default, shown on hover */}
        <div className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
          <p className="mb-4 text-sm leading-relaxed text-gray-200">
            {description}
          </p>
          <Button asChild variant="secondary" className="uppercase tracking-wide">
            <Link href={buttonLink}>
              {buttonText}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
