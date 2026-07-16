import type { SortType } from "../types/filter";
import type Psychologist from "../types/psychologist";

export const sortPsychologists = (
  psychologist: Psychologist[],
  sortBy: SortType
) => {
  const sorted = [...psychologist];
  console.log("SORT", sortBy);
  switch (sortBy) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));

    case "price-asc":
      return sorted.sort((a, b) => a.price_per_hour - b.price_per_hour);

    case "price-desc":
      return sorted.sort((a, b) => b.price_per_hour - a.price_per_hour);

    case "rating-asc":
      return sorted.sort((a, b) => a.rating - b.rating);

    case "rating-desc":
      return sorted.sort((a, b) => b.rating - a.rating);

    default:
      return sorted;
  }
};
