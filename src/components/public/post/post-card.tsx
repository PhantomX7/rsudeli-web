import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale"; // npm install date-fns
import type { Post } from "@/types/post";

export function PostCard({ post, type }: { post: Post; type: "akreditasi" | "artikel" | "umum" }) {
    // Helper for excerpt (strip HTML tags first if needed, or just slice)
    const excerpt = post.content.replace(/<[^>]+>/g, "").slice(0, 120) + "...";

    return (
        <article className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-[#32c69a]/10 hover:-translate-y-1 transition-all duration-300">
            {/* Image Container */}
            <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                {post.thumbnail_url ? (
                    <Image
                        src={post.thumbnail_url}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full bg-gray-50 text-gray-400">
                        <span className="text-sm font-medium">No Image</span>
                    </div>
                )}

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-teal-800 hover:bg-white backdrop-blur-md shadow-sm border-none uppercase tracking-wider text-[10px] font-bold px-3 py-1">
                        {post.type}
                    </Badge>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#32c69a]" />
                        <time>
                            {format(new Date(post.created_at), "d MMMM yyyy", {
                                locale: idLocale,
                            })}
                        </time>
                    </div>
                </div>

                <Link
                    href={`/post/${post.slug}`}
                    className="block group-hover:text-[#32c69a] transition-colors"
                >
                    <h3 className="text-xl font-bold text-gray-800 mb-3 leading-snug line-clamp-2">
                        {post.title}
                    </h3>
                </Link>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {excerpt}
                </p>

                {/* Footer / Link */}
                <div className="mt-auto pt-4 border-t border-gray-50">
                    <Link
                        href={`/${type}/${post.slug}`}
                        className="inline-flex items-center text-sm font-bold text-[#32c69a] hover:text-[#28a580] transition-colors"
                    >
                        Baca Selengkapnya
                        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
