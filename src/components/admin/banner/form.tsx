// @/components/admin/banner/banner-form.tsx
"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { FormButton } from "@/components/form/form-button";
import { FormInput } from "@/components/form/form-input";
import { FormImageUpload } from "@/components/form/form-image-upload";
import { FormCheckbox } from "@/components/form/form-checkbox";
import { FormSelect } from "@/components/form/form-select";
import { Field, FieldGroup } from "@/components/ui/field";
import { getChangedValues } from "@/lib/form-utils";
import { Banner } from "@/types/banner";
import { useBannerMutations } from "@/hooks/admin/use-banners";

const bannerSchema = z.object({
    name: z.string().min(1, "Banner name is required."),
    key: z.enum(["home", "facility"]),
    image: z
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
    mobile_image: z
        .instanceof(File)
        .refine(
            (file) => file.size <= 5 * 1024 * 1024,
            "Mobile image must be less than 5MB"
        )
        .refine(
            (file) =>
                ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            "Only JPG, PNG, and WebP formats are supported"
        )
        .nullable(),
    display_order: z.coerce.number().int().min(0),
    is_active: z.boolean(),
});

const BANNER_KEY_OPTIONS = [
    { label: "Home", value: "home" },
    { label: "Facility", value: "facility" },
];

interface BannerFormProps {
    initialData?: Banner;
    bannerId?: number;
}

export function BannerForm({ initialData, bannerId }: BannerFormProps) {
    const router = useRouter();
    const { createMutation, updateMutation } = useBannerMutations();

    const isEdit = !!initialData && !!bannerId;
    const mutation = isEdit ? updateMutation : createMutation;
    const { isPending, error } = mutation;
    const fieldErrors = error?.error?.fields;

    const form = useForm({
        defaultValues: {
            name: initialData?.name || "",
            key: initialData?.key || "home",
            image_url: initialData?.image_url ?? "",
            mobile_image_url: initialData?.mobile_image_url ?? "",
            image: null as File | null,
            mobile_image: null as File | null,
            display_order: initialData?.display_order || 0,
            is_active: initialData?.is_active ?? true,
        },
        validators: {
            onSubmit: bannerSchema as any,
        },
        onSubmit: async ({ value }) => {
            const data = isEdit ? getChangedValues(value, initialData) : value;
            const formData = new FormData();

            Object.entries(data).forEach(([key, val]) => {
                if (val !== null && val !== undefined) {
                    formData.append(key, val as any);
                }
            });

            const onSuccess = () => router.push("/admin/banner");

            if (isEdit) {
                updateMutation.mutate(
                    { id: bannerId, data: formData },
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
                <form.Field name="name">
                    {(field) => (
                        <FormInput
                            field={field}
                            label="Banner Name"
                            placeholder="Enter banner name"
                            required
                            error={fieldErrors?.name}
                            disabled={isPending}
                        />
                    )}
                </form.Field>

                <form.Field name="key">
                    {(field) => (
                        <FormSelect
                            field={field}
                            label="Banner Type"
                            placeholder="Select banner type"
                            options={BANNER_KEY_OPTIONS}
                            required
                            error={fieldErrors?.key}
                            disabled={isPending}
                        />
                    )}
                </form.Field>

                <form.Field
                    name="image"
                    validators={{
                        onChange: bannerSchema.shape.image,
                    }}
                >
                    {(field) => (
                        <FormImageUpload
                            className="max-w-[300px]"
                            field={field}
                            label="Banner Image"
                            required
                            initialImage={initialData?.image_url}
                            maxSize={5 * 1024 * 1024}
                            accept="image/jpeg,image/png,image/webp"
                            error={fieldErrors?.image}
                        />
                    )}
                </form.Field>

                <form.Field
                    name="mobile_image"
                    validators={{
                        onChange: bannerSchema.shape.mobile_image,
                    }}
                >
                    {(field) => (
                        <FormImageUpload
                            className="max-w-[300px]"
                            field={field}
                            label="Mobile Banner Image"
                            initialImage={initialData?.mobile_image_url}
                            maxSize={5 * 1024 * 1024}
                            accept="image/jpeg,image/png,image/webp"
                            error={fieldErrors?.mobile_image}
                        />
                    )}
                </form.Field>

                <form.Field name="display_order">
                    {(field) => (
                        <FormInput
                            field={field}
                            label="Display Order"
                            type="number"
                            placeholder="0"
                            required
                            disabled={isPending}
                            error={fieldErrors?.display_order}
                        />
                    )}
                </form.Field>

                <form.Field name="is_active">
                    {(field) => (
                        <FormCheckbox
                            field={field}
                            label="Active"
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
                        {isEdit ? "Update Banner" : "Create Banner"}
                    </FormButton>
                </Field>
            </FieldGroup>
        </form>
    );
}
