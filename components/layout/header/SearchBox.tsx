import usePanelFocus from "./usePanelFocus";

interface SearchBoxProps {
  search: boolean;
  setSearch: (value: boolean) => void;
}

const SearchBox = ({ search, setSearch }: SearchBoxProps) => {
  const panelRef = usePanelFocus(search, setSearch);
  return (
    <div
      id="site-search-panel"
      ref={panelRef}
      inert={!search}
      role="dialog"
      aria-modal={search ? true : undefined}
      aria-label="Search Geo Gas"
      className={(search ? " active" : " ") + " header-one__right-search-box"}
    >
      <form action="/search" method="get" role="search">
        <label className="header-search-label" htmlFor="header-search-query">Search Geo Gas</label>
        <input
          id="header-search-query"
          type="search"
          name="q"
          placeholder="Search service or topic..."
          aria-label="Search service or topic"
          required
        />
        <button type="submit" aria-label="Submit search">
          <i className="fal fa-search" aria-hidden="true"></i>
        </button>
      </form>
      <button
        type="button"
        className="header-one__right-search-box-icon"
        onClick={() => setSearch(false)}
        aria-label="Close site search"
      >
        <i className="fal fa-times" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default SearchBox;
