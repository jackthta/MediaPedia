import { useEffect, useState } from "react";

import SunSVG from "../SVGs/SunSVG";
import MoonSVG from "../SVGs/MoonSVG";

import CSS from "./ThemeSwitch.module.scss";

type Themes = "light" | "dark";

const themes: Themes[] = ["light", "dark"];

function ThemeSwitch() {
  const [theme, setTheme] = useState<Themes | null>(null);

  const handleToggleTheme = () => {
    setHTMLThemeAttributes(theme === "light" ? "dark" : "light");
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Programmatically see whether the user prefers
  // light or dark mode
  useEffect(() => {
    const prefersLightMode = matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;
    const prefersDarkMode = matchMedia("(prefers-color-scheme: dark)").matches;

    if (prefersLightMode) {
      setHTMLThemeAttributes("light");
      setTheme("light");
    }

    if (prefersDarkMode) {
      setHTMLThemeAttributes("dark");
      setTheme("dark");
    }
  }, []);

  // Listen for when user changes theme via user preferences
  // and toggle theme appropriately
  useEffect(() => {
    const handleUserPrefThemeChange = (
      mediaQuery: MediaQueryListEvent,
      theme: Themes
    ) => {
      if (mediaQuery.matches) {
        setHTMLThemeAttributes(theme);
        setTheme(theme);
      }
    };
    themes.forEach((theme) =>
      matchMedia(`(prefers-color-scheme: ${theme})`).addEventListener(
        "change",
        (mediaQuery) => handleUserPrefThemeChange(mediaQuery, theme)
      )
    );

    return () => {
      themes.forEach((theme) =>
        matchMedia(`(prefers-color-scheme: ${theme})`).removeEventListener(
          "change",
          (mediaQuery) => handleUserPrefThemeChange(mediaQuery, theme)
        )
      );
    };
  }, []);

  const themeSVG = theme === "light" ? <SunSVG /> : <MoonSVG />;

  return <button onClick={handleToggleTheme}>{themeSVG}</button>;
}

function setHTMLThemeAttributes(theme: Themes) {
  const html = document.querySelector("html")!;

  html.classList.remove(...themes);

  html.classList.add(theme);
  html.style.setProperty("color-scheme", theme);
}

export default ThemeSwitch;
