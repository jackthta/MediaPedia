import { generateYoutubeThumbnailImgSrcsetDimensions } from "../../../../utilities/image";
import { BREAKPOINT } from "../../../../utilities/enum";

import type { SupplementalVideo } from "../../../../utilities/axios/types";

import CSS from "./SupplementalMediaCard.module.scss";

type Props = {
  media: SupplementalVideo;

  loading?: "eager" | "lazy";
};

function SupplementalMediaCard({ media, loading }: Props) {
  const thumbnail = generateYoutubeThumbnailImgSrcsetDimensions(media.key);

  // TODO: This card should be a button that opens a dialog containing a video
  // https://www.youtube.com/watch?v=lJIrF4YjHfQ for how to embed via iframe OR
  // use this format: https://www.youtube.com/embed/{key} for video source
  return (
    <div className={CSS.card}>
      {/* Image Thumbnail */}
      <img
        className={CSS.thumbnail}
        src={thumbnail.defaultSrc}
        srcSet={thumbnail.srcset}
        sizes={`(min-width: ${BREAKPOINT.TABLET}) 50vw, (min-width: ${BREAKPOINT.DESKTOP}) 33vw, 100vw`}
        loading={loading}
      />

      {/* Title */}
      <h4 className={CSS.title}>{media.name}</h4>
    </div>
  );
}

export default SupplementalMediaCard;
