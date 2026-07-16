import Select, { type SingleValue } from "react-select";
import style from "./FilterBar.module.css";
import { selectStyles } from "./reactSelectStyles.ts";
import type { SortType } from "../../types/filter.ts";

interface FilterBarProps {
  value: SortType;
  onChange: (value: SortType) => void;
}

export interface SelectOption {
  value: SortType;
  label: string;
}

export default function FilterBar({ value, onChange }: FilterBarProps) {
  const options: SelectOption[] = [
    { value: "name-asc", label: "A to Z" },
    { value: "name-desc", label: "Z to A" },
    { value: "price-asc", label: "Less than 10$" },
    { value: "price-desc", label: "Greater than 10$" },
    { value: "rating-desc", label: "Popular" },
    { value: "rating-asc", label: "Not popular" },
    { value: "", label: "Show all" },
  ];
  return (
    <div className={style.filterBar}>
      <p className={style.title}>Filters</p>
      <Select<SelectOption>
        options={options}
        // defaultValue=""
        value={options.find((option) => option.value === value)}
        onChange={(option: SingleValue<SelectOption>) =>
          onChange(option?.value ?? "")
        }
        placeholder={options[0].label}
        isSearchable={false}
        isClearable={false}
        styles={selectStyles}
      />
    </div>
  );
}
