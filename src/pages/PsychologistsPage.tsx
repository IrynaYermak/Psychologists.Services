import PsychologistsList from "../components/PsychologistsList/PsychologistsList";
import { useQuery } from "@tanstack/react-query";
import { getPsychologists } from "../services/psychologistsServise";
import style from "../components/PsyhologistPage.module.css";
import Button from "../components/Button/Button";
import FilterBar from "../components/FilterBar/FilterBar";
import { useState } from "react";
import type { Filter } from "../types/filter";
import type { SortType } from "../types/filter";

export default function PsychologistsPage() {
  const [filter, setFilter] = useState<Filter>({
    sortBy: "",
  });
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const handleFilterChange = (value: SortType) => {
    setFilter({ sortBy: value });
    setVisibleCount(3);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["psychologists", filter.sortBy],
    queryFn: () => getPsychologists(filter),
  });
  const allPsychologists = data || [];
  const visiblePsychologists = allPsychologists.slice(0, visibleCount);
  console.log(allPsychologists);
  return (
    <section className={`container ${style.psychologistsPage}`}>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading psychologists</p>}
      <FilterBar value={filter.sortBy} onChange={handleFilterChange} />
      <PsychologistsList psychologists={visiblePsychologists} />
      {visibleCount < allPsychologists.length && (
        <Button
          text="Load more"
          size="medium"
          variant="primary"
          aria-label="Load more psychologists"
          onClick={handleLoadMore}
        />
      )}
    </section>
  );
}
