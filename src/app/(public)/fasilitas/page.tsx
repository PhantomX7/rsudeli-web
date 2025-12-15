import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Data with icon_url pointing to public/images folder
const FACILITIES = [
    {
        title: "Unit Gawat Darurat",
        icon_url: "/images/emergency.png", 
        subtitle: null,
        points: [
            "Pelayanan 24 jam",
            "Dokter dan perawat berpengalaman",
            "Pertolongan cepat, tepat, dan ramah"
        ]
    },
    {
        title: "Unit Rawat Inap",
        icon_url: "/images/unitrawatinap.png",
        subtitle: null,
        points: [
            "Kamar bersih, nyaman, dan ber-AC",
            "Dokter ruangan 24 jam",
            "Perawat ramah, sigap, dan terlatih"
        ]
    },
    {
        title: "High Dependency Unit",
        icon_url: "/images/hdu.png",
        subtitle: null,
        points: [
            "Kamar bersih dan nyaman",
            "Perawat ramah, sigap, terlatih, dan berpengalaman"
        ]
    },
    {
        title: "Unit Kamar Operasi",
        icon_url: "/images/uko.png",
        subtitle: null,
        points: [
            "Ruang operasi steril dan nyaman",
            "Perawat terlatih dan berpengalaman"
        ]
    },
    {
        title: "Unit Laboratorium",
        icon_url: "/images/unitlab.png",
        subtitle: null,
        points: [
            "Pelayanan 24 jam",
            "Hasil pemeriksaan selesai dalam waktu ±3 jam",
            "Konsultasi hasil laboratorium oleh dokter jaga"
        ]
    },
    {
        title: "Unit Kamar Bersalin",
        icon_url: "/images/unitkamarbersalin.png",
        subtitle: null,
        points: [
            "Kamar bersih dan nyaman",
            "Ruang bayi yang dilengkapi dengan inkubator",
            "Bidan ramah, sigap, terlatih, dan berpengalaman"
        ]
    },
    {
        title: "Unit Rawat Intensif (ICU)",
        icon_url: "/images/icu.png",
        subtitle: null,
        points: [
            "Kamar bersih dan nyaman",
            "Perawat sigap, terlatih, berpengalaman, dan ramah",
            "Dokter ruangan 24 jam"
        ]
    },
    {
        title: "Unit Farmasi",
        icon_url: "/images/unitfarmasi.png",
        subtitle: null,
        points: [
            "Pelayanan 24 jam",
            "Pelayanan resep obat jadi ± 30 menit",
            "Pelayanan resep obat racikan ± 60 menit",
            "Obat resmi (asli) dari distributor resmi",
            "Penyimpan obat sesuai dengan standar"
        ]
    },
    {
        title: "Unit Fisioterapi",
        icon_url: "/images/unitfisioterapi.png",
        subtitle: "Pengobatan dengan menggunakan:",
        points: [
            "Infra-merah",
            "Lumbal Traksi (tarikan pada leher/pinggang)",
            "Manual Therapy (menggerakkan persendian)",
            "Exercise Therapy (metode latihan khusus)",
            "Modern Massage (pengurutan modern)",
            "Fisioterapis yang terampil, sigap, dan berpengalaman"
        ]
    },
    {
        title: "Unit Radiologi (X-Ray, CT Scan, USG)",
        icon_url: "/images/xray.png", // Assuming generic icon for the group
        subtitle: null,
        points: [
            "Pelayanan 24 jam",
            "Hasil pemeriksaan selesai dalam waktu ±3 jam",
            "Konsultasi hasil foto oleh dokter jaga"
        ]
    },
];

export default function FacilitiesPage() {
    return (
        <main className="min-h-screen bg-gray-50/50">
            
            {/* 1. HERO SECTION */}
            <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div 
                    className="absolute inset-0 z-0 bg-teal-900"
                    style={{
                        backgroundImage: "url('https://res.cloudinary.com/rsudeli/image/upload/c_scale,h_1080,q_auto/v1530936876/Image/LRM_EXPORT_20180629_144159.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="absolute inset-0 bg-[#32c69a]/90 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-black/20" />
                </div>
                
                <div className="relative z-10 text-center px-4 max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold mb-4 tracking-wide">
                        RSU DELI MEDAN
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight drop-shadow-md">
                        Fasilitas & Layanan
                    </h1>
                    <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
                        Kami menyediakan fasilitas medis modern yang lengkap untuk menunjang
                        kesembuhan dan kenyamanan Anda selama perawatan.
                    </p>
                </div>
            </section>

            {/* 2. FACILITIES GRID */}
            <section className="container mx-auto px-4 py-20 -mt-20 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {FACILITIES.map((item, index) => (
                        <div 
                            key={index}
                            className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-[#32c69a]/10 hover:-translate-y-1 transition-all duration-300"
                        >
                            {/* Card Header: Icon & Title */}
                            <div className="p-6 pb-2">
                                <div className="flex items-center gap-4 mb-4">
                                    {/* Icon Container */}
                                    <div className="relative w-14 h-14 shrink-0 rounded-xl bg-[#effcf8] flex items-center justify-center border border-[#32c69a]/10 group-hover:bg-[#32c69a] transition-colors duration-300">
                                        <div className="relative w-8 h-8">
                                            <Image 
                                                src={item.icon_url}
                                                alt={item.title}
                                                fill
                                                className="object-contain transition-all duration-300 group-hover:brightness-0 group-hover:invert"
                                                sizes="32px"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-[#32c69a] transition-colors">
                                        {item.title}
                                    </h3>
                                </div>
                                
                                <div className="h-px w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
                            </div>

                            {/* Card Body: The List */}
                            <div className="p-6 pt-2 flex-1 bg-white">
                                {item.subtitle && (
                                    <p className="text-sm font-semibold text-[#32c69a] mb-3 uppercase tracking-wide">
                                        {item.subtitle}
                                    </p>
                                )}

                                <ul className="space-y-3">
                                    {item.points.map((point, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-[#32c69a] shrink-0 mt-0.5" />
                                            <span className="text-gray-600 text-sm leading-relaxed font-medium">
                                                {point}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Decorative bottom bar */}
                            <div className="h-1.5 w-full bg-gradient-to-r from-[#32c69a] to-[#28a580] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. CTA SECTION */}
            <section className="container mx-auto px-4 pb-20">
                <div className="bg-[#32c69a] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-teal-500/20">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" 
                        style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} 
                    />
                    
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold">Butuh Layanan Gawat Darurat?</h2>
                        <p className="text-teal-50 text-lg">
                            Tim IGD kami siap melayani Anda 24 jam sehari, 7 hari seminggu dengan armada ambulans lengkap.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Button 
                                size="lg" 
                                className="bg-white text-[#32c69a] hover:bg-gray-50 border-0 font-bold h-12 rounded-full px-8 shadow-lg transition-transform hover:scale-105"
                                asChild
                            >
                                <a href="tel:+626112345678">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Hubungi IGD (061) 123-456
                                </a>
                            </Button>
                            <Button 
                                size="lg" 
                                variant="outline" 
                                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white font-semibold h-12 rounded-full px-8 backdrop-blur-sm"
                                asChild
                            >
                                <Link href="/jadwaldokter">
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