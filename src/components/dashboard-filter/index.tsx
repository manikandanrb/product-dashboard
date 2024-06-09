import { useCategory } from "@/hooks/useCategory";
import { useProduct } from "@/hooks/useProduct";
import { useDashboardStore } from "@/store";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { SelectInput } from "../forms/select";
import styles from "./index.module.scss";

type Inputs = {
  category: string;
  products: string[];
};

const DashboardFilter = () => {
  const { categories } = useCategory();
  const {
    setSelectedCategory,
    setSelectedProducts,
    setRunReport,
    setShowBarChart,
    setIsLoading,
  } = useDashboardStore();
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { control, handleSubmit, watch, reset, resetField } = useForm<Inputs>({
    mode: "onSubmit",
    defaultValues: {
      category: "",
      products: [],
    },
  });

  const categoryValue = watch("category");
  const productsValue = watch("products");

  const { products: productItems } = useProduct(categoryValue, true, true);

  const products = productItems
    ? productItems?.map((product) => ({
        label: product.title,
        value: product.id.toString(),
      }))
    : [];

  useEffect(() => {
    if (categoryValue || productsValue) {
      setSubmitted(false);
      setRunReport(false);
    }
  }, [categoryValue, productsValue]);

  const handleClear = () => {
    setSelectedCategory("");
    setSelectedProducts([]);
    setShowBarChart(false);
    setRunReport(false);
    reset();
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true);
    setSelectedCategory(data?.category);
    setSelectedProducts(data?.products);
    setRunReport(true);
    setShowBarChart(true);
    setSubmitted(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form
      className={styles.dashboardMainContent}
      onSubmit={handleSubmit(onSubmit)}
    >
      <article className={styles.dashboardFilterContainer}>
        <header className={styles.filterHeader}>
          <h2>Filters</h2>
          <Button onClick={handleClear} className={styles.clear}>
            Clear
          </Button>
        </header>
        <main>
          <Controller
            name="category"
            control={control}
            render={({ field: { value, onChange } }) => (
              <SelectInput
                items={categories ?? []}
                mode="single"
                placeholder="Select Category"
                value={value}
                handleChange={(category) => {
                  resetField("products");
                  onChange(category);
                }}
              />
            )}
          />

          <Controller
            name="products"
            control={control}
            render={({ field: { value, onChange } }) => (
              <SelectInput
                items={products ?? []}
                mode="multiple"
                placeholder="Select Products"
                handleChange={onChange}
                value={value as string[]}
                disabled={!categoryValue}
              />
            )}
          />
        </main>
        <footer className={styles.filterFooter}>
          <Button
            disabled={submitted || !categoryValue}
            className={styles.button}
            type="submit"
            variant="contained"
          >
            Run Report
          </Button>
        </footer>
      </article>
    </form>
  );
};

export default DashboardFilter;
