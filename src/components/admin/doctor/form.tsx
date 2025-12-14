// @/components/admin/doctor/doctor-form.tsx
"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { FormButton } from "@/components/form/form-button";
import { FormInput } from "@/components/form/form-input";
import { FormImageUpload } from "@/components/form/form-image-upload";
import { FormSelect } from "@/components/form/form-select";
import { FormSearchableSelect } from "@/components/form/form-searchable-select";
import { Field, FieldGroup } from "@/components/ui/field";
import { getChangedValues } from "@/lib/form-utils";
import { Doctor } from "@/types/doctor";
import { useDoctorMutations } from "@/hooks/admin/use-doctors";
import {
    useSearchSpecialists,
    useSpecialist,
} from "@/hooks/admin/use-specialists";
import { ScheduleManager, ScheduleItem } from "./schedule-manager";

// 1. Zod Schema - Schedule is now optional
const doctorSchema = z
    .object({
        name: z.string().min(1, "Name is required."),
        title: z.string().min(1, "Title is required."),
        type: z.enum(["specialist", "general"]),
        specialist_id: z.number().nullable().optional(),
        image: z
            .instanceof(File)
            .refine(
                (file) => file.size <= 5 * 1024 * 1024,
                "Image must be less than 5MB"
            )
            .nullable(),
        schedules: z
            .array(
                z.object({
                    day: z.string(),
                    start_time: z.string(),
                    end_time: z.string(),
                })
            )
            .optional()
            .default([]),
    })
    .refine(
        (data) => {
            if (data.type === "specialist" && !data.specialist_id) {
                return false;
            }
            return true;
        },
        {
            message: "Specialist is required when type is set to Specialist",
            path: ["specialist_id"],
        }
    );

const DOCTOR_TYPE_OPTIONS = [
    { label: "Umum", value: "general" },
    { label: "Spesialis", value: "specialist" },
];

interface DoctorFormProps {
    initialData?: Doctor;
    doctorId?: number;
}

export function DoctorForm({ initialData, doctorId }: DoctorFormProps) {
    const router = useRouter();
    const { createMutation, updateMutation } = useDoctorMutations();

    const isEdit = !!initialData && !!doctorId;
    const mutation = isEdit ? updateMutation : createMutation;
    const { isPending, error } = mutation;
    const fieldErrors = error?.error?.fields;

    const initialSchedules: ScheduleItem[] = useMemo(() => {
        if (!initialData?.schedules) return [];
        try {
            return typeof initialData.schedules === "string"
                ? JSON.parse(initialData.schedules)
                : initialData.schedules;
        } catch {
            return [];
        }
    }, [initialData]);

    const form = useForm({
        defaultValues: {
            name: initialData?.name || "",
            title: initialData?.title || "",
            type: initialData?.type || "general",
            specialist_id: initialData?.specialist_id || null,
            image_url: initialData?.image_url ?? "",
            image: null as File | null,
            schedules: initialSchedules,
        },
        validators: {
            onSubmit: doctorSchema as any,
        },
        onSubmit: async ({ value }) => {
            const valuesToProcess = { ...value };

            if (valuesToProcess.type === "general") {
                valuesToProcess.specialist_id = null;
            }

            const data = isEdit
                ? getChangedValues(valuesToProcess, initialData)
                : valuesToProcess;
            const formData = new FormData();

            // Only append schedule if it has items
            if (value.schedules && value.schedules.length > 0) {
                formData.append("schedules", JSON.stringify(value.schedules));
            }
            delete (data as any).schedules;

            Object.entries(data).forEach(([key, val]) => {
                if (key === "schedules") return;
                if (val !== null && val !== undefined) {
                    formData.append(key, val as any);
                }
            });

            const onSuccess = () => router.push("/admin/doctor");

            if (isEdit) {
                updateMutation.mutate(
                    { id: doctorId, data: formData },
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
            className="space-y-6 max-w-2xl"
        >
            <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <form.Field name="title">
                        {(field) => (
                            <FormInput
                                field={field}
                                label="Title"
                                placeholder="e.g. dr. "
                                required
                                error={fieldErrors?.title}
                                disabled={isPending}
                            />
                        )}
                    </form.Field>

                    <form.Field name="name">
                        {(field) => (
                            <FormInput
                                field={field}
                                label="Full Name"
                                placeholder="e.g. John Doe Sp.OG"
                                required
                                error={fieldErrors?.name}
                                disabled={isPending}
                            />
                        )}
                    </form.Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <form.Field name="type">
                        {(field) => (
                            <FormSelect
                                field={field}
                                label="Doctor Type"
                                options={DOCTOR_TYPE_OPTIONS}
                                required
                                error={fieldErrors?.type}
                                disabled={isPending}
                            />
                        )}
                    </form.Field>

                    <form.Subscribe selector={(state) => state.values.type}>
                        {(type) =>
                            type === "specialist" ? (
                                <form.Field name="specialist_id">
                                    {(field) => (
                                        <FormSearchableSelect
                                            field={field}
                                            label="Specialty"
                                            placeholder="Search for a specialty..."
                                            required
                                            error={fieldErrors?.specialist_id}
                                            disabled={isPending}
                                            useSearchHook={useSearchSpecialists}
                                            useSingleItemHook={useSpecialist}
                                        />
                                    )}
                                </form.Field>
                            ) : null
                        }
                    </form.Subscribe>
                </div>

                <form.Field
                    name="image"
                    validators={{
                        onChange: doctorSchema.shape.image,
                    }}
                >
                    {(field) => (
                        <FormImageUpload
                            className="max-w-[300px]"
                            field={field}
                            label="Doctor Photo"
                            initialImage={initialData?.image_url}
                            maxSize={5 * 1024 * 1024}
                            accept="image/jpeg,image/png,image/webp"
                            error={fieldErrors?.image}
                        />
                    )}
                </form.Field>

                <div className="border-t pt-4">
                    <form.Field name="schedules">
                        {(field) => (
                            <ScheduleManager
                                value={field.state.value}
                                onChange={field.handleChange}
                                error={field.state.meta.errors?.[0] as string}
                            />
                        )}
                    </form.Field>
                </div>

                <Field className="pt-4">
                    <FormButton
                        type="submit"
                        className="w-full"
                        isLoading={isPending}
                        loadingText="Saving..."
                    >
                        {isEdit ? "Update Doctor" : "Create Doctor"}
                    </FormButton>
                </Field>
            </FieldGroup>
        </form>
    );
}