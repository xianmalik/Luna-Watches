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

interface SlideSingleton {
    image: string;
    title: string;
    description: string;
    button: {
        text: string;
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
                            <div className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[600px] px-10">
                                {/* Left Part of Slider */}
                                <div>
                                    <h1 className="text-2xl md:text-6xl tracking-wider leading-[1.2] font-medium text-balance">
                                        {slide.title}
                                    </h1>
                                    <h6>
                                        {slide.description}
                                    </h6>
                                    <Button className="mt-4 uppercase" variant="default" size="lg" asChild>
                                        <Link href={slide.button.url}>{slide.button.text}</Link>
                                    </Button>
                                </div>
                                
                                {/* Right part of Slider */}
                                <div className="flex justify-end">
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
                    <CarouselPrevious variant="default" className="rounded-none" />
                    <CarouselNext variant="default" className="rounded-none" />
                </div>
            </Carousel>
        </section>
    );
}