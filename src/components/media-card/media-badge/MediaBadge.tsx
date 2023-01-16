import CSS from "./MediaBadge.module.scss";

type Props = {
  mediaType: "tv" | "movie";
};

function MediaBadge({ mediaType }: Props) {
  const text = mediaType === "tv" ? "TV" : "Movie";
  return <p className={CSS.badge}>{text}</p>;
}

export default MediaBadge;
