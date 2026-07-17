import type Psychologist from "../../types/psychologist";
import style from "./PsychologistCard.module.css";
import { useState } from "react";
import ReviewsList from "../ReviewsList/ReviewsList";
import Button from "../Button/Button";
import { useAuthStore } from "../../store/authStore";
import toast from "react-hot-toast";
import { getUser, updateFavorites } from "../../services/userService";

interface PsychologistCardProps {
  //   key: string;
  psychologist: Psychologist;
}

export default function PsychologistCard({
  psychologist,
}: PsychologistCardProps) {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
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
  } = psychologist;
  const isFavorite = user?.favorites?.includes(psychologist.id) ?? false;

  const handleFavorite = async () => {
    if (!user) {
      toast.error("Please log in first");
      return;
    }
    const favorites = user?.favorites || [];
    const isFavorite = favorites?.includes(psychologist.id);
    let newFavorites: string[];
    if (isFavorite) {
      newFavorites = favorites.filter((id) => id !== psychologist.id);
    } else {
      newFavorites = [...favorites, psychologist.id];
    }

    await updateFavorites(user.uid, newFavorites);
    const updatedUser = await getUser(user.uid);

    setUser(updatedUser);
  };

  return (
    <li className={style.psychologistCard}>
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
              onClick={handleFavorite}
            >
              <svg
                width={25}
                height={22}
                // fill="#fbfbfb"
                className={`${style.heart} ${
                  isFavorite ? style.savedHeart : ""
                }`}
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
