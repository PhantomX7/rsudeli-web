// app/admin/layout.tsx
import ReactQueryProvider from "@/components/providers/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
import "@/app/globals.css";
import "@/app/theme.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <ReactQueryProvider>
                    <Toaster position="top-center" />
                    {children}
                </ReactQueryProvider>
            </body>
        </html>
    );
}