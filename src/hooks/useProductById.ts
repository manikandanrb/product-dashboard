import { api } from "@/api";
import { Product } from "@/api/services/dashboard";
import { useEffect, useState } from "react";

const useProductById = (selectedProducts: string[]) => {
  const [products, setProducts] = useState<Product[]>([]);

  const getSelectedProducts = async (products: string[]) => {
    const selectedProductData = products.map(async (product) => {
      return await api().getProductById(product);
    });
    const finalProducts = await Promise.all(selectedProductData);
    setProducts(finalProducts);
  };

  useEffect(() => {
    selectedProducts && getSelectedProducts(selectedProducts);
  }, [selectedProducts]);

  return {
    products,
  };
};

export { useProductById };
