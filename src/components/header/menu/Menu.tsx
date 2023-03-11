import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { BREAKPOINT } from "../../../utilities/enum";

import MenuDialog from "./menu-dialog/MenuDialog";
import NavigationLinks from "./navigation-links/NavigationLinks";
import SandwichMenuSVG from "../../SVGs/SandwichMenuSVG";

import CSS from "./Menu.module.scss";

function Menu() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const onMenuOpen = () => {
    flushSync(() => setDialogIsOpen(true));

    // Ensure that the dialog closes properly when pressing `Esc`
    // in the dialog.
    dialogRef.current?.addEventListener("cancel", onMenuClose, { once: true });

    dialogRef.current?.showModal();
  };

  const onMenuClose = () => {
    flushSync(() => setDialogIsOpen(false));
    dialogRef.current?.close();
  };

  // Close menu if user resizes their window to desktop+ screen sizes.
  useEffect(() => {
    const onDesktopScreenSizes = () => dialogRef.current?.open && onMenuClose();

    matchMedia(`(min-width: ${BREAKPOINT.DESKTOP})`).addEventListener(
      "change",
      onDesktopScreenSizes
    );
    return () =>
      matchMedia(`(min-width: ${BREAKPOINT.DESKTOP})`).removeEventListener(
        "change",
        onDesktopScreenSizes
      );
  }, []);

  return (
    <>
      <>
        {dialogIsOpen && (
          <MenuDialog
            ref={dialogRef}
            isOpen={dialogIsOpen}
            onClose={onMenuClose}
          />
        )}

        {/* Mobile | Tablet Menu Button */}
        <button
          className={CSS.menuButton}
          onClick={onMenuOpen}
          aria-label="Menu"
          aria-haspopup="dialog"
          data-test="menu-button"
        >
          <SandwichMenuSVG />
        </button>
      </>

      {/* Desktop Navigation */}
      <NavigationLinks />
    </>
  );
}

export default Menu;
