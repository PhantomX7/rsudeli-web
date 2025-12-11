import { uploadMediaAction } from "@/actions/admin/media";

/**
 * Recursively traverses the editor content and uploads any blob images.
 * Replaces blob URLs with the permanent URLs returned from the server.
 */
export async function uploadEditorImages(content: any[]): Promise<any[]> {
    if (!Array.isArray(content)) {
        return content;
    }

    const processedContent = await Promise.all(
        content.map(async (node) => {
            // Handle image nodes with blob URLs
            if (
                node.type === "img" &&
                node.url &&
                node.url.startsWith("blob:")
            ) {
                try {
                    // Fetch the blob data
                    const response = await fetch(node.url);
                    const blob = await response.blob();

                    // Create a File object from the blob
                    // We try to guess the extension from the type, defaulting to jpg
                    const extension = blob.type.split("/")[1] || "jpg";
                    const filename = `editor-image-${Date.now()}.${extension}`;
                    const file = new File([blob], filename, {
                        type: blob.type,
                    });

                    // Create FormData and upload
                    const formData = new FormData();
                    formData.append("file", file);

                    const uploadResult = await uploadMediaAction(formData);

                    if (uploadResult.success && uploadResult.data?.url) {
                        return {
                            ...node,
                            url: uploadResult.data.url,
                        };
                    } else {
                        console.error(
                            "Failed to upload editor image:",
                            uploadResult.error
                        );
                        // Return original node if upload fails
                        return node;
                    }
                } catch (error) {
                    console.error("Error processing editor image:", error);
                    return node;
                }
            }

            // Recursively process children
            if (node.children && Array.isArray(node.children)) {
                return {
                    ...node,
                    children: await uploadEditorImages(node.children),
                };
            }

            return node;
        })
    );

    return processedContent;
}
