import { selectTmdbConfigurationLanguages } from "../../../redux/slices/tmdb-configuration";
import { useSelector } from "../../../redux/store/hooks";

import Separator from "../../../components/separator/Separator";

import type { MediaSpecificInformation } from "../../../redux/slices/media/types";

import CSS from "./MediaInformation.module.scss";

type Props = {
  show: MediaSpecificInformation;
};

function MediaInformation({ show }: Props) {
  const configLangs = useSelector(selectTmdbConfigurationLanguages);

  // Format rating to contain only one fractional digit
  // (API returns rating with three fractional digits)
  const rating = show.vote_average.toFixed(1);

  const releaseDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(show.release_date));

  const language = configLangs.find(
    (lang) => lang.iso_639_1 === show.original_language
  );

  const genreString = show.genres.map((genre) => genre.name).join(", ");

  const networkString = show.networks
    ?.map((network) => network.name)
    .join(", ");

  return (
    <>
      <section className={CSS.section} aria-label="Information">
        <h2 className={CSS.heading}>Information</h2>

        <dl>
          <div className={CSS.content}>
            <dt aria-label="Rating">
              <span aria-hidden="true">Rating:</span>
            </dt>
            <dd aria-label={`${rating} out of 10`}>
              <span aria-hidden="true">{rating} / 10</span>
            </dd>
          </div>

          <div className={CSS.content}>
            <dt aria-label="Genre">
              <span aria-hidden="true">Genre:</span>
            </dt>
            <dd aria-label={genreString}>
              <span aria-hidden="true">{genreString}</span>
            </dd>
          </div>

          <div className={CSS.content}>
            <dt aria-label="Release date">
              <span aria-hidden="true">Release date:</span>
            </dt>
            <dd aria-label={releaseDate}>
              <span aria-hidden="true">{releaseDate}</span>
            </dd>
          </div>

          <div className={CSS.content}>
            <dt aria-label="Language">
              <span aria-hidden="true">Language:</span>
            </dt>
            <dd aria-label={language?.english_name}>
              <span>{language?.english_name}</span>
            </dd>
          </div>

          {show.networks && (
            <div className={CSS.content}>
              <dt aria-label="Network">
                <span aria-hidden="true">Network:</span>
              </dt>
              <dd aria-label={networkString}>
                <span aria-hidden="true">{networkString}</span>
              </dd>
            </div>
          )}

          {show.content_rating && (
            <div className={CSS.content}>
              <dt aria-label="Rated">
                <span aria-hidden="true">Rated:</span>
              </dt>
              <dd aria-label={show.content_rating.rating}>
                <span aria-hidden="true">{show.content_rating.rating}</span>
              </dd>
            </div>
          )}
        </dl>
      </section>

      <Separator />
    </>
  );
}

export default MediaInformation;
