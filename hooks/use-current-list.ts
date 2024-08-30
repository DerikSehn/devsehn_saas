import { useState, useCallback } from "react";
import { CrudRequest } from "@/types/crud";
import { handleApiRequest } from "@/services/crud-service";
import { Item } from "@/components/list/list-item";
import { useListPagination } from "./use-list-pagination";
import { useListFiltering } from "./use-list-filtering";
import { useToast } from "@/components/providers/toast-provider";
import { useListSorting } from "./useListSorting";

interface Option {
  value: string;
  label: string;
}

interface UseCurrentListProps {
  items: Item[];
  itemsPerPage?: number;
  sortOptions?: Option[];
  filterOptions?: Option[];
  tableName?: CrudRequest["table"];
  onSubmit?(item: Item, reason: CrudRequest["method"]): any;
  onClick?(item: Item): any;
}

export const useCurrentList = ({
  items = [],
  itemsPerPage = 10,
  sortOptions = [],
  filterOptions = [],
  tableName,
  onSubmit,
  onClick,
}: UseCurrentListProps) => {
  const notify = useToast();
  const [list, setList] = useState(items);

  const { currentPage, setCurrentPage, paginatedItems, showPagination } =
    useListPagination(list, itemsPerPage);
  const { sortOption, setSortOption, sortedItems } = useListSorting(
    list,
    sortOptions
  );
  const { filterOption, setFilterOption, filteredItems } = useListFiltering(
    sortedItems,
    filterOptions
  );

  const handleSubmit = useCallback(
    ({
      item: itemData,
      method: reason,
    }: {
      item: any;
      method: CrudRequest["method"];
    }) => {
      switch (reason) {
        case "create":
          setList((prevState) => [...prevState, itemData]);
          break;
        case "update":
          setList((prevState) =>
            prevState.map((item) =>
              item!.id === itemData.id ? itemData : item
            )
          );
          break;
        case "delete":
          setList((prevState) =>
            prevState.filter((item) => item!.id !== itemData.id)
          );
          break;
      }
      if (typeof onSubmit === "function") {
        onSubmit(itemData, reason);
      }
    },
    [onSubmit]
  );

  const handleItemClick = useCallback(
    (item: Item) => {
      if (typeof onClick === "function") {
        onClick(item);
      }
    },
    [onClick]
  );

  const handleItemDelete = useCallback(
    async (id: number) => {
      const where = { id };
      const res = await handleApiRequest({ where }, tableName!, "delete");
      if (res.error) {
        notify(res.error, { type: "error" });
      }
      setList((prevState) => prevState.filter((item) => item!.id !== id));
    },
    [tableName, notify]
  );

  return {
    currentPage,
    setCurrentPage,
    paginatedItems,
    showPagination,
    sortOption,
    setSortOption,
    filterOption,
    setFilterOption,
    filteredItems,
    handleSubmit,
    handleItemClick,
    handleItemDelete,
  };
};
