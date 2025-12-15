// app/admin/facility/form.tsx
"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FormButton } from "@/components/form/form-button";
import { FormInput } from "@/components/form/form-input";
import { FormImageUpload } from "@/components/form/form-image-upload";
import { FormCheckbox } from "@/components/form/form-checkbox";
import { FormNumberInput } from "@/components/form/form-number-input";
import { BulletPointManager } from "./bullet-point-manager";
import { Field, FieldGroup } from "@/components/ui/field";
import { getChangedValues } from "@/lib/form-utils";
import { Facility } from "@/types/facility";
import { useFacilityMutations } from "@/hooks/admin/use-facilities";

const facilitySchema = z.object({
    name: z.string().min(1, "Facility name is required."),
    display_order: z.coerce.number().int("Display order must be an integer."),
    is_active: z.boolean(),
    icon: z
        .instanceof(File)
        .refine(
            (file) => file.size <= 5 * 1024 * 1024,
            "Image must be less than 5MB"
        )
        .refine(
            (file) =>
                [
                    "image/jpeg",
                    "image/png",
                    "image/webp",
                    "image/svg+xml",
                ].includes(file.type),
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

    // Parse initial description points from JSON or string
    const parseInitialPoints = (description?: string): string[] => {
        if (!description) return [];

        try {
            const parsed = JSON.parse(description);
            if (Array.isArray(parsed)) {
                return parsed;
            }
        } catch {
            // If not valid JSON, treat as single point or split by newlines
            if (description.includes("\n")) {
                return description
                    .split("\n")
                    .filter((line) => line.trim() !== "");
            }
            return description.trim() ? [description] : [];
        }

        return [];
    };

    // Track description points separately
    const [descriptionPoints, setDescriptionPoints] = useState<string[]>(
        parseInitialPoints(initialData?.description)
    );

    const form = useForm({
        defaultValues: {
            name: initialData?.name || "",
            display_order: initialData?.display_order || 0,
            is_active: initialData?.is_active ?? true,
            icon_url: initialData?.icon_url ?? "",
            icon: null as File | null,
        },
        validators: {
            onSubmit: facilitySchema as any,
        },
        onSubmit: async ({ value }) => {
            // Filter out empty points and convert to JSON
            const filteredPoints = descriptionPoints.filter(
                (point) => point.trim() !== ""
            );

            const dataToSubmit = {
                ...value,
                description: JSON.stringify(filteredPoints),
            };

            const data = isEdit
                ? getChangedValues(dataToSubmit, {
                      ...initialData,
                      description: JSON.stringify(
                          parseInitialPoints(initialData?.description)
                      ),
                  })
                : dataToSubmit;

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

                {/* Bullet Point Manager for Description */}
                <BulletPointManager
                    value={descriptionPoints}
                    onChange={setDescriptionPoints}
                    label="Description Points"
                    placeholder="Enter a feature or service point"
                    error={fieldErrors?.description}
                    disabled={isPending}
                />

                <form.Field
                    name="icon"
                    validators={{
                        onChange: facilitySchema.shape.icon,
                    }}
                >
                    {(field) => (
                        <FormImageUpload
                            className="max-w-[300px]"
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
