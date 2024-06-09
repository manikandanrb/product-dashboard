import { api } from "@/api";
import { useDashboardStore } from "@/store";
import { useEffect } from "react";

const usePieChartData = () => {
  const { pieChartData, setPieChartData, setIsLoading } = useDashboardStore();

  const generatePieChartData = async () => {
    try {
      setIsLoading(true);
      const categories = await api().getCategories();
      const data = await Promise.all(
        categories
          ?.filter((e) => e.slug.length > 0)
          ?.map(async (category) => {
            try {
              const products = await api().getProductsByCategory(category.slug);
              return {
                name: category.name,
                y: products.length ?? 0,
              };
            } catch (error) {
              console.error(error);
              return {
                name: category.name,
                y: 0,
              };
            }
          })
      );
      setPieChartData(data);
    } catch (error) {
      console.error("Failed to generate pie chart data:", error);
      setPieChartData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generatePieChartData();
  }, []);

  return {
    pieChartData,
  };
};

export { usePieChartData };
