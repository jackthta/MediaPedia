import { forwardRef } from "react";

import CloseSVG from "../../../SVGs/CloseSVG";
import Separator from "../../../separator/Separator";
import SearchBar from "../../../search-bar/SearchBar";
import NavigationLinks from "../navigation-links/NavigationLinks";

import CSS from "./MenuDialog.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const MenuDialog = forwardRef<HTMLDialogElement, Props>(function MenuDialog(
  { isOpen, onClose },
  ref
) {
  const CSS_menuState = isOpen ? CSS.menuOpen : CSS.menuClosed;

  return (
    <dialog className={`${CSS.menu} ${CSS_menuState}`} ref={ref}>
      <header className={CSS.menuHeader}>
        <button className={CSS.closeButton} onClick={onClose}>
          <CloseSVG />
        </button>

        <Separator />

        <SearchBar inMenuDialog />

        <Separator />
      </header>

      {/* Body */}
      <NavigationLinks inMenuDialog />

      <footer>{/* TODO: Add light/dark mode switch */}</footer>
    </dialog>
  );
});

export default MenuDialog;
