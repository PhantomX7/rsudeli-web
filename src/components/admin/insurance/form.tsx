// app/admin/insurance/form.tsx
"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { FormButton } from "@/components/form/form-button";
import { FormInput } from "@/components/form/form-input";
import { Field, FieldGroup } from "@/components/ui/field";
import { getChangedValues } from "@/lib/form-utils";
import type { Insurance } from "@/types/insurance";
import { useInsuranceMutations } from "@/hooks/admin/use-insurances";

const insuranceSchema = z.object({
    name: z.string().min(1, "Insurance name is required."),
});

interface InsuranceFormProps {
    initialData?: Insurance;
    insuranceId?: number;
}

export function InsuranceForm({ initialData, insuranceId }: InsuranceFormProps) {
    const router = useRouter();
    const { createMutation, updateMutation } = useInsuranceMutations();

    const isEdit = !!initialData && !!insuranceId;
    const mutation = isEdit ? updateMutation : createMutation;
    const { isPending, error } = mutation;
    const fieldErrors = error?.error?.fields;

    const form = useForm({
        defaultValues: {
            name: initialData?.name || "",
        },
        validators: {
            onSubmit: insuranceSchema as any,
        },
        onSubmit: async ({ value }) => {
            const data = isEdit
                ? getChangedValues(value, initialData)
                : value;

            // Check if there are any changes for edit mode
            if (isEdit && Object.keys(data).length === 0) {
                router.push("/admin/insurance");
                return;
            }

            const formData = new FormData();

            Object.entries(data).forEach(([key, val]) => {
                if (val !== null && val !== undefined) {
                    formData.append(key, val as string);
                }
            });

            const onSuccess = () => router.push("/admin/insurance");

            if (isEdit) {
                updateMutation.mutate(
                    { id: insuranceId, data: formData },
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
                            label="Insurance Name"
                            placeholder="Enter insurance company name"
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
                        {isEdit ? "Update Insurance" : "Create Insurance"}
                    </FormButton>
                </Field>
            </FieldGroup>
        </form>
    );
}