import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { DESKTOP_BREAKPOINT } from "../../../utilities/enum";

import MenuDialog from "./menu-dialog/MenuDialog";
import NavigationLinks from "./navigation-links/NavigationLinks";
import SandwichMenuSVG from "../../SVGs/SandwichMenuSVG";

import CSS from "./Menu.module.scss";

function Menu() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const onMenuOpen = () => {
    flushSync(() => setDialogIsOpen(true));
    dialogRef.current?.showModal();
  };

  const onMenuClose = () => {
    flushSync(() => setDialogIsOpen(false));
    dialogRef.current?.close();
  };

  // Close menu if user resizes their window to desktop+ screen sizes.
  useEffect(() => {
    const onDesktopScreenSizes = () => dialogRef.current?.open && onMenuClose();

    matchMedia(`(min-width: ${DESKTOP_BREAKPOINT})`).addEventListener(
      "change",
      onDesktopScreenSizes
    );
    return () =>
      matchMedia(`(min-width: ${DESKTOP_BREAKPOINT})`).removeEventListener(
        "change",
        onDesktopScreenSizes
      );
  }, []);

  // Sync `dialogIsOpen` state when
  // ESC is pressed from dialog.
  useEffect(() => {
    console.log(dialogRef);
    dialogRef.current?.addEventListener("cancel", onMenuClose);
    return () => dialogRef.current?.removeEventListener("cancel", onMenuClose);
  }, []);

  return (
    <>
      <>
        <MenuDialog
          ref={dialogRef}
          isOpen={dialogIsOpen}
          onClose={onMenuClose}
        />

        {/* Mobile | Tablet Menu Button */}
        <button className={CSS.menuButton} onClick={onMenuOpen}>
          <SandwichMenuSVG />
        </button>
      </>

      {/* Desktop Navigation */}
      <NavigationLinks />
    </>
  );
}

export default Menu;
