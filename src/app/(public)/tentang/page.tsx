import type { Metadata } from "next";
import {
    Award,
    Target,
    Eye,
    CheckCircle2,
    Heart,
    ShieldCheck,
    Clock,
    Users,
} from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Tentang Kami",
    description:
        "Sejarah, Visi, Misi, dan Nilai-nilai Rumah Sakit Umum Deli Medan.",
};

export default function AboutPage() {
    return (
        <main className="flex flex-col min-h-screen bg-white">
            {/* 1. Page Header / Hero */}
            <section className="relative h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage:
                            "url('http://res.cloudinary.com/rsudeli/image/upload/o_20/v1531979857/ki9o65ulx0dl3cbuac5n.jpg')",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="absolute inset-0 bg-[#32c69a]/80 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                        Tentang Kami
                    </h1>
                    <div className="w-20 h-1 bg-white mx-auto rounded-full" />
                    <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
                        Melayani dengan hati sejak 1965, RSU Deli terus
                        berkomitmen meningkatkan kualitas kesehatan masyarakat
                        Medan.
                    </p>
                </div>
            </section>

            {/* 2. History & Introduction */}
            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Image/Visual */}
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl group">
                            <Image
                                src="https://res.cloudinary.com/rsudeli/image/upload/v1531979857/ki9o65ulx0dl3cbuac5n.jpg"
                                alt="Gedung RSU Deli"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Floating Badge (Add a subtle glass effect) */}
                            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg border-l-4 border-[#32c69a]">
                                <p className="text-[#32c69a] font-bold text-4xl">
                                    50+
                                </p>
                                <p className="text-gray-600 font-medium">
                                    Tahun Pengabdian
                                </p>
                            </div>
                        </div>

                        {/* Right: Text Content */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-[#32c69a] font-semibold tracking-wide uppercase text-sm">
                                <Clock className="w-4 h-4" />
                                <span>Sejarah Kami</span>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800">
                                Dari Klinik Bersalin Menjadi <br />
                                <span className="text-[#32c69a]">
                                    Rumah Sakit Terpercaya
                                </span>
                            </h2>
                            <div className="text-gray-600 space-y-4 leading-relaxed">
                                <p>
                                    Rumah Sakit Umum Deli berawal dari sebuah
                                    klinik bersalin yang didirikan oleh Yayasan
                                    Deli pada tanggal
                                    <strong> 7 Agustus 1965</strong>. Seiring
                                    dengan perkembangan zaman, klinik tersebut
                                    berkembang menjadi Rumah Sakit Umum pada
                                    tahun 1973, dan bertransformasi badan hukum
                                    menjadi PT. Cinta Damai pada tahun 2008.
                                </p>
                                <p>
                                    Sebagai Rumah Sakit Tipe C yang berlokasi
                                    strategis di pusat kota, kami menyediakan
                                    pelayanan medis komprehensif mulai dari
                                    umum, spesialis, hingga subspesialis.
                                </p>
                                <div className="bg-[#f0fdfa] p-4 rounded-lg border border-[#32c69a]/20 mt-4">
                                    <div className="flex gap-3">
                                        <Award className="w-6 h-6 text-[#32c69a] shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-gray-800">
                                                Akreditasi Paripurna
                                            </h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Pada tahun 2023, RSU Deli meraih
                                                Akreditasi tingkat Paripurna
                                                versi Standar Akreditasi Rumah
                                                Sakit Kementrian Kesehatan RI
                                                2022.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Vision & Mission Cards */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Vision Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-[#32c69a] hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-14 h-14 bg-[#f0fdfa] rounded-full flex items-center justify-center mb-6">
                                <Eye className="w-7 h-7 text-[#32c69a]" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Visi Kami
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Menjadikan Rumah Sakit Umum Deli sebagai rumah
                                sakit pilihan dan kebanggaan masyarakat Sumatera
                                Utara khususnya kota Medan.
                            </p>
                        </div>

                        {/* Mission Card */}
                        <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-blue-500 hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                                <Target className="w-7 h-7 text-blue-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                Misi Kami
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    "Meningkatkan mutu pelayanan dengan sasaran kepuasan pasien.",
                                    "Mengutamakan keselamatan pasien (Patient Safety).",
                                    "Menyelenggarakan pendidikan dan pelatihan SDM berkelanjutan.",
                                    "Menjamin ketersediaan sarana prasarana berkualitas.",
                                ].map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-start gap-3 text-gray-600"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Motto / Core Values */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 text-center">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Nilai & Motto Kami
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Prinsip yang kami pegang teguh dalam setiap
                            pelayanan
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {/* 
               Based on the EJS: Disiplin, Elegan, Luwes, Inovatif, Objektif, Keramahan, Ekonomis 
               Usually forms "DELI OKE" or similar, though layout here treats them as pillars
            */}
                        <ValueCard
                            letter="D"
                            title="Disiplin"
                            icon={ShieldCheck}
                        />
                        <ValueCard letter="E" title="Elegan" icon={Award} />
                        <ValueCard letter="L" title="Luwes" icon={Users} />
                        <ValueCard letter="I" title="Inovatif" icon={Target} />
                        <ValueCard letter="O" title="Objektif" icon={Eye} />
                        <ValueCard letter="K" title="Keramahan" icon={Heart} />
                        <ValueCard
                            letter="E"
                            title="Ekonomis"
                            icon={CheckCircle2}
                        />
                    </div>
                </div>
            </section>

            {/* 5. Our Roles Section */}
            <section className="relative py-16 bg-[#32c69a] overflow-hidden">
                {/* Background Pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "radial-gradient(#fff 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                    }}
                />
                <div className="container relative z-10 mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                            Peran & Tanggung Jawab
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                "Menyelenggarakan Pelayanan Asuhan Keperawatan",
                                "Menyelenggarakan Pelayanan Medis",
                                "Menyelenggarakan Pelayanan Penunjang Medis",
                                "Menyelenggarakan Pelayanan Sistem Informasi (SIRS)",
                                "Menyelenggarakan Pelayanan Rehabilitasi Medis",
                                "Menyelenggarakan Pelayanan Administrasi & Keuangan",
                                "Partisipasi Kegiatan Sosial & Yayasan",
                            ].map((role, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-[#32c69a] transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#e0f7f1] flex items-center justify-center shrink-0">
                                        <span className="text-[#32c69a] font-bold">
                                            {idx + 1}
                                        </span>
                                    </div>
                                    <span className="text-gray-700 font-medium">
                                        {role}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

// Small helper component for Motto Cards
function ValueCard({
    title,
    letter,
    icon: Icon,
}: {
    title: string;
    letter: string;
    icon: any;
}) {
    return (
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-[#32c69a] transition-all group">
            <div className="w-12 h-12 mb-4 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-[#32c69a] transition-colors duration-300">
                <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <span className="text-3xl font-bold text-gray-200 mb-2 group-hover:text-[#32c69a] transition-colors">
                {letter}
            </span>
            <span className="font-semibold text-gray-700">{title}</span>
        </div>
    );
}
