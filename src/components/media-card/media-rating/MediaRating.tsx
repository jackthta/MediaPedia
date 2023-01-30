import StarSVG from "../../SVGs/StarSVG";

type Props = {
  rating: number | "?";
};

import CSS from "./MediaRating.module.scss";

function MediaRating({ rating: _rating }: Props) {
  // Format rating to contain only one fractional digit
  // (API returns rating with three fractional digits)
  const rating = typeof _rating === "number" ? _rating.toFixed(1) : _rating;

  return (
    <div className={CSS.rating}>
      <StarSVG />
      <span>{rating}</span>
    </div>
  );
}

export default MediaRating;
