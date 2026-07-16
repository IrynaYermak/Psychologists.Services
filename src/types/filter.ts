export type SortType =
  | ""
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "rating-asc"
  | "rating-desc";

export interface Filter {
  sortBy: SortType;
}
