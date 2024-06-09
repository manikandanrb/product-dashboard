import { BarChart } from "@/components/charts/bar";
import { PieChart } from "@/components/charts/pie";
import { usePieChartData } from "@/hooks/usePieChartData";
import { useProduct } from "@/hooks/useProduct";
import { useProductById } from "@/hooks/useProductById";
import { useDashboardStore } from "@/store";
import { Box, CircularProgress } from "@mui/material";
import { useMemo } from "react";
import DashboardFilter from "../../components/dashboard-filter";
import styles from "./index.module.scss";

const Dashboard = () => {
  const { pieChartData } = usePieChartData();
  const {
    showBarChart,
    selectedCategory,
    selectedProducts,
    runReport,
    isLoading,
  } = useDashboardStore();
  const { products } = useProduct(
    selectedCategory,
    showBarChart,
    runReport,
    selectedProducts
  );
  const { products: selectedProductData } = useProductById(selectedProducts);

  const productItems =
    selectedProducts?.length > 0 ? selectedProductData : products ?? [];

  const productData = useMemo(
    () =>
      productItems?.map((product) => ({
        name: product.title,
        y: product.price,
      })),
    [productItems]
  );

  return (
    <div className={styles.dashboardContainer}>
      <DashboardFilter />
      <div className={styles.chartContainer}>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </Box>
        ) : showBarChart && productData ? (
          <BarChart data={productData} category={selectedCategory} />
        ) : (
          <PieChart data={pieChartData} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
