import { useState } from "react";
import type { Filter, SortType } from "../types/filter";

export const usePsychologistLoad = () => {
  const [filter, setFilter] = useState<Filter>({
    sortBy: "",
  });

  const [visibleCount, setVisibleCount] = useState(3);

  const handleFilterChange = (value: SortType) => {
    setFilter({ sortBy: value });
    setVisibleCount(3);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return {
    filter,
    visibleCount,
    handleFilterChange,
    handleLoadMore,
  };
};
