// actions/public/config.ts
"use server";

import { publicApiClient } from "@/lib/api";
import { PUBLIC_API_ENDPOINTS } from "@/lib/constants";
import { handleApiError, extractApiData } from "@/lib/helpers";
import type { ApiResponse, ActionResponse } from "@/types/common";
import { revalidateTag } from "next/cache";

export async function createContactAction(
    contactData: FormData
): Promise<ActionResponse<string>> {
    try {
        const response = await publicApiClient().post<ApiResponse<string>>(
            PUBLIC_API_ENDPOINTS.CONTACT.GENERAL,
            contactData
        );
        revalidateTag("contacts", "max");
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to create contact");
    }
}