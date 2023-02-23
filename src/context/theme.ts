import { createContext } from "react";

export type Themes = "light" | "dark";

export const ThemeContext = createContext<{
  theme: Themes | null;
  setTheme: Function;
}>({
  theme: null,
  setTheme: () => {},
});
