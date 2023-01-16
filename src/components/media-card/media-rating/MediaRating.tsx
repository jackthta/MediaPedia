import StarSVG from "../../SVGs/StarSVG";

type Props = {
  rating: number | "?";
};

import CSS from "./MediaRating.module.scss";

function MediaRating({ rating }: Props) {
  return (
    <div className={CSS.rating}>
      <StarSVG />
      <span>{rating}</span>
    </div>
  );
}

export default MediaRating;
