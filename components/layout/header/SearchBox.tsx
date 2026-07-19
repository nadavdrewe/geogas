interface SearchBoxProps {
  search: boolean;
  setSearch: (value: boolean) => void;
}

const SearchBox = ({ search, setSearch }: SearchBoxProps) => {
  return (
    <div
      id="site-search-panel"
      className={(search ? " active" : " ") + " header-one__right-search-box"}
    >
      <form action="/search" method="get">
        <input
          type="search"
          name="q"
          placeholder="Search service or topic..."
          aria-label="Search service or topic"
          required
        />
        <button type="submit" aria-label="Submit search">
          <i className="fal fa-search"></i>
        </button>
      </form>
      <button
        type="button"
        className="header-one__right-search-box-icon"
        onClick={() => setSearch(false)}
        aria-label="Close site search"
      >
        <i className="fal fa-times"></i>
      </button>
    </div>
  );
};

export default SearchBox;
