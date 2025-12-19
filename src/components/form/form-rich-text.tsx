"use client";

import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap"; // Adjust path if npx installed it elsewhere
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import type { AnyFieldApi } from "@tanstack/react-form";
import { cn } from "@/lib/utils";
import type { Content } from "@tiptap/react";
import { uploadMediaAction } from "@/actions/admin/media";

interface FormRichTextProps {
    /** The TanStack Form field API object */
    field: AnyFieldApi;

    /** The label text displayed above the editor */
    label: string;

    /** Displays a red asterisk next to the label */
    required?: boolean;

    /** Disables the editor */
    disabled?: boolean;

    /** Custom CSS classes for the container */
    className?: string;

    /** Placeholder text */
    placeholder?: string;

    /** Manually override the error message */
    error?: string;
}

export function FormRichText({
    field,
    label,
    required,
    className,
    disabled,
    error,
    placeholder = "Write something amazing...",
}: FormRichTextProps) {
    const { state, handleChange } = field;

    // Handle Validation Errors
    const activeError = error
        ? [{ message: error }]
        : state.meta.isTouched && state.meta.errors.length
        ? state.meta.errors
        : undefined;

    return (
        <Field className={className}>
            <FieldLabel>
                {label}
                {required && <span className="text-destructive ml-1">*</span>}
            </FieldLabel>

            <div
                className={cn(
                    // Base styles to ensure it looks good within the form layout
                    "w-full rounded-md",
                    // Error state styling
                    activeError && "ring-2 ring-destructive ring-offset-2 rounded-lg"
                )}
            >
                <MinimalTiptapEditor
                    // 1. Bind Value
                    // Ensure value is never undefined to prevent uncontrolled/controlled warnings
                    value={(state.value as Content) || ""}
                    
                    // 2. Bind Change Handler
                    onChange={(content) => {
                        // Pass the HTML content back to TanStack Form
                        handleChange(content);
                    }}
                    
                    // 3. Configuration
                    output="html" // We want HTML string for the database
                    placeholder={placeholder}
                    editable={!disabled}
                    autofocus={false}
                    throttleDelay={1000} // Debounce updates to improve performance
                    
                    // 4. Styling
                    className={cn(
                        "w-full border-input shadow-sm focus-within:ring-2 focus-within:ring-ring",
                        disabled && "opacity-50 cursor-not-allowed pointer-events-none"
                    )}
                    editorContentClassName="p-4"
                    editorClassName="focus:outline-none min-h-[300px]"
                    uploader={async (file) => {
                        const formData = new FormData();
                        formData.append("image", file);

                        const response = await uploadMediaAction(formData);

                        if (response.success) {
                            return response?.data?.image_url || "";
                        } else {
                            throw new Error(response.error?.message || "Failed to upload media");
                        }
                    }}
                />
            </div>

            {activeError && (
                <FieldError className="pl-2" errors={activeError} />
            )}
        </Field>
    );
}