import { useState } from "react";
import { Item } from "@/components/list/list-item";

export const useListPagination = (items: Item[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

  const showPagination = itemsPerPage < items.length;

  return {
    currentPage,
    setCurrentPage,
    paginatedItems,
    showPagination,
  };
};
