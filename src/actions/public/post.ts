// actions/public/post.ts
"use server";

import type { Post } from "@/types/post";
import type { ApiResponse, ActionResponse } from "@/types/common";
import { publicApiClient } from "@/lib/api";
import { PUBLIC_API_ENDPOINTS } from "@/lib/constants";
import type { PaginationParams } from "@/types/pagination";
import { buildBackendUrl } from "@/lib/pagination/serverUtils";
import { handleApiError, extractApiData } from "@/lib/helpers";

export async function getPublicPostsAction(
    params?: PaginationParams,
    ...types: string[]
): Promise<ActionResponse<Post[]>> {
    try {
        // Construct filter for 'type' (e.g., "in:artikel,berita")
        const typeParam = types.length > 0 ? `in:${types.join(",")}` : "";

        const paramsWithDefaults = {
            ...params,
            sort: params?.sort || "created_at desc", // Show newest posts first
            is_active: params?.is_active || "true",
            type: typeParam,
        };

        const response = await publicApiClient().get<ApiResponse<Post[]>>(
            buildBackendUrl(
                PUBLIC_API_ENDPOINTS.POST.GENERAL,
                paramsWithDefaults
            ),
            {
                next: { tags: ["posts"] },
            }
        );

        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch posts");
    }
}

// Optional: Action to get a single post by slug for the detail page
export async function getPublicPostBySlugAction(
    slug: string
): Promise<ActionResponse<Post>> {
    try {
        const response = await publicApiClient().get<ApiResponse<Post>>(
            PUBLIC_API_ENDPOINTS.POST.DETAIL(slug),
            { next: { tags: [`posts-${slug}`] } }
        );

        // Extract the first item
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch posts");
    }
}
