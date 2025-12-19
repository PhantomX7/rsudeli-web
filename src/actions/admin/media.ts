// actions/admin/media.ts
"use server";

import { adminApiClient } from "@/lib/api";
import { ADMIN_API_ENDPOINTS } from "@/lib/constants";
import { ActionResponse, ApiResponse } from "@/types/common";
import {
    handleApiError,
    extractApiData,
} from "@/lib/helpers";



export async function uploadMediaAction(
    formData: FormData
): Promise<ActionResponse<{ image_url: string }>> {
    try {
        const response = await adminApiClient().post<
            ApiResponse<{ image_url: string }>
        >(ADMIN_API_ENDPOINTS.MEDIA.UPLOAD, formData);

       return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to upload media");
    }
}
