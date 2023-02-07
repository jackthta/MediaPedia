import { Link } from "react-router-dom";

import TvSVG from "../../../SVGs/TvSVG";
import MovieSVG from "../../../SVGs/MovieSVG";

import CSS from "./NavigationLinks.module.scss";

type Props = {
  inMenuDialog?: boolean;
  onMenuClose?: () => void;
};

const DefaultProps: Props = {
  inMenuDialog: false,
  onMenuClose: () => ({}),
};

const NavigationLinks: React.FC<Props> = ({ inMenuDialog, onMenuClose }) => {
  const CSS_navigationLinks = inMenuDialog
    ? CSS.menuDialogNavigationLinks
    : CSS.desktopNavigationLinks;

  return (
    <menu className={CSS_navigationLinks}>
      <li>
        <Link
          className={CSS.navigationLink}
          to="/tv-shows"
          onClick={onMenuClose}
        >
          <TvSVG />
          <span>TV Shows</span>
        </Link>
      </li>
      <li>
        <Link className={CSS.navigationLink} to="/movies" onClick={onMenuClose}>
          <MovieSVG />
          <span>Movies</span>
        </Link>
      </li>
    </menu>
  );
};

NavigationLinks.defaultProps = DefaultProps;

export default NavigationLinks;
