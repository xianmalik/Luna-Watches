import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SlideSingleton {
    image: string;
    title: string;
    description: string;
    button: {
        text: string;
        responsiveText: string;
        url: string;
    }
}

interface HeroSliderProps {
    slides?: SlideSingleton[];
}

export default function HeroSlider({ slides } : HeroSliderProps) {
    return (
        <section className="container mx-auto px-4 md:px-16">
            <Carousel
                opts={{
                    align: "center",
                    loop: true,
                }}>
                <CarouselContent>
                    {slides?.map((slide, index) => (
                        <CarouselItem key={index}>
                            <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[600px] px-12">
                                {/* Left Part of Slider */}
                                <div className="text-center md:text-left">
                                    <h1 className="text-2xl md:text-6xl tracking-wider leading-[1.2] font-medium text-balance">
                                        {slide.title}
                                    </h1>
                                    <h6>
                                        {slide.description}
                                    </h6>
                                    {slide.button && (
                                        <Button className="mt-4 uppercase" variant="default" size="lg" asChild>
                                            <Link href={slide.button.url}>
                                                <span className="hidden md:inline">
                                                    {slide.button.text}
                                                </span>
                                                {/* Responsive text for smaller screens */}
                                                {slide.button.responsiveText && (
                                                    <span className="inline md:hidden">
                                                        {slide.button.responsiveText}
                                                    </span>
                                                )}
                                                <ChevronRight />
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                                
                                {/* Right part of Slider */}
                                <div className="flex justify-end order-first md:order-last">
                                    <Image
                                        src={slide.image}
                                        alt={slide.title}
                                        height={550}
                                        width={430}
                                    />
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden md:block">
                    <CarouselPrevious variant="default" className="rounded-none size-10" />
                    <CarouselNext variant="default" className="rounded-none size-10" />
                </div>
            </Carousel>
        </section>
    );
}