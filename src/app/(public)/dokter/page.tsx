// app/(public)/doctor/page.tsx
import { Suspense } from "react";
import { getPublicPaginatedDoctorsAction } from "@/actions/public/doctor";
import { getPublicPaginatedSpecialistsAction } from "@/actions/public/specialist";
import { DoctorPageHeader } from "@/components/public/doctor/doctor-page-header";
import { DoctorFilterBar } from "@/components/public/doctor/doctor-filter-bar";
import { DoctorGrid } from "@/components/public/doctor/doctor-grid";
import { Loader2 } from "lucide-react";

interface DoctorPageProps {
    searchParams: Promise<{
        name?: string;          // "like:doctorname" format
        specialist_id?: string;
        type?: string;
    }>;
}

export default async function DoctorPage({ searchParams }: DoctorPageProps) {
    const params = await searchParams;

    const [doctorsResult, specialistsResult] = await Promise.all([
        getPublicPaginatedDoctorsAction({
            name: params.name,              // Pass as-is, backend handles "like:" format
            specialist_id: params.specialist_id,
            type: params.type,
        }),
        getPublicPaginatedSpecialistsAction({ limit: "100" }),
    ]);

    const doctors = doctorsResult.data ?? [];
    const specialists = specialistsResult.data ?? [];

    return (
        <main className="min-h-screen bg-gray-50 pb-20">
            <DoctorPageHeader
                title="Tim Dokter Kami"
                description="Tenaga medis profesional dan berpengalaman yang siap melayani kebutuhan kesehatan Anda."
            />

            <div className="container relative z-20 mx-auto -mt-8 px-4">
                <Suspense fallback={<FilterBarSkeleton />}>
                    <DoctorFilterBar
                        totalCount={doctors.length}
                        specialists={specialists}
                        showTypeFilter
                    />
                </Suspense>

                <div className="mt-12">
                    <Suspense fallback={<GridSkeleton />}>
                        <DoctorGrid doctors={doctors} />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}

function FilterBarSkeleton() {
    return (
        <div className="h-[88px] animate-pulse rounded-xl bg-gray-200" />
    );
}

function GridSkeleton() {
    return (
        <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-[#32c69a]" />
        </div>
    );
}