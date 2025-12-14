// app/page.tsx
import { getPublicBannersAction } from "@/actions/public/banner";
import { HeroSection } from "@public/home/hero-section";
import { PromoCarousel } from "@public/home/promo-carousel";
import { ServiceHighlights } from "@public/home/service-highlights"; // Import the new component

// Force dynamic rendering (SSR)
export const dynamic = "force-dynamic";

export default async function Home() {
    const bannersResult = await getPublicBannersAction("home");
    const banners = bannersResult.success ? bannersResult.data ?? [] : [];

    return (
        <main className="flex flex-col min-h-screen bg-gray-50/50">
            {/* 1. Hero Section */}
            <HeroSection />

            {/* 2. Service Highlights (The floating cards) */}
            <ServiceHighlights />

            {/* 3. Promo Carousel */}
            {banners.length > 0 && <PromoCarousel banners={banners} />}

            {/* Optional: About / Trust Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Mengapa Memilih RSU Deli ?
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        Sejak didirikan, RSU Deli telah menjadi kepercayaan
                        masyarakat Medan dalam memberikan layanan kesehatan.
                        Kami menggabungkan keahlian medis dengan pelayanan yang
                        ramah dan tulus untuk kesembuhan Anda.
                    </p>
                </div>
            </section>
        </main>
    );
}
