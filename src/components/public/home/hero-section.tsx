import Link from "next/link";
import { ArrowRight, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (
        <section className="relative w-full h-[600px] lg:h-[750px] flex items-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        "url('http://res.cloudinary.com/rsudeli/image/upload/o_20/v1531979857/ki9o65ulx0dl3cbuac5n.jpg')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }}
            />

            {/* Modern "Greener" Gradient Overlay */}
            {/* Goes from a Light Mint color to transparent */}
            <div className="absolute inset-0 bg-linear-to-r from-[#effcf8] via-[#effcf8]/90 to-[#32c69a]/10" />

            {/* Decorative Pattern (Optional - adds professional texture) */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "radial-gradient(#32c69a 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                }}
            />

            {/* Content */}
            <div className="container relative z-10 mx-auto px-4">
                <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-left-10 duration-700">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#32c69a]/10 text-[#32c69a] border border-[#32c69a]/20">
                        <Activity className="h-4 w-4" />
                        <span className="text-sm font-semibold tracking-wide uppercase">
                            Melayani Dengan Hati
                        </span>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-[1.15]">
                            Kesehatan Anda Adalah <br />
                            <span className="text-[#32c69a]">
                                Prioritas Kami
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                            RSU Deli menghadirkan layanan kesehatan terpadu
                            dengan fasilitas modern dan tim medis spesialis yang
                            siap melayani Anda 24 jam.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <Button
                            asChild
                            size="lg"
                            className="bg-[#32c69a] hover:bg-[#28a580] text-white rounded-full px-8 h-12 text-base font-bold shadow-lg shadow-teal-500/30 transition-all hover:scale-105"
                        >
                            <Link href="/dokter">
                                Cari Dokter
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-[#32c69a] text-[#32c69a] hover:bg-[#32c69a]/5 rounded-full px-8 h-12 text-base font-bold"
                        >
                            <Link href="/fasilitas">Lihat Fasilitas</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
