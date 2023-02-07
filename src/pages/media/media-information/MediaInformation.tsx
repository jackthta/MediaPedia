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

  return (
    <>
      <section className={CSS.section}>
        <h2 className={CSS.heading}>Information</h2>

        <dl>
          <div className={CSS.content}>
            <dt>Rating</dt>
            <dd>{rating} / 10</dd>
          </div>

          <div className={CSS.content}>
            <dt>Genre</dt>
            <dd>{show.genres.map((genre) => genre.name).join(", ")}</dd>
          </div>

          <div className={CSS.content}>
            <dt>First episode date</dt>
            <dd>{releaseDate}</dd>
          </div>

          <div className={CSS.content}>
            <dt>Language</dt>
            <dd>{language?.english_name}</dd>
          </div>

          {show.networks && (
            <div className={CSS.content}>
              <dt>Network</dt>
              <dd>
                {show.networks.map((network) => (
                  <span key={network.id}>{network.name}</span>
                ))}
              </dd>
            </div>
          )}

          {show.content_rating && (
            <div className={CSS.content}>
              <dt>Rated</dt>
              <dd>{show.content_rating.rating}</dd>
            </div>
          )}
        </dl>
      </section>

      <Separator />
    </>
  );
}

export default MediaInformation;
