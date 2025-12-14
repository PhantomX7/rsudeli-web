// components/public/doctor/doctor-grid.tsx
import { DoctorCard } from "./doctor-card";
import type { Doctor } from "@/types/doctor";

interface DoctorGridProps {
    doctors: Doctor[];
    emptyMessage?: string;
}

export function DoctorGrid({
    doctors,
    emptyMessage = "Tidak ada dokter yang ditemukan.",
}: DoctorGridProps) {
    if (doctors.length === 0) {
        return (
            <div className="col-span-full py-16 text-center">
                <p className="text-gray-500">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
        </div>
    );
}
