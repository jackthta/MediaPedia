import NotFound404SVG from "../SVGs/NotFound404SVG";

import CSS from "./NoSearchResults.module.scss";

type Props = {
  searchQuery: string;
};

function NoSearchResults({ searchQuery }: Props) {
  return (
    <main className={CSS.container}>
      <NotFound404SVG />
      <p className={CSS.noResultsMessage} data-test="media-not-found-text">
        Sorry, we couldn't find any results for{" "}
        <span className={CSS.searchQuery}>{searchQuery}</span>
      </p>
    </main>
  );
}

export default NoSearchResults;
