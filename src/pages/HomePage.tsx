import Button from "../components/Button/Button";
import style from "../components/HomePage.module.css";
import heroImg from "../assets/hero.webp";
import heroImg2x from "../assets/hero@2x.webp";
import heroImg3x from "../assets/hero@3x.webp";

export default function HomePage() {
  return (
    <section className={`container ${style.section}`}>
      <div className={style.leftBox}>
        <h1 className={style.title}>
          The road to the <span className={style.accent}>depths</span> of the
          human soul
        </h1>
        <p className={style.paragraph}>
          We help you to reveal your potential, overcome challenges <br /> and
          find a guide in your own life with the help of our experienced
          psychologists.
        </p>
        <Button
          variant="primary"
          text="Get started"
          size="large"
          to="psychologists"
          className={style.btn}
          children={
            <svg width={18} height={18} fill="var(--hero-bg)">
              <use href="/icons/sprite.svg#icon-arrow-up-right2" />
            </svg>
          }
        />
      </div>
      <div className={style.rightBox}>
        <img
          className={style.image}
          src={heroImg}
          srcSet={`
    ${heroImg2x} 2x,
    ${heroImg3x} 3x
  `}
          alt="A person in glasses is sitting and working"
        />
        <div className={`${style.questionMarkIcon} ${style.icon}`}>
          <svg width={10} height={17} fill="var(--hero-bg)">
            <use href="/icons/sprite.svg#icon-fa6-solid_question" />
          </svg>
        </div>
        <div className={`${style.usersIcon} ${style.icon}`}>
          <svg width={20} height={20} fill="var(--hero-bg)">
            <use href="/icons/sprite.svg#icon-mdi_users" />
          </svg>
        </div>
        <div className={style.statsCard}>
          <div className={`${style.checkIcon} ${style.icon}`}>
            <svg width={20} height={15} fill="var(--accent)">
              <use href="/icons/sprite.svg#icon-Check" />
            </svg>
          </div>

          <div className={style.statsBlock}>
            <p className={style.text}>Experienced psychologists</p>
            <span className={style.span}>15,000</span>
          </div>
        </div>
      </div>
      <div className={style.blurCircle}></div>
    </section>
  );
}
