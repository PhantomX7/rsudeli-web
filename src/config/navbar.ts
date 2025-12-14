// --- Configuration ---
export const NAVIGATION = [
    { label: "Tentang kami", href: "/tentang" },
    {
        label: "Dokter Kami",
        href: "#",
        children: [
            { label: "Dokter Umum", href: "/dokter/umum" },
            { label: "Dokter Spesialis", href: "/dokter/spesialis" },
            { label: "Jadwal Dokter", href: "/dokter/jadwal" },
        ],
    },
    { label: "Fasilitas & Layanan", href: "/fasilitas" },
    {
        label: "Tarif",
        href: "#",
        children: [
            { label: "Tarif Kamar", href: "/tarif" },
            { label: "Asuransi", href: "/asuransi" },
        ],
    },
    {
        label: "Kegiatan",
        href: "#",
        children: [
            { label: "Kegiatan Umum", href: "/kegiatan" },
            { label: "Akreditasi", href: "/akreditasi" },
        ],
    },
    { label: "Artikel", href: "/artikel" },
    { label: "Hubungi kami", href: "/hubungi" },
];