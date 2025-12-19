// app/(public)/post/page.tsx
import { getPublicPostsAction } from "@/actions/public/post";
import { HeroSection } from "@public/common/hero-section";
import { PostCard } from "@/components/public/post/post-card";
import { Pagination } from "@/components/public/common/pagination";
import { Filter } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ArticlePage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    // Fetch all public posts (sorted by newest first via the action)
    const result = await getPublicPostsAction(params, "akreditasi");
    const posts = result.success ? result.data ?? [] : [];
    const meta = result.success ? result.meta : undefined;

    return (
        <main className="min-h-screen bg-gray-50/50">
            {/* Hero */}
            <HeroSection
                title="Akreditasi"
                description="Informasi terkini seputar akreditasi rumah sakit di RSU Deli"
                badge="Akreditasi"
                backgroundImage="https://res.cloudinary.com/rsudeli/image/upload/v1687764242/ysm2sche9obmx8x7yezu.jpg"
            />

            <section className="container mx-auto px-4 -mt-10 relative z-20 pb-20">
                {/* Grid */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <PostCard key={post.id} post={post} type="akreditasi" />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-300 shadow-sm">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Filter className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800">
                            Belum ada artikel
                        </h3>
                        <p className="text-gray-500 max-w-sm mx-auto mt-2">
                            Kami sedang menyiapkan konten menarik untuk Anda.
                            Silakan kembali lagi nanti.
                        </p>
                    </div>
                )}
                {meta && meta.total > meta.limit && posts.length > 0 && (
                    <div className="mt-8">
                        <Pagination meta={meta} />
                    </div>
                )}
            </section>
        </main>
    );
}
