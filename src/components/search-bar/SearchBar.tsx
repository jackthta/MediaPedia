import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utilities/enum";

import SearchSVG from "../SVGs/SearchSVG";

import CSS from "./SearchBar.module.scss";

type Props = {
  inMenuDialog?: boolean;
  closeDialog?: () => void;
};

const DefaultProps: Props = {
  inMenuDialog: false,
  closeDialog: Function,
};

const SearchBar: React.FC<Props> = ({ inMenuDialog, closeDialog }) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      search: { value: string };
    };

    // If searching from menu dialog, close dialog before
    // navigating to search results page
    if (inMenuDialog) closeDialog?.();

    const searchQuery = target.search.value;
    navigate({
      pathname: ROUTES.SEARCH_RESULTS.replace("?", ""),
      search: `?q=${encodeURIComponent(searchQuery)}`,
    });

    // Clear search input
    target.search.value = "";
  };

  const CSS_searchBar = inMenuDialog
    ? CSS.menuDialogSearchBar
    : CSS.homeSearchBar;

  return (
    <form
      className={`${CSS.searchBarBase} ${CSS_searchBar}`}
      onSubmit={handleSubmit}
    >
      {inMenuDialog && <SearchSVG />}

      <input
        className={CSS.searchInput}
        placeholder="Search for film"
        name="search"
      />

      {!inMenuDialog && (
        <button className={CSS.searchButton}>
          <SearchSVG />
        </button>
      )}
    </form>
  );
};

SearchBar.defaultProps = DefaultProps;

export default SearchBar;
