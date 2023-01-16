import { useRefreshTvShows } from "../../hooks/tv-shows";
import { KIND } from "../../utilities/enum";

import Separator from "../../components/separator/Separator";
import MediaSection from "../../components/media-section/MediaSection";

import BaseLayout from "../../layouts/base-layout/BaseLayout";

import CSS from "./TvShows.module.scss";

function TvShows() {
  useRefreshTvShows();

  return (
    <BaseLayout>
      <h1 className={CSS.heading}>TV Shows</h1>

      <Separator className={CSS.separator} />

      <MediaSection kind={KIND.TRENDING} />

      <Separator className={CSS.separator} />

      <MediaSection kind={KIND.POPULAR} />

      <Separator className={CSS.separator} />

      <MediaSection kind={KIND.TOP_RATED} />

      <Separator className={CSS.separator} />
    </BaseLayout>
  );
}

export default TvShows;
