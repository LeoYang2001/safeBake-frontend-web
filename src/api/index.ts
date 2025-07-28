// API service for handling HTTP requests
import { config } from "../globals";
import type { ApiResponse, Product, ContactFormData } from "../types";

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.apiBaseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const defaultOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error("API request failed:", error);
      return {
        success: false,
        data: null as any,
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // Products API
  async getProducts(): Promise<ApiResponse<Product[]>> {
    return this.request<Product[]>("/products");
  }

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    return this.request<Product>(`/products/${id}`);
  }

  // Contact API
  async submitContactForm(
    formData: ContactFormData
  ): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>("/contact", {
      method: "POST",
      body: JSON.stringify(formData),
    });
  }

  // Newsletter API
  async subscribeToNewsletter(
    email: string
  ): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>("/newsletter/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }
}

export const apiService = new ApiService();
export default apiService;
