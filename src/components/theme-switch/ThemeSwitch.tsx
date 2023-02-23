import { useContext } from "react";

import { ThemeContext } from "../../context/theme";
import { setHTMLThemeAttributes } from "../../hooks/theme";

import SunSVG from "../SVGs/SunSVG";
import MoonSVG from "../SVGs/MoonSVG";

import CSS from "./ThemeSwitch.module.scss";

function ThemeSwitch() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleToggleTheme = () => {
    setHTMLThemeAttributes(theme === "light" ? "dark" : "light");
    setTheme(theme === "light" ? "dark" : "light");
  };

  const themeSVG = theme === "light" ? <SunSVG /> : <MoonSVG />;

  return (
    <button className={CSS.themeSwitch} onClick={handleToggleTheme}>
      {themeSVG}
    </button>
  );
}

export default ThemeSwitch;
