import type { Metadata } from "next";
// Using Open Sans for body text (readable) and Montserrat for headings (modern/medical)
import { Open_Sans, Montserrat } from "next/font/google";
import Header from "@public/layout/header"; // Adjust path to where you saved the Header
import { Footer } from "@public/layout/footer";

// --- Font Configuration ---
const openSans = Open_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-open-sans",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-montserrat",
});

// --- Metadata Configuration ---
const SITE_NAME = "RSU Deli";
const SITE_DESCRIPTION =
    "Rumah Sakit Umum Deli Medan. Melayani dengan hati, fasilitas lengkap, dan tenaga medis profesional.";

export const metadata: Metadata = {
    title: {
        default: `${SITE_NAME} | Melayani Dengan Hati`,
        template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    keywords: [
        "RSU Deli",
        "Rumah Sakit Medan",
        "Dokter Spesialis Medan",
        "Jadwal Dokter RSU Deli",
        "Rawat Inap Medan",
        "UGD 24 Jam Medan",
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    publisher: "RSU Deli",
    openGraph: {
        type: "website",
        locale: "id_ID",
        siteName: SITE_NAME,
        title: SITE_NAME,
        description: SITE_DESCRIPTION,
        // images: ["/images/og-image.jpg"], // Add an Open Graph image later
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="font-sans antialiased bg-white text-gray-900 flex flex-col min-h-screen">
            {/* Navigation */}
            <Header />

            {/* Main Content */}
            {/* flex-grow ensures footer stays at bottom even with little content */}
            <main className="grow">{children}</main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
