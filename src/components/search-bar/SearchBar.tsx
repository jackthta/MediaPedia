import SearchSVG from "../SVGs/SearchSVG";

import CSS from "./SearchBar.module.scss";

type Props = {
  inMenuDialog?: boolean;
};

const DefaultProps: Props = {
  inMenuDialog: false,
};

const SearchBar: React.FC<Props> = ({ inMenuDialog }) => {
  const CSS_searchBar = inMenuDialog
    ? CSS.menuDialogSearchBar
    : CSS.homeSearchBar;

  return (
    <form className={`${CSS.searchBarBase} ${CSS_searchBar}`}>
      {inMenuDialog && <SearchSVG />}

      <input className={CSS.searchInput} placeholder="Search for film" />

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
