// app/(public)/facility/page.tsx
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@public/common/hero-section";
import { getPublicPaginatedFacilitiesAction } from "@/actions/public/facility";
import { getPublicBannersAction } from "@/actions/public/banner"; // Import this
import { BannerCarousel } from "@public/common/carousel"; // Import updated component

// Helper to parse description
function parseDescription(description: string): string[] {
    if (!description) return [];
    try {
        const parsed = JSON.parse(description);
        if (Array.isArray(parsed)) return parsed;
    } catch {
        if (description.includes("\n")) {
            return description.split("\n").filter((line) => line.trim() !== "");
        }
        return description.trim() ? [description] : [];
    }
    return [];
}

export default async function FacilitiesPage() {
    // 1. Fetch Facilities and Banners in parallel
    const [facilitiesResult, bannersResult] = await Promise.all([
        getPublicPaginatedFacilitiesAction({}),
        getPublicBannersAction("facility"), // Assuming you can filter by slug, or use "home"
    ]);

    const facilities = facilitiesResult.data ?? [];
    const banners = bannersResult.data ?? [];

    return (
        <main className="min-h-screen bg-gray-50/50">
            {/* 1. HERO SECTION */}
            <HeroSection
                title="Fasilitas & Layanan"
                description="Kami menyediakan fasilitas medis modern yang lengkap untuk menunjang kesembuhan dan kenyamanan Anda selama perawatan."
                badge="RSU DELI MEDAN"
                backgroundImage="https://res.cloudinary.com/rsudeli/image/upload/c_scale,h_1080,q_auto/v1530936876/Image/LRM_EXPORT_20180629_144159.jpg"
                // Increase height slightly to accommodate the floating banner
            />

            {/* 2. FACILITY BANNER CAROUSEL (Floating) */}
            {banners.length > 0 && (
                <div className="relative z-20 -mt-16 lg:-mt-16 mb-16">
                    <BannerCarousel banners={banners} className="max-w-6xl" />
                </div>
            )}

            {/* 3. FACILITIES GRID */}
            <section className="container mx-auto px-4 pb-20 relative z-10">
                {/* Optional Section Header if banners exist, to separate content */}
                {banners.length > 0 && (
                    <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Daftar Fasilitas Lengkap
                        </h2>
                        <div className="h-1 w-20 bg-[#32c69a] mx-auto mt-4 rounded-full" />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {facilities.map((facility) => {
                        const points = parseDescription(facility.description);

                        return (
                            <div
                                key={facility.id}
                                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-[#32c69a]/10 hover:-translate-y-1 transition-all duration-300"
                            >
                                {/* Card Header */}
                                <div className="p-6 pb-2">
                                    <div className="flex items-center gap-4 mb-4">
                                        {/* Icon */}
                                        <div className="relative w-14 h-14 shrink-0">
                                            <Image
                                                src={facility.icon_url}
                                                alt={facility.name}
                                                fill
                                                className="object-contain"
                                                sizes="56px"
                                            />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-[#32c69a] transition-colors">
                                            {facility.name}
                                        </h3>
                                    </div>

                                    <div className="h-px w-full bg-linear-to-r from-gray-100 via-gray-200 to-gray-100" />
                                </div>

                                {/* Card Body */}
                                <div className="p-6 pt-2 flex-1 bg-white">
                                    {points.length > 0 ? (
                                        <ul className="space-y-3">
                                            {points.map((point, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-start gap-3"
                                                >
                                                    <CheckCircle2 className="w-5 h-5 text-[#32c69a] shrink-0 mt-0.5" />
                                                    <span className="text-gray-600 text-sm leading-relaxed font-medium">
                                                        {point}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-400 text-sm italic">
                                            Informasi detail belum tersedia.
                                        </p>
                                    )}
                                </div>

                                {/* Hover Bar */}
                                <div className="h-1.5 w-full bg-linear-to-r from-[#32c69a] to-[#28a580] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </div>
                        );
                    })}
                </div>

                {facilities.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg">
                            Belum ada data fasilitas yang tersedia.
                        </p>
                    </div>
                )}
            </section>

            {/* 4. CTA SECTION */}
            <section className="container mx-auto px-4 pb-20">
                <div className="bg-[#32c69a] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-teal-500/20">
                    <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                            backgroundImage:
                                "radial-gradient(#fff 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    />

                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold">
                            Butuh Layanan Gawat Darurat?
                        </h2>
                        <p className="text-teal-50 text-lg">
                            Tim IGD kami siap melayani Anda 24 jam sehari, 7
                            hari seminggu dengan armada ambulans lengkap.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button
                                size="lg"
                                className="bg-white text-[#32c69a] hover:bg-gray-50 border-0 font-bold h-12 rounded-full px-8 shadow-lg transition-transform hover:scale-105"
                                asChild
                            >
                                <a href="tel:+62614565229">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Hubungi IGD (061) 4565 229
                                </a>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white font-semibold h-12 rounded-full px-8 backdrop-blur-sm"
                                asChild
                            >
                                <Link href="/dokter">
                                    Cari Dokter Spesialis
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
