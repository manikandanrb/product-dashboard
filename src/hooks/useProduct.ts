import { api } from "@/api";
import { Product } from "@/api/services/dashboard";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useProduct = (
  selectedCategory: string,
  showBarChart: boolean = false,
  runReport: boolean = false,
  selectedProducts: string[] = []
) => {
  const [productsById, setProductsById] = useState<Product[]>([]);

  const getProductsByCategory = async () => {
    return await api().getProductsByCategory(selectedCategory);
  };

  const getProductsById = async (productIds: string[]) => {
    const productPromises = productIds.map(async (productId) => {
      return await api().getProductById(productId);
    });
    return await Promise.all(productPromises);
  };

  const { data: categoryProducts, refetch: refetchCategoryProducts } = useQuery(
    {
      queryKey: ["products-by-category", selectedCategory],
      queryFn: getProductsByCategory,
      enabled:
        !!selectedCategory &&
        showBarChart &&
        runReport &&
        selectedProducts?.length === 0,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (selectedProducts?.length > 0) {
      getProductsById(selectedProducts).then(setProductsById);
    }
  }, [selectedProducts]);

  return {
    products:
      selectedProducts.length > 0 ? productsById : categoryProducts ?? [],
    refetchCategoryProducts,
  };
};

export { useProduct };
