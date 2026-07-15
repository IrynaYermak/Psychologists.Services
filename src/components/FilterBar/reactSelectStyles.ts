import type { StylesConfig } from "react-select";

export const selectStyles: StylesConfig = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: "14px",
    padding: "16px 18px",
    margin: 0,
    backgroundColor: state.isFocused ? "#f37113" : "#fc832c",
    maxHeight: "48px",
    border: "none",
    boxShadow: "none",

    "&:hover": {
      border: "none",
    },
  }),

  placeholder: (baseStyles) => ({
    ...baseStyles,
    lineHeight: 1.25,
    color: "#fbfbfb",
    margin: 0,
    padding: 0,
  }),

  menu: (baseStyles) => ({
    ...baseStyles,
    display: "flex",
    flexDirection: "column",
    // gap: "8px",
    borderRadius: "14px",
    background: "#fff",
    padding: "14px 18px",
    boxShadow: "0 20px 69px 0 rgba(0, 0, 0, 0.07)",
    height: "216px",
  }),

  menuList: (baseStyles) => ({
    ...baseStyles,

    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  }),

  option: (baseStyles, state) => ({
    ...baseStyles,
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "start",

    fontSize: "16px",
    fontWeight: 400,
    lineHeight: 1.25,
    color: state.isSelected ? "#191a15" : "rgba(25, 26, 21, 0.3)",
    backgroundColor: state.isFocused ? "transparent" : "transparent",
    margin: 0,
    padding: 0,
    // paddingBottom: "8px",
    cursor: "pointer",
  }),

  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: "#fbfbfb",
  }),

  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    padding: 0,
    // margin: 0,
    color: "#fbfbfb",
    transition: "transform .25s ease",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
    "&:hover": {
      color: "#fbfbfb",
    },
  }),

  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    display: "none",
  }),
  indicatorsContainer: (baseStyles) => ({
    ...baseStyles,
    padding: 0,
    margin: 0,
    height: "100%",
  }),

  valueContainer: (baseStyles) => ({
    ...baseStyles,
    margin: 0,
    padding: 0,
  }),
};
