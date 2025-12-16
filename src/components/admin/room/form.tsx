// app/admin/room/form.tsx
"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useRouter } from "next/navigation";

import { FormButton } from "@/components/form/form-button";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormNumberInput } from "@/components/form/form-number-input";
import { Field, FieldGroup } from "@/components/ui/field";
import { getChangedValues } from "@/lib/form-utils";
import { Room } from "@/types/room";
import { useRoomMutations } from "@/hooks/admin/use-rooms";
import { FormTextarea } from "@/components/form/form-textarea";

const ROOM_TYPE_OPTIONS = [
    { value: "adult", label: "Dewasa (Adult)" },
    { value: "child", label: "Anak (Child)" },
];

const roomSchema = z.object({
    name: z.string().min(1, "Room name is required."),
    display_order: z.coerce.number().int("Display order must be an integer."),
    type: z.enum(["adult", "child"]),
    note: z.string().optional(),
    price: z.coerce.number().gt(0, "Price must be greater than 0."),
});

interface RoomFormProps {
    initialData?: Room;
    roomId?: number;
}

export function RoomForm({ initialData, roomId }: RoomFormProps) {
    const router = useRouter();
    const { createMutation, updateMutation } = useRoomMutations();

    const isEdit = !!initialData && !!roomId;
    const mutation = isEdit ? updateMutation : createMutation;
    const { isPending, error } = mutation;
    const fieldErrors = error?.error?.fields;

    const form = useForm({
        defaultValues: {
            name: initialData?.name || "",
            display_order: initialData?.display_order || 0,
            type: initialData?.type || "adult",
            price: initialData?.price || 0,
            note: initialData?.note || "",
        },
        validators: {
            onSubmit: roomSchema as any,
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

            const onSuccess = () => router.push("/admin/room");

            if (isEdit) {
                updateMutation.mutate(
                    { id: roomId, data: formData },
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
                            label="Room Name"
                            placeholder="Enter room name"
                            required
                            error={fieldErrors?.name}
                            disabled={isPending}
                        />
                    )}
                </form.Field>

                <form.Field name="type">
                    {(field) => (
                        <FormSelect
                            field={field}
                            label="Room Type"
                            placeholder="Select room type"
                            options={ROOM_TYPE_OPTIONS}
                            required
                            error={fieldErrors?.type}
                            disabled={isPending}
                        />
                    )}
                </form.Field>

                <form.Field name="price">
                    {(field) => (
                        <FormNumberInput
                            field={field}
                            label="Price (Rp)"
                            placeholder="Enter price"
                            required
                            error={fieldErrors?.price}
                            disabled={isPending}
                            min={0}
                        />
                    )}
                </form.Field>

                <form.Field name="note">
                    {(field) => (
                        <FormTextarea
                            field={field}
                            label="Note"
                            placeholder="Enter Note"
                            error={fieldErrors?.note}
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

                <Field>
                    <FormButton
                        type="submit"
                        className="w-full"
                        isLoading={isPending}
                        loadingText="Saving..."
                    >
                        {isEdit ? "Update Room" : "Create Room"}
                    </FormButton>
                </Field>
            </FieldGroup>
        </form>
    );
}