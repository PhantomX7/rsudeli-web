"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"; // npm install embla-carousel-autoplay
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Banner } from "@/types/banner";
import { cn } from "@/lib/utils";

interface PromoCarouselProps {
    banners: Banner[];
}

export function PromoCarousel({ banners }: PromoCarouselProps) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    // Auto-play plugin configuration
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
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
        <section className="container mx-auto px-4 py-16">
            <div className="text-center mb-10 space-y-2">
                <h2 className="text-3xl font-bold text-[#32c69a]">
                    Promo & Informasi
                </h2>
                <p className="text-gray-500">
                    Layanan dan penawaran terbaru dari kami
                </p>
            </div>

            <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-gray-200 border border-gray-100 bg-white">
                <Carousel
                    setApi={setApi}
                    plugins={[plugin.current]}
                    className="w-full"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {banners.map((banner, index) => (
                            <CarouselItem key={banner.id || index}>
                                <div className="relative w-full aspect-4/5 md:aspect-video lg:aspect-21/9">
                                    <Image
                                        src={banner.image_url || ""}
                                        alt={banner.name || "RSU Deli Promo"}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                                        priority={index === 0}
                                    />
                                    {/* Optional: Gradient at bottom for text readability if you add captions later */}
                                    <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/20 to-transparent pointer-events-none" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {/* Custom Pagination Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-10 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        {Array.from({ length: count }).map((_, index) => (
                            <button
                                key={index}
                                className={cn(
                                    "h-2.5 rounded-full transition-all duration-300",
                                    index + 1 === current
                                        ? "w-8 bg-[#32c69a]" // Brand Color Active
                                        : "w-2.5 bg-white/70 hover:bg-white" // Inactive
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
