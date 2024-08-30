import { useState, useEffect } from "react";
import { Item } from "@/components/list/list-item";

interface Option {
  value: string;
  label: string;
}

export const useListFiltering = (items: Item[], filterOptions: Option[]) => {
  const [filterOption, setFilterOption] = useState(
    filterOptions[0]?.value || ""
  );

  useEffect(() => {
    if (filterOptions.length === 0) {
      setFilterOption("");
    }
  }, [filterOptions]);

  const filteredItems =
    filterOptions.length > 1 && filterOption
      ? /* @ts-ignore */
        items.filter((item) => item.category === filterOption)
      : items;

  return {
    filterOption,
    setFilterOption,
    filteredItems,
  };
};
