"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Calendar, Stethoscope, X, Clock } from "lucide-react";
import type { Doctor, DoctorSchedule } from "@/types/doctor";

interface DoctorCardProps {
    doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
    const [showScheduleModal, setShowScheduleModal] = useState(false);

    const subtitle =
        doctor.type === "specialist"
            ? `Spesialis ${doctor.specialist?.name || "Medis"}`
            : "Dokter Umum";

    return (
        <>
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* Image Area - Hidden on mobile, visible on sm+ */}
                <div className="relative hidden aspect-4/5 w-full overflow-hidden bg-gray-100 sm:block">
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
                            className={`rounded-full px-4 py-1.5 text-xs font-bold shadow-sm backdrop-blur-md sm:text-sm ${
                                doctor.type === "specialist"
                                    ? "bg-[#32c69a]/95 text-white"
                                    : "bg-blue-500/95 text-white"
                            }`}
                        >
                            {doctor.type === "specialist" ? "Spesialis" : "Umum"}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="mb-5">
                        <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-[#32c69a] sm:text-sm">
                            {subtitle}
                        </p>
                        {/* Name */}
                        <h3 className="text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-[#32c69a] sm:text-2xl">
                            {doctor.title} {doctor.name}
                        </h3>
                    </div>

                    {/* Schedule Preview */}
                    <div className="mt-auto space-y-4">
                        <div className="h-px w-full bg-gray-100" />

                        <div className="flex items-start gap-3 text-gray-500">
                            <Calendar className="mt-1 h-5 w-5 shrink-0 text-[#32c69a]" />
                            <div className="flex flex-col gap-2 w-full">
                                <span className="text-sm font-semibold text-gray-700">
                                    Jadwal Praktik:
                                </span>
                                {doctor.schedules && doctor.schedules.length > 0 ? (
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        {doctor.schedules
                                            .slice(0, 2)
                                            .map((sch, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex w-full justify-between gap-2"
                                                >
                                                    <span className="font-medium text-gray-900 w-1/3">
                                                        {sch.day}
                                                    </span>
                                                    <span className="text-right w-2/3">
                                                        {sch.start_time} - {sch.end_time}
                                                    </span>
                                                </li>
                                            ))}
                                        {doctor.schedules.length > 2 && (
                                            <li 
                                                className="cursor-pointer font-medium text-[#32c69a] hover:underline hover:text-[#28a07c] transition-colors py-1"
                                                onClick={() => setShowScheduleModal(true)}
                                            >
                                                + {doctor.schedules.length - 2}{" "}
                                                jadwal lainnya
                                            </li>
                                        )}
                                    </ul>
                                ) : (
                                    <span className="text-sm italic text-gray-400">
                                        Hubungi kami untuk jadwal
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Render Modal via Portal */}
            <ScheduleModal 
                isOpen={showScheduleModal} 
                onClose={() => setShowScheduleModal(false)}
                doctorName={`${doctor.title} ${doctor.name}`}
                schedules={doctor.schedules || []}
            />
        </>
    );
}

// --- Schedule Modal Component ---

interface ScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    doctorName: string;
    schedules: DoctorSchedule[];
}

function ScheduleModal({ isOpen, onClose, doctorName, schedules }: ScheduleModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div 
                className="relative w-[95%] max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="bg-[#32c69a] px-6 py-5 text-white shrink-0">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-bold tracking-tight">Detail Jadwal Praktik</h3>
                            <p className="mt-1 text-base text-white/90 font-medium leading-snug">
                                {doctorName}
                            </p>
                        </div>
                        <button 
                            onClick={onClose}
                            className="rounded-full bg-white/20 p-2 hover:bg-white/30 transition-colors shrink-0"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                <div className="p-5 overflow-y-auto">
                    {schedules.length > 0 ? (
                        <div className="grid gap-4">
                            {schedules.map((sch, idx) => (
                                <div 
                                    key={idx} 
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4 hover:border-[#32c69a]/30 hover:bg-[#32c69a]/5 transition-colors shadow-sm"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm text-[#32c69a] border border-gray-100">
                                            <Calendar className="h-5 w-5" />
                                        </div>
                                        <span className="text-lg font-bold text-gray-800 capitalize">
                                            {sch.day}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-center gap-2 text-base font-semibold text-gray-700 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 ml-14 sm:ml-0">
                                        <Clock className="h-4 w-4 text-[#32c69a]" />
                                        <span>
                                            {sch.start_time} - {sch.end_time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center flex flex-col items-center justify-center text-gray-500">
                            <Calendar className="h-12 w-12 text-gray-300 mb-3" />
                            <p className="text-lg font-medium">Tidak ada data jadwal tersedia.</p>
                        </div>
                    )}
                </div>

                <div className="bg-gray-50 px-6 py-4 text-center text-sm font-medium text-gray-500 border-t border-gray-100 shrink-0">
                    *Jadwal dapat berubah sewaktu-waktu
                </div>
            </div>
        </div>,
        document.body
    );
}