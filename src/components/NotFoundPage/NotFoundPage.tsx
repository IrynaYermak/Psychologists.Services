import style from "./NotFoundPage.module.css";
import Button from "../Button/Button";

export default function NotFoundPage() {
  return (
    <section className={`container ${style.section}`}>
      <h1 className={style.number}>404</h1>
      <p>Page not found</p>

      <Button to="/" text="Back to home" variant="primary" size="medium" />
    </section>
  );
}
