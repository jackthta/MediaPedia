import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "../../redux/store/hooks";
import { clearSearchResults, searchShows } from "../../redux/slices/search";

import BaseLayout from "../../layouts/base-layout/BaseLayout";
import ShowResults from "../../components/show-results/ShowResults";

import CSS from "./SearchResults.module.scss";
import NoSearchResults from "../../components/no-search-results/NoSearchResults";

function SearchResults() {
  const dispatch = useDispatch();
  const location = useLocation();
  // Search string is after `?q=...`
  const query = decodeURIComponent(location.search.slice(3));

  const shows = useSelector((state) => state.search.shows);
  const page = useSelector((state) => state.search.page);
  const totalPages = useSelector((state) => state.search.totalPages);
  const action = searchShows({ query, page });

  const hasFetched = totalPages !== Infinity;

  useEffect(() => {
    // Results have not been fetched yet, do so.
    if (!hasFetched) {
      var fetch = dispatch(action);
    }

    return () => {
      fetch && fetch.abort();
      dispatch(clearSearchResults());
    };
  }, []);

  return (
    <BaseLayout>
      {hasFetched && shows.length > 0 && (
        <ShowResults
          type="search"
          shows={shows}
          page={page}
          totalPages={totalPages}
          action={action}
          searchQuery={query}
        />
      )}

      {hasFetched && shows.length === 0 && (
        <NoSearchResults searchQuery={query} />
      )}
    </BaseLayout>
  );
}

export default SearchResults;
