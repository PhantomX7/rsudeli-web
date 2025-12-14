"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { FormButton } from "@/components/form/form-button";
import { FormInput } from "@/components/form/form-input";
import { Field, FieldGroup } from "@/components/ui/field";
import { getChangedValues } from "@/lib/form-utils";
import { Specialist } from "@/types/specialist";
import { useSpecialistMutations } from "@/hooks/admin/use-specialists";

const specialistSchema = z.object({
    name: z.string().min(1, "Specialist name is required."),
});

interface SpecialistFormProps {
    initialData?: Specialist;
    specialistId?: number;
}

export function SpecialistForm({ initialData, specialistId }: SpecialistFormProps) {
    const router = useRouter();
    const { createMutation, updateMutation } = useSpecialistMutations();

    const isEdit = !!initialData && !!specialistId;
    const mutation = isEdit ? updateMutation : createMutation;
    const { isPending, error } = mutation;
    const fieldErrors = error?.error?.fields;

    const form = useForm({
        defaultValues: {
            name: initialData?.name || "",
        },
        validators: {
            onSubmit: specialistSchema,
        },
        onSubmit: async ({ value }) => {
            const data = isEdit ? getChangedValues(value, initialData) : value;
            
            const formData = new FormData();
            Object.entries(data).forEach(([key, val]) => {
                if (val !== null && val !== undefined) {
                    formData.append(key, val as any);
                }
            });

            const onSuccess = () => router.push("/admin/specialist");

            if (isEdit) {
                updateMutation.mutate(
                    { id: specialistId, data: formData },
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
            className="space-y-6 max-w-lg"
        >
            <FieldGroup>
                <form.Field name="name">
                    {(field) => (
                        <FormInput
                            field={field}
                            label="Specialist Name"
                            placeholder="e.g. Specialis Anak"
                            required
                            error={fieldErrors?.name}
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
                        {isEdit ? "Update Specialist" : "Create Specialist"}
                    </FormButton>
                </Field>
            </FieldGroup>
        </form>
    );
}