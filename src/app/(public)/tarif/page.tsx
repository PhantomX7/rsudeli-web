// app/(public)/tarif/page.tsx
import { HeroSection } from "@public/common/hero-section";
import { 
    Bed, 
    BedDouble, 
    Baby, 
    Info, 
    Stethoscope, 
    AlertCircle 
} from "lucide-react";
import type { Room } from "@/types/room";
import { formatPrice } from "@/lib/format";
import { getPublicPaginatedRoomsAction } from "@/actions/public/room";

export default async function TarifPage() {
    const { data: rooms } = await getPublicPaginatedRoomsAction({});
    
    const generalRooms = rooms
        ?.filter((r) => r.type === "adult")
        .sort((a, b) => a.display_order - b.display_order) || [];
    
    const pediatricRooms = rooms
        ?.filter((r) => r.type === "child")
        .sort((a, b) => a.display_order - b.display_order) || [];

    return (
        <main className="min-h-screen bg-gray-50/50 pb-20">
            {/* Hero Section */}
            <HeroSection
                title="Tarif & Layanan Kamar"
                description="Informasi transparansi harga kamar rawat inap di RSU Deli Medan. Kenyamanan Anda adalah prioritas kami."
                badge="RSU DELI MEDAN"
                backgroundImage="https://res.cloudinary.com/rsudeli/image/upload/c_scale,h_1080,q_auto/v1530936876/Image/LRM_EXPORT_20180629_144159.jpg"
            />

            <div className="container mx-auto px-4 -mt-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Column 1: General Care */}
                    <PricingCard 
                        title="Ruangan Perawatan Umum" 
                        icon={Stethoscope}
                        rooms={generalRooms} 
                    />

                    {/* Column 2: Pediatric & Info */}
                    <div className="flex flex-col gap-8">
                        <PricingCard 
                            title="Ruangan Perawatan Anak" 
                            subtitle="( < 14 Tahun )"
                            icon={Baby}
                            rooms={pediatricRooms} 
                        />

                        {/* Important Note Box */}
                        <div className="bg-[#fff8f0] border-l-4 border-orange-400 p-6 rounded-r-xl shadow-sm">
                            <div className="flex items-start gap-4">
                                <AlertCircle className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
                                <div className="space-y-2">
                                    <h4 className="font-bold text-gray-800">Catatan Penting</h4>
                                    <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                                        <li>Harga dapat berubah sewaktu-waktu tanpa pemberitahuan.</li>
                                        <li>Nominal panjar (Deposit) ditentukan oleh Bagian Administrasi saat pendaftaran.</li>
                                        <li>Fasilitas tambahan (Extra Bed/Sofa) dikenakan biaya terpisah.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

// ----------------------------------------------------------------------
// Sub-Component: Pricing List Card
// ----------------------------------------------------------------------

interface PricingCardProps {
    title: string;
    subtitle?: string;
    icon: React.ComponentType<{ className?: string }>;
    rooms: Room[];
}

function PricingCard({ title, subtitle, icon: Icon, rooms }: PricingCardProps) {
    // Helper to determine room icon
    const getRoomIcon = (room: Room) => {
        // Check if room name contains certain keywords for icon selection
        const name = room.name.toLowerCase();
        
        if (name.includes("bedded") || name.includes("sharing") || name.includes("ward")) {
            return <BedDouble className="w-5 h-5 text-gray-400" />;
        }
        
        return <Bed className="w-5 h-5 text-gray-400" />;
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden flex flex-col h-full">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-linear-to-r from-gray-50 to-white">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#effcf8] flex items-center justify-center border border-[#32c69a]/20">
                        <Icon className="w-5 h-5 text-[#32c69a]" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                        {subtitle && (
                            <p className="text-sm text-gray-500 font-medium">{subtitle}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* List */}
            <div className="flex-1">
                {rooms.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <Bed className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>Tidak ada data kamar tersedia</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-50">
                        {rooms.map((room) => (
                            <li 
                                key={room.id} 
                                className="group p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50 transition-colors duration-200"
                            >
                                {/* Room Name & Info */}
                                <div className="flex items-start gap-3">
                                    <div className="mt-1 sm:mt-0">
                                        {getRoomIcon(room)}
                                    </div>
                                    
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-semibold text-gray-700">
                                                {room.name}
                                            </span>
                                        </div>
                                        {room.note && (
                                            <div className="flex items-center gap-1.5 mt-1 text-xs text-orange-600 font-medium">
                                                <Info className="w-3 h-3" />
                                                {room.note}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="flex items-center gap-2 sm:text-right">
                                    <div className="flex flex-col items-start sm:items-end">
                                        <span className="text-sm text-gray-400 font-medium">
                                            Mulai dari
                                        </span>
                                        <span className="text-lg font-bold text-[#32c69a] font-mono tracking-tight">
                                            {formatPrice(room.price)}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            
            {/* Footer */}
            <div className="bg-gray-50 p-4 text-center">
                <p className="text-xs text-gray-400 font-medium">
                    *Harga per malam / per tindakan
                </p>
            </div>
        </div>
    );
}