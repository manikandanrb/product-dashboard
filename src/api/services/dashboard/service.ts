import { AxiosInstance } from "axios";
import { ServiceBase } from "../service-base";
import { Category, Product } from "./api-view";
import { IDashboardService } from "./interface";

const API = {
  getCategories() {
    return `/products/categories`;
  },
  getProductsByCategory(category: string) {
    return `/products/category/${category}`;
  },
  getProductById(productId: string) {
    return `/products/${productId}`;
  },
};

export class DashboardService extends ServiceBase implements IDashboardService {
  constructor(axiosInstance: AxiosInstance) {
    super(axiosInstance);
  }

  async getCategories(): Promise<Category[]> {
    const url = API.getCategories();
    return await this.doGet(url);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const url = API.getProductsByCategory(category);
    const response = await this.doGet(url);
    return (response as { products: Product[] })?.products ?? [];
  }

  async getProductById(productId: string): Promise<Product> {
    const url = API.getProductById(productId);
    return await this.doGet(url);
  }
}
