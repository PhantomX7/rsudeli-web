// app/admin/post/[id]/page.tsx
"use client";

import { use } from "react";
import { usePost } from "@/hooks/admin/use-posts";
import { PostForm } from "@admin/post/form";
import { PageLayout } from "@admin/page-layout";
import { QueryStateHandler } from "@admin/query-state-handler";

export default function PostEditPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const postId = parseInt(id);
    const { data, isLoading, error, refetch } = usePost(postId);

    return (
        <PageLayout
            title="Edit Post"
            backLink="/admin/post"
            backLabel="Back to Posts"
        >
            <QueryStateHandler
                isLoading={isLoading}
                error={error}
                data={data}
                onRetry={refetch}
                backLink="/admin/post"
                loadingText="Loading post..."
            >
                <PostForm initialData={data} postId={postId} />
            </QueryStateHandler>
        </PageLayout>
    );
}