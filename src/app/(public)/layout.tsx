import type { Metadata } from "next";
import { getPublicConfigByKeyAction } from "@/actions/public/config"; // Import action
import Header from "@public/layout/header";
import { Footer } from "@public/layout/footer";
import { CONFIG_KEY } from "@/lib/constants";

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
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const [instagram, facebook] = await Promise.all([
        getPublicConfigByKeyAction(CONFIG_KEY.INSTAGRAM),
        getPublicConfigByKeyAction(CONFIG_KEY.FACEBOOK),
    ]);
    
    const socialUrls = {
        instagram: instagram?.data?.value || "",
        facebook: facebook?.data?.value || "",
    };
    console.log(instagram);

    return (
        <div className="font-sans antialiased bg-white text-gray-900 flex flex-col min-h-screen">
            {/* Navigation with Dynamic Links */}
            <Header socialUrls={socialUrls} />

            {/* Main Content */}
            <main className="grow">{children}</main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
