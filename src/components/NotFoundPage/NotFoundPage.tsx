import style from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <section className={`container ${style.section}`}>
      <h2 className={style.number}>404</h2>
      <p>Page not found</p>
    </section>
  );
}
