// actions/admin/room.ts
"use server";

import { revalidateTag } from "next/cache";
import type { Room } from "@/types/room";
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

export async function getPaginatedRoomsAction(
    params: PaginationParams
): Promise<ActionResponse<Room[]>> {
    try {
        const response = await adminApiClient().get<ApiResponse<Room[]>>(
            buildBackendUrl(ADMIN_API_ENDPOINTS.ROOM.GENERAL, params)
        );
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch paginated rooms");
    }
}

export async function getRoomAction(
    id: number
): Promise<ActionResponse<Room>> {
    try {
        const response = await adminApiClient().get<ApiResponse<Room>>(
            ADMIN_API_ENDPOINTS.ROOM.DETAIL(id)
        );
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to fetch room");
    }
}

export async function createRoomAction(
    roomData: FormData
): Promise<ActionResponse<Room>> {
    try {
        const response = await adminApiClient().post<ApiResponse<Room>>(
            ADMIN_API_ENDPOINTS.ROOM.GENERAL,
            roomData
        );
        revalidateTag("rooms", "max");
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to create room");
    }
}

export async function updateRoomAction(
    id: number,
    roomData: FormData
): Promise<ActionResponse<Room>> {
    try {
        const response = await adminApiClient().patch<ApiResponse<Room>>(
            ADMIN_API_ENDPOINTS.ROOM.DETAIL(id),
            roomData
        );
        revalidateTag("rooms", "max");
        return extractApiData(response);
    } catch (error) {
        return handleApiError(error, "Failed to update room");
    }
}

export async function deleteRoomAction(id: number): Promise<ActionResponse> {
    try {
        await adminApiClient().delete(ADMIN_API_ENDPOINTS.ROOM.DETAIL(id));
        revalidateTag("rooms", "max");
        return handleApiSuccess();
    } catch (error) {
        return handleApiError(error, "Failed to delete room");
    }
}