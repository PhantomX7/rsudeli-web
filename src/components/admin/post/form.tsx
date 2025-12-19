// app/admin/post/form.tsx
"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { FormButton } from "@/components/form/form-button";
import { FormInput } from "@/components/form/form-input";
import { FormImageUpload } from "@/components/form/form-image-upload";
import { FormCheckbox } from "@/components/form/form-checkbox";
import { FormSelect } from "@/components/form/form-select";
import { FormRichText } from "@/components/form/form-rich-text";
import { Field, FieldGroup } from "@/components/ui/field";
import { getChangedValues } from "@/lib/form-utils";
import { Post } from "@/types/post";
import { usePostMutations } from "@/hooks/admin/use-posts";

const postSchema = z.object({
    title: z.string().min(1, "Title is required."),
    slug: z.string().min(1, "Slug is required."),
    content: z.string().min(1, "Content is required."),
    type: z.enum(["umum", "akreditasi", "artikel"]),
    is_active: z.boolean().optional(),
    thumbnail: z
        .instanceof(File)
        .refine(
            (file) => file.size <= 5 * 1024 * 1024,
            "Image must be less than 5MB"
        )
        .refine(
            (file) =>
                ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            "Only JPG, PNG, and WebP formats are supported"
        )
        .nullable(),
});

interface PostFormProps {
    initialData?: Post;
    postId?: number;
}

export function PostForm({ initialData, postId }: PostFormProps) {
    const router = useRouter();
    const { createMutation, updateMutation } = usePostMutations();

    const isEdit = !!initialData && !!postId;
    const mutation = isEdit ? updateMutation : createMutation;
    const { isPending, error } = mutation;
    const fieldErrors = error?.error?.fields;

    const form = useForm({
        defaultValues: {
            title: initialData?.title || "",
            slug: initialData?.slug || "",
            content: initialData?.content || "",
            type: initialData?.type || "umum",
            is_active: true,
            thumbnail_url: initialData?.thumbnail_url ?? "",
            thumbnail: null as File | null,
        },
        validators: {
            onSubmit: postSchema as any,
        },
        onSubmit: async ({ value }) => {
            const data = isEdit ? getChangedValues(value, initialData) : value;

            const formData = new FormData();

            Object.entries(data).forEach(([key, val]) => {
                if (val !== null && val !== undefined) {
                    formData.append(key, val as any);
                }
            });

            const onSuccess = () => router.push("/admin/post");

            if (isEdit) {
                updateMutation.mutate(
                    { id: postId, data: formData },
                    { onSuccess }
                );
            } else {
                createMutation.mutate(formData, { onSuccess });
            }
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="space-y-6"
        >
            <FieldGroup>
                <div className="grid gap-6 md:grid-cols-2">
                    {/* TITLE FIELD WITH LISTENERS */}
                    <form.Field
                        name="title"
                        listeners={{
                            onChange: ({ value }) => {
                                // Logic: Auto-generate slug if not in Edit mode OR if slug is currently empty
                                // const currentSlug = form.getFieldValue("slug");

                                const slug = value
                                    .toLowerCase()
                                    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric with dashes
                                    .replace(/(^-|-$)+/g, ""); // Remove leading/trailing dashes

                                form.setFieldValue("slug", slug);
                            },
                        }}
                    >
                        {(field) => (
                            <FormInput
                                field={field}
                                label={"Title"+JSON.stringify(fieldErrors)}
                                placeholder="Enter post title"
                                required
                                error={fieldErrors?.title}
                                disabled={isPending}
                                // Notice: No manual onChange prop needed here anymore
                            />
                        )}
                    </form.Field>

                    <form.Field name="slug">
                        {(field) => (
                            <FormInput
                                field={field}
                                label="Slug"
                                placeholder="enter-post-slug"
                                required
                                error={fieldErrors?.slug}
                                disabled={true}
                            />
                        )}
                    </form.Field>
                </div>

                <form.Field name="type">
                    {(field) => (
                        <FormSelect
                            field={field}
                            label="Type"
                            placeholder="Select post type"
                            options={[
                                { label: "Kegiatan", value: "umum" },
                                { label: "Akreditasi", value: "akreditasi" },
                                { label: "Artikel", value: "artikel" },
                            ]}
                            required
                            error={fieldErrors?.type}
                            disabled={isPending}
                        />
                    )}
                </form.Field>

                <form.Field name="content">
                    {(field) => (
                        <FormRichText
                            field={field}
                            label="Content"
                            placeholder="Write your content here (HTML supported)..."
                            required
                            className="min-h-[300px] font-mono text-sm"
                            error={fieldErrors?.content}
                            disabled={isPending}
                        />
                    )}
                </form.Field>

                <form.Field
                    name="thumbnail"
                    validators={{
                        onChange: postSchema.shape.thumbnail,
                    }}
                >
                    {(field) => (
                        <FormImageUpload
                            className="max-w-[400px]"
                            required={!isEdit}
                            field={field}
                            label="Thumbnail"
                            initialImage={initialData?.thumbnail_url}
                            maxSize={5 * 1024 * 1024}
                            accept="image/jpeg,image/png,image/webp"
                            error={fieldErrors?.thumbnail}
                        />
                    )}
                </form.Field>

                <form.Field name="is_active">
                    {(field) => (
                        <FormCheckbox
                            field={field}
                            label="Active"
                            description="Post is visible to the public"
                            disabled={isPending}
                        />
                    )}
                </form.Field>

                <Field>
                    <FormButton
                        type="submit"
                        className="w-full"
                        isLoading={isPending}
                        loadingText="Saving..."
                    >
                        {isEdit ? "Update Post" : "Create Post"}
                    </FormButton>
                </Field>
            </FieldGroup>
        </form>
    );
}
