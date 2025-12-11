// lib/helpers.ts
import type {
    ActionResponse,
    ApiResponse,
    PaginationMeta,
} from "@/types/common";

/**
 * Creates a standardized error response for failed actions
 * @param error - The error object from the API or operation
 * @param fallbackMessage - Default error message if none provided
 * @returns ActionResponse with success: false
 */
export const handleApiError = (
    error: unknown,
    fallbackMessage: string
): ActionResponse<any> => {
    return {
        success: false,
        error: error || { message: fallbackMessage },
    };
};

/**
 * Creates a standardized success response for actions
 * @param data - Optional data to include in response
 * @param meta - Optional pagination metadata
 * @returns ActionResponse with success: true
 */
export const handleApiSuccess = <T>(
    data?: T,
    meta?: PaginationMeta
): ActionResponse<T> => {
    const response: ActionResponse<T> = {
        success: true,
    };

    if (data !== undefined) {
        response.data = data;
    }

    if (meta) {
        response.meta = meta;
    }

    return response;
};

/**
 * Extracts data and metadata from API response into ActionResponse format
 * @param response - The raw API response object
 * @returns ActionResponse with extracted data and optional metadata
 */
export const extractApiData = <T>(
    response: ApiResponse<T>
): ActionResponse<T> => {
    const actionResponse: ActionResponse<T> = {
        success: true,
        data: response.data,
    };

    if (response.meta) {
        actionResponse.meta = response.meta;
    }

    return actionResponse;
};

/**
 * Handles action result and throws error if action failed
 * Used in React Query hooks to convert ActionResponse to throwable errors
 * @param action - Promise that returns an ActionResponse
 * @returns The result if successful, throws Error if failed
 */
export const handleActionResult = async <T>(
    action: Promise<ActionResponse<T>>
): Promise<ActionResponse<T>> => {
    const result = await action;
    if (!result.success) {
        throw result.error;
    }
    return result;
};