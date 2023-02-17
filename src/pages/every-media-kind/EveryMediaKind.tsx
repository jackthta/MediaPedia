import { useRefreshTvShows } from "../../hooks/media";
import { KIND } from "../../utilities/enum";

import Separator from "../../components/separator/Separator";
import MediaSection from "../../components/media-section/MediaSection";

import BaseLayout from "../../layouts/base-layout/BaseLayout";

import CSS from "./EveryMediaKind.module.scss";

import type { MediaType } from "../../redux/slices/media/types";

type Props = {
  mediaType: MediaType;
};

function EveryMediaKind({ mediaType }: Props) {
  useRefreshTvShows(mediaType);

  const Heading = mediaType === "tv" ? "TV Shows" : "Movies";

  return (
    <BaseLayout>
      <main>
        <h1 className={CSS.heading} data-test="every-media-kind-heading">{Heading}</h1>

        <Separator className={CSS.separator} />

        <MediaSection
          key={KIND.TRENDING}
          kind={KIND.TRENDING}
          mediaType={mediaType}
        />

        <Separator className={CSS.separator} />

        <MediaSection
          key={KIND.POPULAR}
          kind={KIND.POPULAR}
          mediaType={mediaType}
        />

        <Separator className={CSS.separator} />

        <MediaSection
          key={KIND.TOP_RATED}
          kind={KIND.TOP_RATED}
          mediaType={mediaType}
        />

        <Separator className={CSS.separator} />
      </main>
    </BaseLayout>
  );
}

export default EveryMediaKind;
