import Select from "react-select";
import style from "./FilterBar.module.css";
import { selectStyles } from "./reactSelectStyles.ts";

export default function FilterBar() {
  const options = [
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
      <Select
        options={options}
        defaultValue=""
        placeholder={options[0].label}
        isSearchable={false}
        isClearable={false}
        styles={selectStyles}
      />
    </div>
  );
}
