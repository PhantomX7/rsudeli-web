import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { Calendar, User, ArrowLeft } from "lucide-react";
import {
    getPublicPostBySlugAction,
    getPublicPostsAction,
} from "@/actions/public/post";
import { Badge } from "@/components/ui/badge";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function PostDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    // 1. Fetch Post Detail
    const postResult = await getPublicPostBySlugAction(slug);

    if (!postResult.success || !postResult.data) {
        notFound();
    }

    const post = postResult.data;

    // 2. Fetch Recent Posts (Sidebar) - Fetch 5 newest
    const recentResult = await getPublicPostsAction({
        page: "1",
        limit: "5",
    }, "umum");
    const recentPosts = recentResult.success
        ? (recentResult.data ?? []).filter((p) => p.id !== post.id).slice(0, 4)
        : [];

    return (
        <main className="min-h-screen bg-white">
            {/* Article Header (Custom Hero) */}
            <div className="relative w-full h-[400px] md:h-[500px] bg-gray-900">
                <Image
                    src={
                        post.thumbnail_url ||
                        "https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80"
                    }
                    alt={post.title}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                    <div className="container mx-auto max-w-5xl">
                        <Link
                            href="/umum"
                            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Kembali ke Kegiatan
                        </Link>

                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <Badge className="bg-[#32c69a] hover:bg-[#28a580] text-white border-none">
                                {post.type}
                            </Badge>
                            <span className="text-white/60 text-sm">•</span>
                            <div className="flex items-center text-white/90 text-sm">
                                <Calendar className="w-4 h-4 mr-2" />
                                {format(
                                    new Date(post.created_at),
                                    "EEEE, d MMMM yyyy",
                                    { locale: idLocale }
                                )}
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-4xl drop-shadow-sm">
                            {post.title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content Layout */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                    {/* Main Content */}
                    <article className="w-full lg:w-2/3">
                        {/* Author Info */}
                        <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                                    <User className="w-5 h-5 text-gray-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">
                                        Admin RSU Deli
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Tim Publikasi
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Rich Text Content */}
                        <div
                            className="prose prose-lg prose-teal max-w-none 
                                prose-headings:font-bold prose-headings:text-gray-800
                                prose-p:text-gray-600 prose-p:leading-relaxed
                                prose-a:text-[#32c69a] prose-a:no-underline hover:prose-a:underline
                                prose-img:rounded-xl prose-img:shadow-lg
                                prose-blockquote:border-l-[#32c69a] prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </article>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-1/3 space-y-8">
                        {/* Recent Posts Widget */}
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 sticky top-24">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-[#32c69a] rounded-full" />
                                Artikel Terbaru
                            </h3>

                            <div className="space-y-4">
                                {recentPosts.map((recent) => (
                                    <Link
                                        key={recent.id}
                                        href={`/post/${recent.slug}`}
                                        className="group flex gap-3 items-start"
                                    >
                                        <div className="relative w-20 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                            {recent.thumbnail_url && (
                                                <Image
                                                    src={recent.thumbnail_url}
                                                    alt={recent.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-700 group-hover:text-[#32c69a] transition-colors line-clamp-2">
                                                {recent.title}
                                            </h4>
                                            <span className="text-xs text-gray-400 mt-1 block">
                                                {format(
                                                    new Date(recent.created_at),
                                                    "d MMM yyyy",
                                                    { locale: idLocale }
                                                )}
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
