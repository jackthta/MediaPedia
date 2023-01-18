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
      <main>
        <h1 className={CSS.heading}>TV Shows</h1>

        <Separator className={CSS.separator} />

        <MediaSection key={KIND.TRENDING} kind={KIND.TRENDING} />

        <Separator className={CSS.separator} />

        <MediaSection key={KIND.POPULAR} kind={KIND.POPULAR} />

        <Separator className={CSS.separator} />

        <MediaSection key={KIND.TOP_RATED} kind={KIND.TOP_RATED} />

        <Separator className={CSS.separator} />
      </main>
    </BaseLayout>
  );
}

export default TvShows;
