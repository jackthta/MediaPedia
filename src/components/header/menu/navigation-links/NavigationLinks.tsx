import { NavLink } from "react-router-dom";

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
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${CSS.navigationLink} ${CSS.activeLink}`
              : CSS.navigationLink
          }
          to="/tv-shows"
          onClick={onMenuClose}
        >
          <TvSVG />
          <span>TV Shows</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${CSS.navigationLink} ${CSS.activeLink}`
              : CSS.navigationLink
          }
          to="/movies"
          onClick={onMenuClose}
        >
          <MovieSVG />
          <span>Movies</span>
        </NavLink>
      </li>
    </menu>
  );
};

NavigationLinks.defaultProps = DefaultProps;

export default NavigationLinks;
