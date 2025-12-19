// app/(public)/insurance/page-client.tsx
"use client";

import { useState } from "react";
import { HeroSection } from "@public/common/hero-section";
import { Input } from "@/components/ui/input";
import { 
    Search, 
    ShieldCheck, 
    FileText,
    Wallet
} from "lucide-react";
import type { Insurance } from "@/types/insurance";

interface InsurancePageClientProps {
    insurances: Insurance[];
}

export function InsurancePageClient({ insurances }: InsurancePageClientProps) {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter logic
    const filteredList = insurances.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-gray-50/50 pb-20">
            {/* 1. Hero Section */}
            <HeroSection
                title="Mitra Asuransi & Korporat"
                description="RSU Deli bekerja sama dengan berbagai perusahaan asuransi terkemuka untuk memudahkan akses layanan kesehatan Anda."
                badge="Partner Resmi"
                backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop"
            />

            <div className="container mx-auto px-4 -mt-16 relative z-10">
                
                {/* 2. Info Cards (Process Steps) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <InfoCard 
                        icon={FileText}
                        title="1. Registrasi"
                        desc="Tunjukkan kartu asuransi & KTP Anda di bagian pendaftaran."
                    />
                    <InfoCard 
                        icon={ShieldCheck}
                        title="2. Verifikasi"
                        desc="Tim kami akan memverifikasi keaktifan & manfaat polis Anda."
                    />
                    <InfoCard 
                        icon={Wallet}
                        title="3. Layanan Cashless"
                        desc="Nikmati layanan kesehatan tanpa tunai sesuai plafon."
                    />
                </div>

                {/* 3. Search & List Section */}
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    
                    {/* Search Header */}
                    <div className="p-8 border-b border-gray-100 bg-white">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Daftar Rekanan</h2>
                                <p className="text-gray-500 mt-1">
                                    Kami menerima {insurances.length}+ asuransi kesehatan
                                </p>
                            </div>

                            {/* Modern Search Input */}
                            <div className="relative w-full md:w-96 group">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-[#32c69a] transition-colors" />
                                <Input 
                                    placeholder="Cari asuransi Anda..." 
                                    className="h-12 pl-11 bg-gray-50 border-gray-200 focus:bg-white focus:border-[#32c69a] focus:ring-4 focus:ring-[#32c69a]/10 transition-all rounded-xl"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* The Grid */}
                    <div className="p-8 bg-gray-50/30">
                        {filteredList.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredList.map((insurance) => (
                                    <InsuranceCard key={insurance.id} name={insurance.name} />
                                ))}
                            </div>
                        ) : (
                            // Empty State
                            <div className="text-center py-16">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Tidak ditemukan</h3>
                                <p className="text-gray-500">
                                    Maaf, asuransi &quot;{searchQuery}&quot; belum terdaftar di sistem kami.
                                </p>
                                <button 
                                    onClick={() => setSearchQuery("")}
                                    className="mt-4 text-[#32c69a] font-semibold hover:underline"
                                >
                                    Lihat semua asuransi
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Footer Note */}
                    <div className="p-6 bg-[#effcf8] border-t border-[#32c69a]/10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3 text-teal-800">
                            <ShieldCheck className="w-5 h-5 shrink-0" />
                            <span className="text-sm font-medium">
                                Asuransi Anda tidak terdaftar? Hubungi kami untuk konfirmasi kerja sama terbaru.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

// ----------------------------------------------------------------------
// Sub-Components
// ----------------------------------------------------------------------

function InfoCard({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>, title: string, desc: string }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg shadow-gray-200/50 border border-gray-100 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#effcf8] flex items-center justify-center shrink-0 border border-[#32c69a]/20">
                <Icon className="w-5 h-5 text-[#32c69a]" />
            </div>
            <div>
                <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function InsuranceCard({ name }: { name: string }) {
    // Generate initials for the logo placeholder
    const initials = name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("");

    const isBPJS = name.toLowerCase().includes("bpjs");

    return (
        <div className="group bg-white p-4 rounded-xl border border-gray-200 hover:border-[#32c69a] hover:shadow-lg hover:shadow-[#32c69a]/10 transition-all duration-300 cursor-default flex items-center gap-4">
            {/* Logo Placeholder */}
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 transition-colors duration-300
                ${isBPJS 
                    ? "bg-green-100 text-green-700 border border-green-200" 
                    : "bg-gray-100 text-gray-500 group-hover:bg-[#32c69a] group-hover:text-white"
                }`}
            >
                {isBPJS ? <ShieldCheck className="w-6 h-6" /> : initials}
            </div>

            <div className="flex flex-col">
                <span className="font-semibold text-gray-700 group-hover:text-gray-900 line-clamp-2 leading-tight">
                    {name}
                </span>
                <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider group-hover:text-[#32c69a]">
                    {isBPJS ? "Government" : "Corporate"}
                </span>
            </div>
        </div>
    );
}