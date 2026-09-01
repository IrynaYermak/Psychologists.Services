import { Hearts } from "react-loader-spinner";
import style from "./Loader.module.css";

export function Loader() {
  return (
    <Hearts
      height={80}
      width={80}
      color="#fc832c"
      ariaLabel="hearts-loading"
      wrapperClass={style.loaderWrapper}
    />
  );
}
