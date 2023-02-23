import { useEffect, useContext } from "react";

import { ThemeContext } from "../context/theme";

import type { Themes } from "../context/theme";

const themes: Themes[] = ["light", "dark"];

// Make web application match user preferred system theme
export const useMatchSystemPrefTheme = () => {
  const { setTheme } = useContext(ThemeContext);

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
};

// Listen for when user changes theme via user preferences
// and toggle theme appropriately
export const useListenForSystemPrefThemeChange = () => {
  const { setTheme } = useContext(ThemeContext);

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
};

export const setHTMLThemeAttributes = (theme: Themes) => {
  const html = document.querySelector("html")!;

  html.classList.remove(...themes);

  html.classList.add(theme);
  html.style.setProperty("color-scheme", theme);
};
