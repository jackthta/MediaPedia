import { Link } from "react-router-dom";

import Menu from "./menu/Menu";

import CSS from "./Header.module.scss";

function Header() {
  return (
    <header>
      <nav className={CSS.navigation}>
        <Link className={CSS.homeLink} to="/">
          MediaPedia
        </Link>

        <Menu />
      </nav>
    </header>
  );
}

export default Header;
