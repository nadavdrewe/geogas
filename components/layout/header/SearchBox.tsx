interface SearchBoxProps {
  search: boolean;
  setSearch: (value: boolean) => void;
}

const SearchBox = ({ search, setSearch }: SearchBoxProps) => {
  return (
    <div
      className={(search ? " active" : " ") + " header-one__right-search-box"}
    >
      <form action="/search" method="get">
        <input
          type="search"
          name="q"
          placeholder="Search service or topic..."
          required
        />
        <button type="submit">
          <i className="fal fa-search"></i>
        </button>
      </form>
      <span
        className="header-one__right-search-box-icon"
        onClick={() => setSearch(false)}
      >
        <i className="fal fa-times"></i>
      </span>
    </div>
  );
};

export default SearchBox;
