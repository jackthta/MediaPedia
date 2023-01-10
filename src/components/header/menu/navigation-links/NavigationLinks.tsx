import { Link } from "react-router-dom";

import TvSVG from "../../../SVGs/TvSVG";
import MovieSVG from "../../../SVGs/MovieSVG";

import CSS from "./NavigationLinks.module.scss";

type Props = {
  inMenuDialog?: boolean;
};

const DefaultProps: Props = {
  inMenuDialog: false,
};

const NavigationLinks: React.FC<Props> = ({ inMenuDialog }) => {
  const CSS_navigationLink = inMenuDialog
    ? CSS.menuDialogNavigationLinks
    : CSS.desktopNavigationLinks;

  return (
    <menu className={CSS_navigationLink}>
      <li>
        <Link className={CSS.navigationLink} to="tv-shows">
          <TvSVG />
          <span>TV Shows</span>
        </Link>
      </li>
      <li>
        <Link className={CSS.navigationLink} to="movies">
          <MovieSVG />
          <span>Movies</span>
        </Link>
      </li>
    </menu>
  );
};

NavigationLinks.defaultProps = DefaultProps;

export default NavigationLinks;
