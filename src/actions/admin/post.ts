// actions/admin/post.ts
"use server";

import { revalidateTag } from "next/cache";
import type { Post } from "@/types/post";
import type { ApiResponse, ActionResponse } from "@/types/common";
import type { PaginationParams } from "@/types/pagination";
import { adminApiClient } from "@/lib/api";
import { ADMIN_API_ENDPOINTS } from "@/lib/constants";
import { buildBackendUrl } from "@/lib/pagination/serverUtils";
import {
    handleApiError,
    extractApiData,
    handleApiSuccess,
} from "@/lib/helpers";

export async function getPaginatedPostsAction(
    params: PaginationParams
): Promise<ActionResponse<Post[]>> {
    try {
        const response = await adminApiClient().get<ApiResponse<Post[]>>(
            buildBackendUrl(ADMIN_API_ENDPOINTS.POST.GENERAL, params)
        );
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch paginated posts");
    }
}

export async function getPostAction(
    id: number
): Promise<ActionResponse<Post>> {
    try {
        const response = await adminApiClient().get<ApiResponse<Post>>(
            ADMIN_API_ENDPOINTS.POST.DETAIL(id)
        );
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch post");
    }
}

export async function createPostAction(
    postData: FormData
): Promise<ActionResponse<Post>> {
    try {
        const response = await adminApiClient().post<ApiResponse<Post>>(
            ADMIN_API_ENDPOINTS.POST.GENERAL,
            postData
        );
        revalidateTag("posts", "max");
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to create post");
    }
}

export async function updatePostAction(
    id: number,
    postData: FormData
): Promise<ActionResponse<Post>> {
    try {
        const response = await adminApiClient().patch<ApiResponse<Post>>(
            ADMIN_API_ENDPOINTS.POST.DETAIL(id),
            postData
        );
        revalidateTag("posts", "max");
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to update post");
    }
}

export async function deletePostAction(id: number): Promise<ActionResponse> {
    try {
        await adminApiClient().delete(ADMIN_API_ENDPOINTS.POST.DETAIL(id));
        revalidateTag("posts", "max");
        return handleApiSuccess();
    } catch (error) {
        return handleApiError(error, "Failed to delete post");
    }
}