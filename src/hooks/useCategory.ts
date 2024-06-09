import { Item } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

const useCategory = () => {
  const getCategories = async () => {
    return await api().getCategories();
  };
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    select(data) {
      const newData = data.map((category) => {
        const item: Item = {
          label: category.name,
          value: category.slug,
        };
        return item;
      });
      return newData;
    },
    refetchOnWindowFocus: false,
  });

  return {
    categories: data,
  };
};

export { useCategory };
