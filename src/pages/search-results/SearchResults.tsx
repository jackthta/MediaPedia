import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "../../redux/store/hooks";
import { clearSearchResults, searchShows } from "../../redux/slices/search";

import BaseLayout from "../../layouts/base-layout/BaseLayout";
import ShowResults from "../../components/show-results/ShowResults";

import CSS from "./SearchResults.module.scss";

function SearchResults() {
  const dispatch = useDispatch();
  const location = useLocation();
  // Search string is after `?q=...`
  const query = decodeURIComponent(location.search.slice(3));

  const shows = useSelector((state) => state.search.shows);
  const page = useSelector((state) => state.search.page);
  const totalPages = useSelector((state) => state.search.totalPages);
  const action = searchShows({ query, page });

  useEffect(() => {
    // Fetch for results
    if (shows.length === 0) {
      var fetch = dispatch(action);
    }

    return () => {
      fetch && fetch.abort();
      dispatch(clearSearchResults());
    };
  }, []);

  return (
    <BaseLayout>
      <main>
        <ShowResults
          type="search"
          shows={shows}
          page={page}
          totalPages={totalPages}
          action={action}
        />
      </main>
    </BaseLayout>
  );
}

export default SearchResults;
