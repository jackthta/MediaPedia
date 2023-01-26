import { selectTmdbConfigurationLanguages } from "../../../redux/slices/tmdb-configuration";
import { useSelector } from "../../../redux/store/hooks";

import type {
  ContentRating,
  Images,
  TvShowSpecificInformation,
} from "../../../utilities/axios/types";

import CSS from "./TvShowInformation.module.scss";

type Props = {
  show: TvShowSpecificInformation & Images & ContentRating;
};

function TvShowInformation({ show }: Props) {
  const configLangs = useSelector(selectTmdbConfigurationLanguages);

  const releaseDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(show.first_air_date));

  const language = configLangs.find(
    (lang) => lang.iso_639_1 === show.original_language
  );

  return (
    <section className={CSS.section}>
      <h2 className={CSS.heading}>Information</h2>
      
      <dl>
        <div className={CSS.content}>
          <dt>Rating</dt>
          <dd>{show.vote_average} / 10</dd>
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

        <div className={CSS.content}>
          <dt>Network</dt>
          <dd>
            {show.networks.map((network) => (
              <span key={network.id}>{network.name}</span>
            ))}
          </dd>
        </div>

        <div className={CSS.content}>
          <dt>Rated</dt>
          <dd>{show.rating}</dd>
        </div>
      </dl>
    </section>
  );
}

export default TvShowInformation;
