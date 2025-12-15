// components/public/common/carousel.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Banner } from "@/types/banner";
import { cn } from "@/lib/utils";

interface BannerCarouselProps {
    banners: Banner[];
    title?: string;
    description?: string;
    className?: string; // Styles the outer <section> (padding/margin)
    ratioClassName?: string; // Styles the image container (aspect ratio)
    autoPlayDelay?: number;
}

export function BannerCarousel({ 
    banners, 
    title, 
    description,
    className,
    // Default to cinematic if not specified
    ratioClassName = "aspect-[21/9] md:aspect-[2.5/1]", 
    autoPlayDelay = 5000 
}: BannerCarouselProps) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    const plugin = React.useRef(
        Autoplay({ delay: autoPlayDelay, stopOnInteraction: true })
    );

    React.useEffect(() => {
        if (!api) return;

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    if (!banners.length) return null;

    return (
        <section className={cn("container mx-auto px-4", className)}>
            {/* Header */}
            {(title || description) && (
                <div className="text-center mb-8 space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {title && (
                        <h2 className="text-3xl font-bold text-[#32c69a]">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            {description}
                        </p>
                    )}
                </div>
            )}

            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 bg-white">
                <Carousel
                    setApi={setApi}
                    plugins={[plugin.current]}
                    className="w-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                    opts={{ loop: true }}
                >
                    <CarouselContent>
                        {banners.map((banner, index) => (
                            <CarouselItem key={banner.id || index}>
                                {/* Dynamic Aspect Ratio Class applied here */}
                                <div className={cn("relative w-full", ratioClassName)}>
                                    <Image
                                        src={banner.image_url || ""}
                                        alt={banner.name || "RSU Deli"}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                                        priority={index === 0}
                                    />
                                    {/* Subtle Overlay */}
                                    <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Pagination Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10 
                        bg-black/20 backdrop-blur-md border border-white/10 p-2 rounded-full shadow-lg">
                        {Array.from({ length: count }).map((_, index) => (
                            <button
                                key={index}
                                className={cn(
                                    "h-1.5 rounded-full transition-all duration-500 ease-out",
                                    index + 1 === current
                                        ? "w-6 bg-[#32c69a] shadow-[0_0_8px_rgba(50,198,154,0.6)]"
                                        : "w-1.5 bg-white/60 hover:bg-white"
                                )}
                                onClick={() => api?.scrollTo(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </Carousel>
            </div>
        </section>
    );
}