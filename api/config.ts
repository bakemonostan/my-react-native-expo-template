import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { BASE_URL } from './api.constants';
import { ApiError } from './api.types';
import { tokenUtils } from './api.utils';

// Define a more structured error response type
interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
}

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = await tokenUtils.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError<ErrorResponse>) => {
      if (error.response?.status === 401) {
        await tokenUtils.clearToken();
      }
  
      const apiError: ApiError = {
        message: error.response?.data?.message || error.message || 'An error occurred',
        status: error.response?.status,
        errors: error.response?.data?.errors
      };
  
      throw apiError;
    }
  );

export default api;