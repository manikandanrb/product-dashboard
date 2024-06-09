import { create } from "zustand";

export interface DashboardState {
  selectedCategory: string;
  selectedProducts: string[];
  isLoading: boolean;
  runReport: boolean;
  showBarChart: boolean;
  setSelectedCategory: (category: string) => void;
  setSelectedProducts: (products: string[]) => void;
  pieChartData: { name: string; y: number }[];
  setPieChartData: (data: { name: string; y: number }[]) => void;
  setRunReport: (runReport: boolean) => void;
  setShowBarChart: (showBarChart: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  selectedCategory: "",
  selectedProducts: [],
  pieChartData: [],
  runReport: false,
  showBarChart: false,
  isLoading: false,
  setSelectedCategory: (category: string) =>
    set((state: DashboardState) => ({ ...state, selectedCategory: category })),
  setSelectedProducts: (products: string[]) =>
    set((state: DashboardState) => ({ ...state, selectedProducts: products })),
  setPieChartData: (data: { name: string; y: number }[]) =>
    set((state: DashboardState) => ({ ...state, pieChartData: data })),
  setRunReport: (runReport: boolean) =>
    set((state: DashboardState) => ({ ...state, runReport })),
  setShowBarChart: (showBarChart: boolean) =>
    set((state: DashboardState) => ({ ...state, showBarChart })),
  setIsLoading: (isLoading: boolean) =>
    set((state: DashboardState) => ({ ...state, isLoading })),
}));
