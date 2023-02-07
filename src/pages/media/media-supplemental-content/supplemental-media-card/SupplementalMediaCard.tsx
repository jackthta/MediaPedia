import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { generateYoutubeThumbnailImgSrcsetDimensions } from "../../../../utilities/image";
import { BREAKPOINT } from "../../../../utilities/enum";

import CardImage from "../../../../components/card-image/CardImage";
import CloseSVG from "../../../../components/SVGs/CloseSVG";

import type { SupplementalVideo } from "../../../../redux/slices/media/types";

import CSS from "./SupplementalMediaCard.module.scss";

type Props = {
  media: SupplementalVideo;

  loading?: "eager" | "lazy";
};

function SupplementalMediaCard({ media, loading }: Props) {
  const videoPlayerDialogRef = useRef<HTMLDialogElement | null>(null);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const thumbnail = generateYoutubeThumbnailImgSrcsetDimensions(media.key);

  const openVideoPlayerDialog = () => {
    flushSync(() => setDialogIsOpen(true));
    videoPlayerDialogRef.current?.showModal();

    // Lock body from scrolling when dialog is open
    document.body.style.overflow = "hidden";
  };

  const closeVideoPlayerDialog = () => {
    flushSync(() => setDialogIsOpen(false));
    videoPlayerDialogRef.current?.close();

    // Unlock body to scroll when dialog is closed.
    document.body.style.overflow = "auto";
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialogRect = videoPlayerDialogRef.current?.getBoundingClientRect()!;
    const clickedInDialog =
      dialogRect.top <= e.clientY &&
      e.clientY <= dialogRect.right &&
      dialogRect.left <= e.clientX &&
      e.clientX <= dialogRect.right;

    if (!clickedInDialog) closeVideoPlayerDialog();
  };

  useEffect(() => {
    // Ensure dialog is closed if component is destroyed
    // and that the body is unlocked to scroll.
    return () => {
      videoPlayerDialogRef.current?.close();
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <button className={CSS.card} onClick={openVideoPlayerDialog}>
        {/* Image Thumbnail */}
        <CardImage
          src={thumbnail.defaultSrc}
          srcSet={thumbnail.srcset}
          // Enhancement: make sizes more accurate
          sizes={`(min-width: ${BREAKPOINT.TABLET}) 50vw, (min-width: ${BREAKPOINT.DESKTOP}) 33vw, 100vw`}
          loading={loading}
          width="320"
          height="180"
        />

        {/* Title */}
        <h4 className={CSS.title}>{media.name}</h4>
      </button>

      {/* Video Player Dialog */}
      {/*
        NOTE: Need to listen for the dialog "cancel" event (i.e. `Esc` key press)
        and pass instructions to close it if triggered or else
        playing video will continue playing "invisibly" in the background
      */}
      {dialogIsOpen && (
        <dialog
          className={CSS.dialog}
          ref={videoPlayerDialogRef}
          onCancel={closeVideoPlayerDialog}
          onClick={handleBackdropClick}
        >
          {/* Close button */}
          <button className={CSS.dialogClose} onClick={closeVideoPlayerDialog}>
            <CloseSVG />
          </button>

          {/* Video */}
          {/* Source: https://developers.google.com/youtube/iframe_api_reference */}
          <iframe
            className={CSS.iframe}
            src={`https://www.youtube.com/embed/${media.key}`}
            title={media.name}
            allowFullScreen
          ></iframe>
        </dialog>
      )}
    </>
  );
}

export default SupplementalMediaCard;
