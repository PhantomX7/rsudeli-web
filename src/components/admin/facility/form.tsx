// app/admin/facility/form.tsx
"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { FormButton } from "@/components/form/form-button";
import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormImageUpload } from "@/components/form/form-image-upload";
import { FormCheckbox } from "@/components/form/form-checkbox";
import { FormNumberInput } from "@/components/form/form-number-input";
import { Field, FieldGroup } from "@/components/ui/field";
import { getChangedValues } from "@/lib/form-utils";
import { Facility } from "@/types/facility";
import { useFacilityMutations } from "@/hooks/admin/use-facilities";

const facilitySchema = z.object({
    name: z.string().min(1, "Facility name is required."),
    display_order: z.coerce.number().int("Display order must be an integer."),
    description: z.string().optional(),
    is_active: z.boolean(),
    icon: z
        .instanceof(File)
        .refine(
            (file) => file.size <= 5 * 1024 * 1024,
            "Image must be less than 5MB"
        )
        .refine(
            (file) =>
                ["image/jpeg", "image/png", "image/webp", "image/svg+xml"].includes(file.type),
            "Only JPG, PNG, WebP, and SVG formats are supported"
        )
        .nullable(),
});

interface FacilityFormProps {
    initialData?: Facility;
    facilityId?: number;
}

export function FacilityForm({ initialData, facilityId }: FacilityFormProps) {
    const router = useRouter();
    const { createMutation, updateMutation } = useFacilityMutations();

    const isEdit = !!initialData && !!facilityId;
    const mutation = isEdit ? updateMutation : createMutation;
    const { isPending, error } = mutation;
    const fieldErrors = error?.error?.fields;

    const form = useForm({
        defaultValues: {
            name: initialData?.name || "",
            display_order: initialData?.display_order || 0,
            description: initialData?.description || "",
            is_active: initialData?.is_active ?? true,
            icon_url: initialData?.icon_url ?? "",
            icon: null as File | null,
        },
        validators: {
            onSubmit: facilitySchema as any,
        },
        onSubmit: async ({ value }) => {
            const data = isEdit
                ? getChangedValues(value, initialData)
                : value;
            
            const formData = new FormData();

            Object.entries(data).forEach(([key, val]) => {
                if (val !== null && val !== undefined) {
                    formData.append(key, val as any);
                }
            });

            const onSuccess = () => router.push("/admin/facility");

            if (isEdit) {
                updateMutation.mutate(
                    { id: facilityId, data: formData },
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
                            label="Facility Name"
                            placeholder="Enter facility name"
                            required
                            error={fieldErrors?.name}
                            disabled={isPending}
                        />
                    )}
                </form.Field>

                <form.Field name="display_order">
                    {(field) => (
                        <FormNumberInput
                            field={field}
                            label="Display Order"
                            placeholder="Enter display order"
                            required
                            error={fieldErrors?.display_order}
                            disabled={isPending}
                            min={0}
                        />
                    )}
                </form.Field>

                <form.Field name="description">
                    {(field) => (
                        <FormTextarea
                            field={field}
                            label="Description"
                            placeholder="Enter facility description"
                            error={fieldErrors?.description}
                            disabled={isPending}
                            rows={4}
                        />
                    )}
                </form.Field>

                <form.Field
                    name="icon"
                    validators={{
                        onChange: facilitySchema.shape.icon,
                    }}
                >
                    {(field) => (
                        <FormImageUpload
                            className="max-w-[200px]"
                            required={!isEdit}
                            field={field}
                            label="Icon"
                            initialImage={initialData?.icon_url}
                            maxSize={5 * 1024 * 1024}
                            accept="image/jpeg,image/png,image/webp,image/svg+xml"
                            error={fieldErrors?.icon}
                        />
                    )}
                </form.Field>

                <form.Field name="is_active">
                    {(field) => (
                        <FormCheckbox
                            field={field}
                            label="Active"
                            description="Facility is visible on the website"
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
                        {isEdit ? "Update Facility" : "Create Facility"}
                    </FormButton>
                </Field>
            </FieldGroup>
        </form>
    );
}