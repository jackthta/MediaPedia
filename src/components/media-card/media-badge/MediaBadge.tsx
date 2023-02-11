import CSS from "./MediaBadge.module.scss";

type Props = {
  mediaType: "tv" | "movie";
};

function MediaBadge({ mediaType }: Props) {
  const text = mediaType === "tv" ? "Tv" : "Movie";
  return (
    <p className={CSS.badge} aria-label="Type">
      {text}
    </p>
  );
}

export default MediaBadge;
