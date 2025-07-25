// Common types used throughout the application

export interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image?: string;
  features: string[];
  category: string;
  inStock: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NavItem {
  path: string;
  label: string;
  icon?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type LoadingState = "idle" | "loading" | "success" | "error";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
