import { useState, useEffect } from "react";
import { Item } from "@/components/list/list-item";

interface Option {
  value: string;
  label: string;
}

export const useListSorting = (items: Item[], sortOptions: Option[]) => {
  const [sortOption, setSortOption] = useState(sortOptions[0]?.value || "");

  useEffect(() => {
    if (sortOptions.length === 0) {
      setSortOption("");
    }
  }, [sortOptions]);

  const sortedItems = sortOptions.length
    ? [...items].sort((a, b) => {
        /* @ts-ignore */
        return a?.[sortOption as keyof Item] > b?.[sortOption as keyof Item]
          ? 1
          : -1;
      })
    : items;

  return {
    sortOption,
    setSortOption,
    sortedItems,
  };
};
