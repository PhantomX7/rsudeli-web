// components/public/contact/contact-form.tsx
"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";
import { toast } from "sonner";

import { FormInput } from "@/components/form/form-input";
import { FormTextarea } from "@/components/form/form-textarea";
import { FormButton } from "@/components/form/form-button";
import { FieldGroup } from "@/components/ui/field";

import { createContactAction } from "@/actions/public/contact";

const contactSchema = z.object({
    name: z.string().min(1, "Nama wajib diisi"),
    email: z.string().email("Format email tidak valid"),
    subject: z.string().min(1, "Subjek wajib diisi"),
    message: z.string().min(10, "Pesan minimal 10 karakter"),
});

export function ContactForm() {
    const mutation = useMutation({
        mutationFn: async (data: FormData) => {
            const result = await createContactAction(data);
            if (!result.success) throw result.error;
            return result;
        },
        onSuccess: () => {
            toast.success("Pesan berhasil dikirim! Kami akan menghubungi Anda segera.");
            form.reset();
        },
        onError: (error: any) => {
            toast.error(error.message || "Gagal mengirim pesan.");
        },
    });

    const { isPending, error } = mutation;
    const fieldErrors = (error as any)?.fields as Record<string, string> | undefined;

    const form = useForm({
        defaultValues: { name: "", email: "", subject: "", message: "" },
        validators: { onSubmit: contactSchema },
        onSubmit: async ({ value }) => {
            const formData = new FormData();
            Object.entries(value).forEach(([key, val]) => {
                if (val) formData.append(key, val);
            });
            mutation.mutate(formData);
        },
    });

    // Custom styles for inputs to make them readable in light mode
    const inputClassName = "border-gray-200 focus:bg-white transition-colors";

    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/60 border border-gray-100 relative z-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Kirim Pesan</h3>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed">
                Punya pertanyaan, keluhan, atau masukan? Isi formulir di bawah ini dan tim kami akan segera merespons.
            </p>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
                className="space-y-5"
            >
                <FieldGroup>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <form.Field name="name">
                            {(field) => (
                                <FormInput
                                    field={field}
                                    label="Nama Lengkap"
                                    placeholder="Masukkan nama Anda"
                                    required
                                    disabled={isPending}
                                    error={fieldErrors?.name}
                                    className={inputClassName}
                                />
                            )}
                        </form.Field>

                        <form.Field name="email">
                            {(field) => (
                                <FormInput
                                    field={field}
                                    label="Alamat Email"
                                    placeholder="nama@email.com"
                                    type="email"
                                    required
                                    disabled={isPending}
                                    error={fieldErrors?.email}
                                    className={inputClassName}
                                />
                            )}
                        </form.Field>
                    </div>

                    <form.Field name="subject">
                        {(field) => (
                            <FormInput
                                field={field}
                                label="Subjek"
                                placeholder="Judul pesan..."
                                required
                                disabled={isPending}
                                error={fieldErrors?.subject}
                                className={inputClassName}
                            />
                        )}
                    </form.Field>

                    <form.Field name="message">
                        {(field) => (
                            <FormTextarea
                                field={field}
                                label="Pesan"
                                placeholder="Tulis pesan Anda di sini..."
                                className={`min-h-[120px] resize-none ${inputClassName}`}
                                required
                                disabled={isPending}
                                error={fieldErrors?.message}
                            />
                        )}
                    </form.Field>

                    <FormButton
                        type="submit"
                        className="w-full bg-[#32c69a] hover:bg-[#28a580] text-white h-12 text-base font-bold rounded-xl mt-2 shadow-lg shadow-teal-500/20"
                        isLoading={isPending}
                        loadingText="Mengirim..."
                    >
                        Kirim Pesan
                    </FormButton>
                </FieldGroup>
            </form>
        </div>
    );
}