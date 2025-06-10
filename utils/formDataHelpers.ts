/**
 * Utility functions for handling form data in API requests
 *
 * These utilities help convert JavaScript objects to FormData for API submissions,
 * with special handling for nested objects, arrays, and file uploads.
 */
/**
 * Appends an array of images to FormData
 * @param formData - The FormData instance
 * @param images - Array of image URIs
 * @param fieldName - Name of the field in FormData (default: "images")
 */
export const appendImagesToFormData = (
  formData: FormData,
  images: string[],
  fieldName: string = "images"
): void => {
  if (!images || images.length === 0) return;

  images.forEach((imageUri: string, index: number) => {
    const filename = imageUri.split("/").pop() || `image_${index}.jpg`;
    const extension = filename.split(".").pop()?.toLowerCase();

    // Determine the correct MIME type based on file extension
    let mimeType = "image/jpeg"; // default
    if (extension === "png") {
      mimeType = "image/png";
    } else if (extension === "gif") {
      mimeType = "image/gif";
    } else if (extension === "webp") {
      mimeType = "image/webp";
    }

    // @ts-ignore - FormData expects File but React Native uses objects
    formData.append(`${fieldName}[${index}]`, {
      uri: imageUri,
      name: filename,
      type: mimeType,
    });
  });
};

/**
 * Creates a FormData object from any key-value pairs
 *
 * This utility handles:
 * - Simple key-value pairs (strings, numbers, booleans)
 * - Arrays of primitive values
 * - Arrays of objects (with nested properties)
 * - Special handling for image fields (both in arrays and in nested objects)
 *
 * @param data - Object containing form data
 * @returns FormData object
 *
 * @example
 * // Basic usage
 * const data = { name: 'John', age: 30 };
 * const formData = createFormData(data);
 *
 * @example
 * // With nested arrays and images
 * const data = {
 *   name: 'Service',
 *   images: ['file:///path/to/image1.jpg', 'file:///path/to/image2.jpg'],
 *   packages: [
 *     { title: 'Basic', price: 100, image: 'file:///path/to/package1.jpg' },
 *     { title: 'Premium', price: 200, image: 'file:///path/to/package2.jpg' }
 *   ]
 * };
 * const formData = createFormData(data);
 */
export const createFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined) return;
    if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] === "object") {
        value.forEach((item, index) => {
          Object.entries(item).forEach(([itemKey, itemValue]) => {
            if (
              itemKey === "image" &&
              typeof itemValue === "string" &&
              itemValue.length > 0
            ) {
              const filename =
                itemValue.split("/").pop() || `${key}_image_${index}.jpg`;
              // @ts-ignore - FormData expects File but React Native uses objects
              formData.append(`${key}[${index}][${itemKey}]`, {
                uri: itemValue,
                name: filename,
                type: "image/jpeg",
              });
            } else if (itemValue !== null && itemValue !== undefined) {
              formData.append(
                `${key}[${index}][${itemKey}]`,
                typeof itemValue === "object"
                  ? JSON.stringify(itemValue)
                  : String(itemValue)
              );
            }
          });
        });
      } else if (key === "images" || key === "photos") {
        value.forEach((imageUri: string, index: number) => {
          const filename = imageUri.split("/").pop() || `image_${index}.jpg`;
          // @ts-ignore - FormData expects File but React Native uses objects
          formData.append(`${key}[${index}]`, {
            uri: imageUri,
            name: filename,
            type: "image/jpeg",
          });
        });
      } else {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, String(item));
        });
      }
    } else {
      formData.append(
        key,
        typeof value === "object" ? JSON.stringify(value) : String(value)
      );
    }
  });

  return formData;
};

/**
 * Appends array data to FormData
 * @param formData - The FormData instance
 * @param fieldName - Name of the field in FormData
 * @param data - Array of values
 */
export const appendArrayToFormData = (
  formData: FormData,
  fieldName: string,
  data: any[]
): void => {
  if (!data || data.length === 0) return;

  data.forEach((value, index) => {
    formData.append(`${fieldName}[${index}]`, String(value));
  });
};

/**
 * Creates a service FormData object (specific to service submissions)
 * This is a convenience wrapper around createFormData for backward compatibility
 *
 * @param serviceData - Service data to be submitted
 * @returns FormData object
 */
// export const createServiceFormData = (serviceData: ListAServiceFormData): FormData => {
//   return createFormData(serviceData);
// };

/**
 * Appends a single image to FormData without array indexing
 * @param formData - The FormData instance
 * @param imageUri - URI of the image
 * @param fieldName - Name of the field in FormData
 */
export const appendSingleImageToFormData = (
  formData: FormData,
  imageUri: string,
  fieldName: string
): void => {
  if (!imageUri) return;

  const filename = imageUri.split("/").pop() || `image.jpg`;
  // @ts-ignore - FormData expects File but React Native uses objects
  formData.append(fieldName, {
    uri: imageUri,
    name: filename,
    type: "image/jpeg",
  });
};
