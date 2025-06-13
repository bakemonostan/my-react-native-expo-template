import * as SecureStore from 'expo-secure-store';
import { TOKEN_KEY } from "./api.constants";
import { ApiError } from "./api.types";

/**
 * Type guard to check if an error is an ApiError
 * @param {unknown} error - The error to check
 * @returns {boolean} True if the error is an ApiError
 * @example
 * const error = { message: 'Not found', status: 404 };
 * isApiError(error); // true
 * isApiError(new Error('Generic error')); // false
 */
 const isApiError = (error: unknown): error is ApiError => {
    if (error === null || error === undefined) return false;
    return typeof error === 'object' && 'message' in error && 'status' in error;
};
  
/**
 * Extracts error message from various error types
 * @param {unknown} error - The error to extract message from
 * @returns {string} The error message
 * @example
 * getErrorMessage({ message: 'Not found', status: 404 }); // 'Not found'
 * getErrorMessage(new Error('Generic error')); // 'Generic error'
 * getErrorMessage(null); // 'An unexpected error occurred'
 */
const getErrorMessage = (error: unknown): string => {
    if (isApiError(error)) return error.message;
    if (error instanceof Error) return error.message;
    return 'An unexpected error occurred';
};
  
/**
 * Checks if user is authenticated by verifying token existence
 * @returns {Promise<boolean>} True if user is authenticated
 * @example
 * const isLoggedIn = await isAuthenticated();
 * if (isLoggedIn) {
 *   // User is authenticated
 * }
 */
const isAuthenticated = async (): Promise<boolean> => {
    const token = await tokenUtils.getToken();
    return !!token;
};

/**
 * Logs the current authentication token to console (for debugging)
 * @returns {Promise<void>}
 * @example
 * await logToken(); // Logs: Token: eyJhbGciOiJIUzI1NiIs...
 */
const logToken = async (): Promise<void> => {
    const token = await tokenUtils.getToken();
    if (token) {
      console.log('Token:', token);
    }
};

/**
 * Utility functions for handling authentication tokens
 */
const tokenUtils = {
    /**
     * Retrieves the authentication token from secure storage
     * @returns {Promise<string | null>} The stored token or null if not found
     */
    getToken: () => SecureStore.getItemAsync(TOKEN_KEY),
    
    /**
     * Stores the authentication token in secure storage
     * @param {string} token - The token to store
     * @returns {Promise<void>}
     */
    setToken: (token: string) => SecureStore.setItemAsync(TOKEN_KEY, token),
    
    /**
     * Removes the authentication token from secure storage
     * @returns {Promise<void>}
     */
    clearToken: () => SecureStore.deleteItemAsync(TOKEN_KEY),
};


export { getErrorMessage, isAuthenticated, logToken, tokenUtils };
