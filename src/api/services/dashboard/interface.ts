import { Category, Product } from "./api-view";

export interface IDashboardService {
  getCategories(): Promise<Category[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductById(productId: string): Promise<Product>;
}
