// app/admin/post/page.tsx
import { PostList } from "@admin/post/list";
import { PageLayout } from "@admin/page-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function PostListPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;

    return (
        <PageLayout
            title="Posts"
            description="Manage your blog posts, articles, and accreditation updates"
            actions={
                <Button asChild>
                    <Link href="/admin/post/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Post
                    </Link>
                </Button>
            }
        >
            <PostList params={params} />
        </PageLayout>
    );
}