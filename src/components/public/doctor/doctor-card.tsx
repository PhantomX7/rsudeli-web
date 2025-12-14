// components/public/doctor/doctor-card.tsx
"use client";

import Image from "next/image";
import { Calendar, Stethoscope } from "lucide-react";
import type { Doctor } from "@/types/doctor";

interface DoctorCardProps {
    doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
    const subtitle =
        doctor.type === "specialist"
            ? `Spesialis ${doctor.specialist?.name || "Medis"}`
            : "Dokter Umum";

    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {/* Image Area */}
            <div className="relative aspect-4/5 w-full overflow-hidden bg-gray-100">
                {doctor.image_url ? (
                    <Image
                        src={doctor.image_url}
                        alt={doctor.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-200">
                        <div className="mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-white/50 backdrop-blur-sm">
                            <Stethoscope className="h-10 w-10 text-[#32c69a]/40" />
                        </div>
                        <span className="text-sm font-medium tracking-wide text-gray-400">
                            RSU DELI
                        </span>
                    </div>
                )}

                {/* Badge */}
                <div className="absolute left-4 top-4">
                    <span
                        className={`rounded-full px-3 py-1 text-xs font-bold shadow-sm backdrop-blur-md ${
                            doctor.type === "specialist"
                                ? "bg-[#32c69a]/90 text-white"
                                : "bg-blue-500/90 text-white"
                        }`}
                    >
                        {doctor.type === "specialist" ? "Spesialis" : "Umum"}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                <div className="mb-4">
                    <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#32c69a]">
                        {subtitle}
                    </p>
                    <h3 className="text-lg font-bold leading-tight text-gray-800 transition-colors group-hover:text-[#32c69a]">
                        {doctor.title} {doctor.name}
                    </h3>
                </div>

                {/* Schedule Preview */}
                <div className="mt-auto space-y-3">
                    <div className="h-px w-full bg-gray-100" />

                    <div className="flex items-start gap-2 text-sm text-gray-500">
                        <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[#32c69a]" />
                        <div className="flex flex-col gap-1">
                            <span className="text-xs font-medium text-gray-700">
                                Jadwal Praktik:
                            </span>
                            {doctor.schedules && doctor.schedules.length > 0 ? (
                                <ul className="space-y-1 text-xs">
                                    {doctor.schedules
                                        .slice(0, 2)
                                        .map((sch, idx) => (
                                            <li
                                                key={idx}
                                                className="flex w-full justify-between gap-4"
                                            >
                                                <span>{sch.day}</span>
                                                <span>
                                                    {sch.start_time} -{" "}
                                                    {sch.end_time}
                                                </span>
                                            </li>
                                        ))}
                                    {doctor.schedules.length > 2 && (
                                        <li className="italic text-[#32c69a]">
                                            + {doctor.schedules.length - 2}{" "}
                                            jadwal lainnya
                                        </li>
                                    )}
                                </ul>
                            ) : (
                                <span className="text-xs italic text-gray-400">
                                    Hubungi kami untuk jadwal
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
