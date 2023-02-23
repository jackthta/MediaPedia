import { forwardRef } from "react";

import CloseSVG from "../../../SVGs/CloseSVG";
import Separator from "../../../separator/Separator";
import SearchBar from "../../../search-bar/SearchBar";
import NavigationLinks from "../navigation-links/NavigationLinks";
import ThemeSwitch from "../../../theme-switch/ThemeSwitch";

import CSS from "./MenuDialog.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const MenuDialog = forwardRef<HTMLDialogElement, Props>(function MenuDialog(
  { isOpen, onClose },
  ref
) {
  /**
   * NOTE: Using `display` to toggle "open" state
   * might be better than conditionally rendering
   * the dialog based on the `isOpen` props so that
   * a transition can be used(?). Need to test.
   *
   * Although, this way will make it so that the
   * <dialog> DOM element will exist in the DOM
   * tree (not the accessibility tree, maybe
   * because the `open` attribute isn't attached yet?)
   * even if it's not visible.
   */
  const CSS_menuState = isOpen ? CSS.menuOpen : CSS.menuClosed;

  return (
    <dialog className={`${CSS.menu} ${CSS_menuState}`} ref={ref}>
      <header className={CSS.menuHeader}>
        <button className={CSS.closeButton} onClick={onClose}>
          <CloseSVG />
        </button>

        <Separator inMenuDialog />

        <SearchBar inMenuDialog closeDialog={onClose} />

        <Separator inMenuDialog />
      </header>

      {/* Body */}
      <NavigationLinks inMenuDialog onMenuClose={onClose} />

      <footer className={CSS.footer}>
        <ThemeSwitch />
      </footer>
    </dialog>
  );
});

export default MenuDialog;
