import type Psyhologist from "../../types/psyhologist";
import style from "./PsyhologistCard.module.css";
import { useState } from "react";
import ReviewsList from "../ReviewsList/ReviewsList";
import Button from "../Button/Button";

interface PsyhologistCardProps {
  //   key: string;
  psyhologist: Psyhologist;
}

export default function PsyhologistCard({ psyhologist }: PsyhologistCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    name,
    avatar_url,
    experience,
    reviews,
    price_per_hour,
    rating,
    license,
    specialization,
    initial_consultation,
    about,
  } = psyhologist;
  return (
    <li className={style.psyhologistCard}>
      <div className={style.picture}>
        <img
          src={avatar_url}
          alt={name}
          width={96}
          height={96}
          className={style.avatar}
        />
      </div>

      <div className={style.description}>
        <div className={style.titleInfo}>
          <div className={style.nameBlock}>
            <p>Psychologist</p>
            <h2 className={style.name}>{name}</h2>
          </div>

          <div className={style.ratingBlock}>
            <p className={style.details}>
              <svg width={16} height={16} className={style.star}>
                <use href="/icons/sprite.svg#icon-star-empty" fill="#ffc531" />
              </svg>
              Rating: <span>{rating}</span>
            </p>

            <span className={style.devider}>|</span>

            <p className={style.details}>
              Price / 1 hour:
              <span className={style.accent}> {price_per_hour}$</span>
            </p>

            <button
              type="button"
              aria-label="Add to favorites"
              className={style.favoriteButton}
            >
              <svg
                width={25}
                height={22}
                // fill="#fbfbfb"
                className={style.heart}
              >
                <use href="/icons/sprite.svg#icon-heart" />
              </svg>
            </button>
          </div>
        </div>
        <div className={style.detailsBlock}>
          <ul className={style.detailsList}>
            <li className={style.detailsItem}>
              Experience:
              <p className={style.details}>{experience}</p>
            </li>

            <li className={style.detailsItem}>
              License:
              <p className={style.details}>{license}</p>
            </li>

            <li className={style.detailsItem}>
              Specialization:
              <p className={style.details}>{specialization}</p>
            </li>

            <li className={style.detailsItem}>
              Initial_consultation:
              <p className={style.details}>{initial_consultation}</p>
            </li>
          </ul>
        </div>
        <div className={style.aboutBlock}>
          <p className={style.about}>{about}</p>
          <div className={style.reviewsBlock}>
            {!isExpanded && (
              <button
                type="button"
                className={style.aboutBtn}
                onClick={() => setIsExpanded(true)}
              >
                Read more
              </button>
            )}
            {isExpanded && (
              <>
                <ReviewsList reviews={reviews} />
                <Button
                  text="Make an appointment"
                  size="medium"
                  variant="primary"
                  aria-label="Make an appointment"
                  className={style.appointmentBtn}
                  // onClick={}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
