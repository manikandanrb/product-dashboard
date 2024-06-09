import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

const useProduct = (
  selectedCategory: string,
  showBarChart: boolean = false,
  runReport: boolean = false,
  selectedProducts: string[] = []
) => {
  const getProducts = async () => {
    return await api().getProductsByCategory(selectedCategory);
  };

  const { data: products } = useQuery({
    queryKey: ["products-by-category", selectedCategory],
    queryFn: getProducts,
    enabled:
      !!selectedCategory &&
      showBarChart &&
      runReport &&
      selectedProducts?.length == 0,
    refetchOnWindowFocus: false,
  });

  return {
    products,
  };
};

export { useProduct };
