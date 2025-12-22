import Link from "next/link";
import {
    Ambulance,
    Stethoscope,
    Microscope,
    HeartPulse,
    ArrowRight,
} from "lucide-react";

const SERVICES = [
    {
        icon: Ambulance,
        title: "IGD 24 Jam",
        desc: "Layanan gawat darurat dengan armada ambulans modern dan tim medis reaksi cepat.",
        link: "/fasilitas",
    },
    {
        icon: Stethoscope,
        title: "Dokter Spesialis",
        desc: "Konsultasi dengan dokter spesialis berpengalaman dari berbagai bidang medis.",
        link: "/dokter",
    },
    {
        icon: Microscope,
        title: "Laboratorium",
        desc: "Pemeriksaan diagnostik lengkap dengan peralatan teknologi terkini yang akurat.",
        link: "/fasilitas",
    },
    {
        icon: HeartPulse,
        title: "Medical Check Up",
        desc: "Paket pemeriksaan kesehatan menyeluruh untuk deteksi dini dan pencegahan.",
        link: "/fasilitas",
    },
];

export function ServiceHighlights() {
    return (
        <section className="relative z-20 px-4 pb-12">
            <div className="container mx-auto">
                {/* Negative margin pulls the grid UP over the hero section */}
                <div className="relative -mt-12 lg:-mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {SERVICES.map((service, idx) => (
                        <div
                            key={idx}
                            className="group bg-white rounded-xl p-6 shadow-lg border border-gray-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#32c69a]/10"
                        >
                            {/* Icon Bubble */}
                            <div className="w-14 h-14 rounded-full bg-[#32c69a]/10 flex items-center justify-center mb-5 group-hover:bg-[#32c69a] transition-colors duration-300">
                                <service.icon className="w-7 h-7 text-[#32c69a] group-hover:text-white transition-colors duration-300" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#32c69a] transition-colors">
                                {service.title}
                            </h3>

                            <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                {service.desc}
                            </p>

                            <Link
                                href={service.link}
                                className="inline-flex items-center text-sm font-semibold text-[#32c69a] hover:text-[#28a580]"
                            >
                                Selengkapnya
                                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
