import type { Review } from "../../types/psyhologist";
import style from "./ReviewsList.module.css";

interface ReviewsListProps {
  reviews: Review[];
}

export default function ReviewsList(reviews: ReviewsListProps) {
  return (
    <ul className={style.reviewsList}>
      {reviews.reviews.map((review, index) => (
        <li key={index}>
          <div className={style.reviewHeader}>
            <p className={style.avatar}>{review.reviewer[0]}</p>
            <div className={style.reviewInfo}>
              <p>{review.reviewer}</p>
              <p>
                <svg width={16} height={16} className={style.star}>
                  <use
                    href="/icons/sprite.svg#icon-star-empty"
                    fill="#ffc531"
                  />
                </svg>
                {review.rating.toFixed(1)}
              </p>
            </div>
          </div>
          <p className={style.reviewComment}> {review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
