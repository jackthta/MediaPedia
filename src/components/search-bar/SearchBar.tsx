import SearchSVG from "../SVGs/SearchSVG";

import CSS from "./SearchBar.module.scss";

type Props = {
  inMenuDialog?: boolean;
};

const DefaultProps: Props = {
  inMenuDialog: false,
};

const SearchBar: React.FC<Props> = ({ inMenuDialog }) => {
  return (
    <form className={CSS.searchBar}>
      {inMenuDialog && <SearchSVG />}

      <input className={CSS.searchInput} placeholder="Search for film" />

      {/* TODO: Finish when making <Home> page */}
      {!inMenuDialog && (
        <button>
          <SearchSVG />
        </button>
      )}
    </form>
  );
};

SearchBar.defaultProps = DefaultProps;

export default SearchBar;
