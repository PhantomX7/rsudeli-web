// app/admin/post/create/page.tsx
import { PostForm } from "@admin/post/form";
import { PageLayout } from "@admin/page-layout";

export default function CreatePostPage() {
    return (
        <PageLayout 
            title="Create Post" 
            backLink="/admin/post"
            backLabel="Back to Posts"
        >
            <PostForm />
        </PageLayout>
    );
}